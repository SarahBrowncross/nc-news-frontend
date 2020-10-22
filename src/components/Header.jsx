
import React from 'react';

function Header(props) {
    return (
    <header className={props.small ? "small-App-header" : "App-header"}>
        <h1>NC NEWS</h1>
        {props.children}
    </header>
    )
}

export default Header;