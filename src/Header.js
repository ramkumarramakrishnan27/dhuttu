import React from "react";

const Header = ({title}) => {
    return (
        <header style={{backgroundColor:'green', color:'white'}}>
            <h1>{title}</h1>
        </header>
    )
}

// Header.defaultProps = {
//     title : "Default Title"
// }

export default Header