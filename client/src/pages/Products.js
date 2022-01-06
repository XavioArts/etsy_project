import React, { useState } from "react";
import axios from "axios";
import { Button } from "antd";

const Products = () => {

    const [products, setProducts] = useState(null);

    const getProducts = async () => {
        try {
            let res = await axios.get("/api/products");
            setProducts(res.data);
        } catch (err) {
            console.log(err.response);
            alert("there was an error getting products");
        }
    }

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