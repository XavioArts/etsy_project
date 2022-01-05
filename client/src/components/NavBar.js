import React, { useContext } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {

    return (
        <div style={styles.container} > 
            <Link to="/" style={styles.link} >Home</Link>
            <Link to="/public" style={styles.link} >Public</Link>
        </div>
    );
};

const styles = {
    container: {
        margin: "0px",
        padding: "10px",
        textAlign: "center",
        backgroundColor: "black",
    },
    link: {
        textDecoration: "none",
        margin: "10px",
        color: "white",
    }
}

export default NavBar;