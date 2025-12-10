/* eslint-env node */
/* global require, exports */

const functions = require("firebase-functions");
const ldap = require("ldapjs");

const LDAP_URL = "ldap://wisc.edu";
const BASE_DN = "dc=wisc,dc=edu";

function buildFilter(firstName, lastName) {
  const f = (firstName || "").trim();
  const l = (lastName || "").trim();

  if (!f && !l) {
    // Require at least something so we do not hammer the directory.
    return null;
  }

  // Use search given name and search surname for better matching
  const parts = [];
  if (f) {
    parts.push(`(wiscedusearchgivenname=*${f}*)`);
  }
  if (l) {
    parts.push(`(wiscedusearchsn=*${l}*)`);
  }

  if (parts.length === 1) {
    return parts[0];
  }

  return `(&${parts.join("")})`;
}

function mapEntry(entry) {
  // Convert attributes into a simple map: { attrName: [vals] }
  const attrs = entry.attributes.reduce((acc, attr) => {
    acc[attr.type.toLowerCase()] = attr.vals;
    return acc;
  }, {});

  const getOne = (name) => (attrs[name.toLowerCase()] || [])[0] || "";
  const getMany = (name) => attrs[name.toLowerCase()] || [];

  const id =
    getOne("wisceduephemeralid") ||
    getOne("wiscEduEphemeralID".toLowerCase()) ||
    entry.dn;

  return {
    id,
    firstName: getOne("givenName"),
    lastName: getOne("sn"),
    displayName: getOne("displayName"),

    email: getOne("wisceduworkemail") || getOne("mail"),
    allEmails: getMany("wisceduallemails"),

    phone: getOne("telephonenumber") || getOne("wisceduallphones"),
    allPhones: getMany("wisceduallphones"),

    title: getOne("title") || getOne("wiscedualltitles"),
    allTitles: getMany("wiscedualltitles"),

    department: getOne("wiscedudepartment") || getOne("wiscedualldepartments"),
    allDepartments: getMany("wiscedualldepartments"),

    division: getOne("wiscedudivision") || getOne("wiscedualldivisions"),
    allDivisions: getMany("wiscedualldivisions"),

    office: getOne("physicaldeliveryofficename"),
    street: getOne("street"),
    postalAddress: getOne("postaladdress"),
    postalCode: getOne("postalcode"),
    city: getOne("l"),
    state: getOne("st"),
  };
}

exports.searchPeople = functions.https.onRequest((req, res) => {
  // Basic CORS for local development
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).send("");
  }

  const firstName = req.query.firstName || "";
  const lastName = req.query.lastName || "";

  const filter = buildFilter(firstName, lastName);
  if (!filter) {
    return res.status(400).json({ error: "firstName or lastName required" });
  }

  console.log("LDAP filter:", filter);

  const client = ldap.createClient({ url: LDAP_URL });

  const opts = {
    filter,
    scope: "sub",
    attributes: [
      "wiscEduEphemeralID",
      "givenName",
      "sn",
      "displayName",
      "mail",
      "wiscEduWorkEmail",
      "wiscEduAllEmails",
      "telephoneNumber",
      "wiscEduAllPhones",
      "title",
      "wiscEduAllTitles",
      "wiscEduDepartment",
      "wiscEduAllDepartments",
      "wiscEduDivision",
      "wiscEduAllDivisions",
      "physicalDeliveryOfficeName",
      "street",
      "postalAddress",
      "postalCode",
      "l",
      "st",
    ],
  };

  client.search(BASE_DN, opts, (err, searchRes) => {
    if (err) {
      console.error("LDAP search error:", err);
      client.destroy();
      return res.status(500).json({
        error: "LDAP search failed",
        code: err.code || err.name || "LDAP_ERROR",
      });
    }

    const people = [];

    searchRes.on("searchEntry", (entry) => {
      try {
        const person = mapEntry(entry);
        people.push(person);
      } catch (e) {
        console.error("Error mapping entry:", e);
      }
    });

    searchRes.on("error", (err) => {
      console.error("LDAP stream error:", err);
      client.destroy();
      if (!res.headersSent) {
        res.status(500).json({
          error: err.message || "LDAP stream error",
          code: err.code || err.name || "LDAP_STREAM_ERROR",
        });
      }
    });

    searchRes.on("end", (result) => {
      console.log("LDAP search finished with status:", result.status);
      client.unbind();
      if (!res.headersSent) {
        res.json({ people });
      }
    });
  });
});