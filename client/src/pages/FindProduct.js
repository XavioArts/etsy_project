import { Button, Card, List, Select, Spin } from "antd";
import Title from "antd/lib/typography/Title";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { PageDiv } from "../components/Styles";

const FindProduct = () => {

    const [data, setData] = useState(null);
    const [sellers, setSellers] = useState(null);
    const [selectedSeller, setSelectedSeller] = useState(null);
    const [buyers, setBuyers] = useState(null);
    const [products, setProducts] = useState(null);
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

    const selectSeller = (value) => {
        setBuyers(null);
        let selected = data.find((s)=>s.name === value);
        // console.log(selected)
        setSelectedSeller(selected);
        let selectedBuyers = selected.buyers.map((b)=>b.buyer_name);
        setBuyers(selectedBuyers);
    };

    const selectBuyer = (value) => {
        let selected = selectedSeller.buyers.find((b)=>b.buyer_name === value);
        if (selected.desired_cat === null) {
            setProducts(selected.products);
        }
        else {
            let filteredProducts = selected.products.filter((p)=>selected.desired_cat.includes(p.category));
            setProducts(filteredProducts);
        }
    };

    const renderProducts = (p) => {
        // console.log(products);
        // return products.map((p)=> {
            return (
                <List.Item key={p.id} >
                    <Card size="small" title={p.category} extra={`$${p.price}`} >
                        <p>{p.description}</p>
                    </Card>
                </List.Item>
            )
        // })
    }

    const renderBuyerSelect = () => {
        if (!buyers) {
            return <Select style={{width: 200}} placeholder="Please select a seller..." disabled />
        }
        return (
            <Select style={{width: 200}} placeholder="Select a buyer" onChange={selectBuyer} >
               {buyers.map((b)=><Select.Option key={b} value={b} >{b}</Select.Option>)}
            </Select>
        )
    }

    const reset = () => {
        setBuyers(null);
        setProducts(null);
        setSelectedSeller(null);
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
            <div>
                <Select style={{width: 200}} placeholder="Select a seller" onChange={selectSeller} >
                    {sellers.map((s)=><Select.Option key={s} value={s} >{s}</Select.Option>)}
                </Select>
                {renderBuyerSelect()}
                <Button onClick={reset} >Clear</Button>
            </div>
            {products &&
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
                renderItem={renderProducts} />
            }
            {/* <code>{JSON.stringify(sellers)}</code>
            <hr/>
            <code>{JSON.stringify(data)}</code> */}
        </PageDiv>
    );
};

export default FindProduct;