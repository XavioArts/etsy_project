import React, { useContext } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {

    return (
        <div style={styles.container} > 
            <Link to="/" style={styles.link} >Home</Link>
            <Link to="/products" style={styles.link} >Products</Link>
            <Link to="/category" style={styles.link} >Categories</Link>
            <Link to="/find" style={styles.link} >Find Products</Link>
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