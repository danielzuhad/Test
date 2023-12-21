"use client";

import Card from "@/component/Card";
import Cart from "@/component/Cart";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export type ProductType = {
  id: number;
  name: string;
  price: string;
};

export default function Home() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const router = useRouter();

  const handleDragStart = (e: React.DragEvent, product: ProductType) => {
    e.dataTransfer.setData("product", JSON.stringify(product));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedProduct = JSON.parse(e.dataTransfer.getData("product"));
    setCart((prevCart) => [...prevCart, droppedProduct]);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert(
        "Shopping cart is empty. Please drag products into the cart first."
      );
    } else {
      router.push("/checkout");
    }
  };

  useEffect(() => {
    const fetchDatas = async () => {
      const response = await axios.get("https://dummyjson.com/products");

      const datas = response.data.products;

      setProducts(datas);
    };

    fetchDatas();
  }, []);

  console.log(products);

  return (
    <>
      <div className="w-full">
        <Cart />

        <div>
          {products?.map((product, i) => (
            <Card key={i} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
