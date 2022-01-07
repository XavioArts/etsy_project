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
            <Button type="primary" >Test button (primary)</Button>
            <Button >test button</Button>
            <Button type="text" onClick={()=>navigate("/products")}>Product page(text button)</Button>
        </div>
    );
};

export default Home;