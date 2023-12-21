import React from "react";

type CardProps = {
  product: {
    title: string;
    price: number;
  };
};

const Card = ({ product }: CardProps) => {
  return (
    <>
      <h3>{product.title}</h3>
      <div>{product.price}</div>
    </>
  );
};

export default Card;
