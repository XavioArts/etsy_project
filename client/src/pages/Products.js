import React, { useState } from "react";
import axios from "axios";
import { Button, Card, List } from "antd";
import Title from "antd/lib/typography/Title";

const Products = () => {

    const [products, setProducts] = useState(null);

    const getProducts = async () => {
        try {
            let res = await axios.get("/api/products");
            let normalized = normalizeData(res.data);
            // setProducts(res.data);
            setProducts(normalized);
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
        <List.Item>
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
                <div>
                    <Title>{s.name}</Title>
                    <Title level={3} >{s.email}</Title>
                </div>
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

    return (
        <div>
            <h1>Products Page</h1>
            <Button onClick={()=>getProducts()} >Get Products</Button>
            {products && renderSellers()}
        </div>
    );
};

export default Products;