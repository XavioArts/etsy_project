import { Select, Spin } from "antd";
import { Option } from "antd/lib/mentions";
import Title from "antd/lib/typography/Title";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { PageDiv } from "../components/Styles";

const Category = () => {

    const [categories, setCategories] = useState(null);
    const [selectedCat, setSelectedCat] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(()=> {
        getCategories();
    }, []);

    const getCategories = async () => {
        try {
            let res = await axios.get("/api/get_categories");
            setCategories(res.data);
            setLoading(false);
        } catch (err) {
            console.log(err.response);
            alert("error getting categories")
        }
    }

    const handleChange = (value) => {
        setSelectedCat(value);
    }

    const renderSelect = () => {
        return (
            <Select style={{width: 150}} onChange={handleChange} >
               {categories.map((c)=><Select.Option key={c.category} value={c.category} >{c.category}</Select.Option>)}
            </Select>
        );
    };

    if (loading) {
        return (
            <div style={{margin: "auto", padding: "100px", textAlign: "center"}} >
                <Spin size="large" />
            </div>
        )
    }

    return (
        <PageDiv>
            <Title>Category Page</Title>
            {categories && 
                renderSelect()}
        </PageDiv>
    );
};

export default Category;