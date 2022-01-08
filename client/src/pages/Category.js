import { Card, List, Select, Spin } from "antd";
import { Option } from "antd/lib/mentions";
import Title from "antd/lib/typography/Title";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { PageDiv } from "../components/Styles";

const Category = () => {

    const [categories, setCategories] = useState(null);
    const [selectedCat, setSelectedCat] = useState(null);
    const [products, setProducts] = useState(null);
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

    const handleChange = async (value) => {
        try {
            setSelectedCat(value);
            let res = await axios.get(`/api/get_categories/${value}`);
            setProducts(res.data);
        } catch (err) {
            console.log(err.response);
            alert("error getting products from category");
        }
    }

    const renderSelect = () => {
        return (
            <Select style={{width: 150}} placeholder="Select a category" onChange={handleChange} >
               {categories.map((c)=><Select.Option key={c.category} value={c.category} >{c.category}</Select.Option>)}
            </Select>
        );
    };

    // const renderProducts = () => {
    //     return products.map((product) => {
    //         return (
    //         <List.Item key={product.id} >
    //             <Card size="small" title={product.category} extra={`$${product.price}`} >
    //                 <p>{product.description}</p>
    //             </Card>
    //         </List.Item>
    //         );
    //     })
    // };

    const renderProducts = (product) => {
        return (
        <List.Item key={product.id} >
            <Card size="small" title={product.category} extra={`$${product.price}`} >
                <p>{product.description}</p>
            </Card>
        </List.Item>
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
            {products && 
                <div style={{margin: "20px", padding: "20px"}} >
                    <Title level={2} style={{textAlign: "center"}} >{selectedCat}</Title>
                <List grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 6,
                    xxl:3,
                }} 
                dataSource={products}
                renderItem={renderProducts}
                />
                </div>}
        </PageDiv>
    );
};

export default Category;