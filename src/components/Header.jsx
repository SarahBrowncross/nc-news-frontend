
import React from 'react';
import { Link } from '@reach/router';

function Header(props) {
    return (
        <header className={props.small ? "small-App-header" : "App-header"}>
            <Link to={`/`}>
                <h1>NC NEWS</h1>
            </Link>
            {props.children}
        </header>
    )
}

export default Header;