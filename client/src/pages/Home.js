import React from "react";
import { useNavigate } from "react-router-dom";
import {Button} from "antd";
import { PageDiv } from "../components/Styles";

const Home = () => {
    const navigate = useNavigate();

    // const logOut = (e) => {
    //     e.preventDefault()
    // }

    return (
        <PageDiv>
            <h1>Home</h1>
            <Button type="default" onClick={()=>navigate("/products")}>Product page</Button>
            <Button type="primary" onClick={()=>navigate("/category")} >Category Page</Button>
            <Button type="primary" onClick={()=>navigate("/find")} >Find Products Page</Button>
        </PageDiv>
    );
};

export default Home;