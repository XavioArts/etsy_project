import React, { useState } from "react";
import axios from "axios";
import { Button } from "antd";

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
        let sellersUnique = [... new Set(seller_ids)];
        let newData = sellersUnique.map((id) => {
            let products = data.filter((i) => i.seller_id === id);
            let cleanProducts = products.map((p) => {
                return {id: p.id, price: p.price, description: p.description, category: p.category}
            });
            return {name: products[0].name, email: products[0].email, id: products[0].id, products: cleanProducts};
        });
        return newData;
    };

    return (
        <div>
            <h1>Products Page</h1>
            <Button onClick={()=>getProducts()} >Get Products</Button>
            {products && 
                <div>
                    <p>{JSON.stringify(products)}</p>
                </div>}
        </div>
    );
};

export default Products;