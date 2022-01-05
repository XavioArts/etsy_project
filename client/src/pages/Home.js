import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import {Button} from "antd";

const Home = () => {

    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    // const logOut = (e) => {
    //     e.preventDefault()
    // }

    return (
        <div>
            <h1>Home</h1>
            {JSON.stringify(auth)}
            <Button type="primary" onClick={()=>navigate("/login")} >Log In</Button>
            <Button onClick={()=>auth.handleLogout(navigate)} >Log Out</Button>
            <Button type="text" onClick={()=>navigate("/protected")}>User View</Button>
        </div>
    );
};

export default Home;