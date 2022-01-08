import { Spin } from "antd";
import Title from "antd/lib/typography/Title";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { PageDiv } from "../components/Styles";

const FindProduct = () => {

    const [data, setData] = useState(null);
    const [sellers, setSellers] = useState(null);
    const [buyers, setBuyers] = useState(null);
    const [loading, setLoading] = useState(true);


    const getData = async () => {
        try {
            let res = await axios.get("/api/find_products");
            let normalized = normalizeData(res.data);
            setData(normalized);
            setLoading(false);
        } catch (err) {
            console.log(err.response);
            alert("there was an error getting data")
        }
    };

    useEffect(()=>{
        getData();
    }, []);

    const normalizeData = (data) => {
        let seller_ids = data.map((i) => i.id);
        let sellersUnique = [...new Set(seller_ids)];
        let newData = sellersUnique.map((id) => {
            let buyers = data.filter((i) => i.seller_id === id);
            let buyersIds = buyers.map((i)=>i.buyer_id);
            let buyersUnique = [...new Set(buyersIds)];
            let buyerData = buyersUnique.map((id) => {
                let buyerProducts = data.filter((i)=> i.buyer_id === id)
                let cleanProducts = buyerProducts.map((p) => {
                    return {id: p.product_id, price: p.price, category: p.category, description: p.description};
                })
                return {buyer_id: buyerProducts[0].buyer_id, buyer_name: buyerProducts[0].buyer_name, 
                    max_price: buyerProducts[0].max_price, desired_cat: buyerProducts[0].desired_cat, 
                    products: cleanProducts};
            })
            return {id: buyers[0].id, name: buyers[0].name, email: buyers[0].email, buyers: buyerData};
            // let cleanProducts = products.map((p) => {
            //     return {id: p.id, price: p.price, description: p.description, category: p.category}
            // });
            // return {name: products[0].name, email: products[0].email, id: products[0].id, products: cleanProducts};
        });
        let sellerNames = newData.map((s)=>s.name)
        // may need to add seller id here ^^^^
        setSellers(sellerNames);
        return newData;
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
            <Title>Find Product Page</Title>
            <code>{JSON.stringify(sellers)}</code>
            <hr/>
            <code>{JSON.stringify(data)}</code>
        </PageDiv>
    );
};

export default FindProduct;