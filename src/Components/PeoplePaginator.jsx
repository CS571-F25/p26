import { useState } from "react";
import PersonList from "../components/PersonList";
import { Pagination } from "react-bootstrap";

function PeoplePaginator(props) {
    const pageNumber = props.pageNumber;
    const setPageNumber = props.setPageNumber;

    const pageSize = 10;
    const totalPages = Math.ceil(props.people.length / pageSize)

    const peoplePage = props.people.slice(pageNumber*pageSize, (pageNumber*pageSize) + pageSize);

    let paginationItems = [];
    const current = pageNumber + 1;

    function addPage(num) {
        paginationItems.push(
            <Pagination.Item
            key={num}
            active={num === current}
            onClick={() => setPageNumber(num - 1)}
            >
            {num}
            </Pagination.Item>
        );
    }

    if (totalPages <= 9) {
        for (let i = 1; i <= totalPages; i++) {
            addPage(i)
        }
    } else {
        addPage(1);

        if (current > 4) {
            paginationItems.push(<Pagination.Ellipsis key="left-ellipsis" disabled />);
        }

        const start = Math.max(2, current - 2);
        const end = Math.min(totalPages - 1, current + 2);

        for (let i = start; i <= end; i++) {
            addPage(i);
        }

        if (current < totalPages - 3) {
            paginationItems.push(<Pagination.Ellipsis key="right-ellipsis" disabled />);
        }

        addPage(totalPages);
    }


    return <>
                <PersonList
                people={peoplePage}
                toggleFavorite={props.toggleFavorite}
                initialState={false}
                favorites={props.favorites}
                darkMode={props.darkMode}
                // Make sure clicks still propagate to the details page
                onPersonClick={props.onPersonClick}
                />
                <Pagination
                style={{marginTop:10}}>
                    {paginationItems}
                </Pagination>
            </>
}

export default PeoplePaginator;