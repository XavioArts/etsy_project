import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, List, Spin } from "antd";
import Title from "antd/lib/typography/Title";
import { PageDiv, SellerDiv } from "../components/Styles";

const Products = () => {

    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        getProducts();
    },[]);

    const getProducts = async () => {
        try {
            let res = await axios.get("/api/products");
            let normalized = normalizeData(res.data);
            // setProducts(res.data);
            setProducts(normalized);
            setLoading(false)
        } catch (err) {
            console.log(err.response);
            alert("there was an error getting products");
        }
    }

    const normalizeData = (data) => {
        let seller_ids = data.map((i) => i.id);
        let sellersUnique = [...new Set(seller_ids)];
        let newData = sellersUnique.map((id) => {
            let products = data.filter((i) => i.seller_id === id);
            let cleanProducts = products.map((p) => {
                return {id: p.id, price: p.price, description: p.description, category: p.category}
            });
            return {name: products[0].name, email: products[0].email, id: products[0].id, products: cleanProducts};
        });
        return newData;
    };

    const renderProducts = (product) => {
        return (
        <List.Item key={product.id} >
            <Card size="small" title={product.category} extra={`$${product.price}`} >
                <p>{product.description}</p>
            </Card>
        </List.Item>
        );
    };

    const renderSellers = () => {
        return products.map((s) => {
            return (
                <>
                <SellerDiv>
                    <Title style={{color: "#FFFFFF"}} level={1} >{s.name}</Title>
                    <Title style={{color: "#FFFFFF"}} level={4} >{s.email}</Title>
                </SellerDiv>
                <List grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 6,
                    xxl:3,
                }}
                dataSource={s.products}
                renderItem={renderProducts} />
                <hr/>
                </>
            )
        })
    }

    if (loading) {
        return (
            <div style={{margin: "auto", padding: "100px", textAlign: "center"}} >
                <Spin size="large" />
            </div>
        )
    }

    return (
        <PageDiv>
            <Title style={{textAlign: "center"}} >Products Page</Title>
            {/* <Button onClick={()=>getProducts()} >Get Products</Button> */}
            {products && renderSellers()}
        </PageDiv>
    );
};

export default Products;