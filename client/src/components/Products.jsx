import styled from "styled-components";
import { popularProducts } from "../data";
import { useState, useEffect } from "react";
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ cat, sort, filter }) => {
  const [product, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:5000/api/products/find/?category=${cat}`
            : `http://localhost:5000/api/products/find/`
        );

        var { products } = res.data;
        setProducts(products);
        console.log("res:", res.data);
        console.log("products", products);
        setLoading(false);
      } catch (error) {}
    };
    getProducts();
  }, [cat]);
  useEffect(() => {
    setLoading(true);
    cat &&
      setFilteredProducts(
        product.filter((item) =>
          Object.entries(filter).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
    console.log(filter);
    console.log("filteredProducts filtered: ", filteredProducts);
    setLoading(false);
  }, [product, cat, filter]);

  useEffect(() => {
    setLoading(true);
    if (sort === "newest") {
      setFilteredProducts(
        filteredProducts.sort((a, b) => b.createdAt - a.createdAt)
      );
    } 
    if (sort === "asc") {
      setFilteredProducts(filteredProducts.sort((a, b) => a.price - b.price));
    }
    if (sort === "desc") {
      setFilteredProducts(filteredProducts.sort((a, b) => b.price - a.price));
    }

    console.log("filteredProducts sorted: ", filteredProducts);
    setLoading(false);
  }, [sort, filteredProducts]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      {cat
        ? filteredProducts.map((item) => <Product item={item} key={item._id} />)
        : product.map((item) => (
            <Product item={item} key={item._id} />
          ))}
    </Container>
  );
};

export default Products;
