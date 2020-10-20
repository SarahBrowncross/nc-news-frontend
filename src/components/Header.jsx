import { navigate } from '@reach/router';
import React from 'react';

function Header() {
    return (
    <header className="App-header">
        <h1>NC NEWS</h1>
        <nav>
            <select id="topic-selector" onChange={(event) => {
                const {value} = event.target;
                navigate(`/topic/${value}`)
            }}>
            <option value=''>All topics</option>
            <option value='coding'>Coding</option>
            <option value='cooking'>Cooking</option>
            <option value='football'>Football</option>
            </select>
            <select id="sort-selector" onChange={(event) => {
                const {value} = event.target;
                navigate(`?sort_by=${value}`)
            }}>
            <option value='created_by'>New</option>
            <option value='comment_count'>Comments</option>
            <option value='votes'>Votes</option>
            </select>
        </nav>
    </header>
    )
}

export default Header;