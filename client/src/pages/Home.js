import React from "react";
import { useNavigate } from "react-router-dom";
import {Button} from "antd";

const Home = () => {
    const navigate = useNavigate();

    // const logOut = (e) => {
    //     e.preventDefault()
    // }

    return (
        <div>
            <h1>Home</h1>
            <Button type="primary" onClick={()=>navigate("/login")} >Log In</Button>
            <Button >Log Out</Button>
            <Button type="text" onClick={()=>navigate("/public")}>User View</Button>
        </div>
    );
};

export default Home;