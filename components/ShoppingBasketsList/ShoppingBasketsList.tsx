import React from "react";
import ShoppingBasket from "./ShoppingBasket/ShoppingBasket";

const ShoppingBasketsList = () => {
  const baskets = [
    { storeName: "Сільпо", price: "0.00" },
    { storeName: "АТБ", price: "0.00" },
    { storeName: "Новус", price: "0.00" },
    { storeName: "Велика Кишеня", price: "0.00" },
  ];
  return (
    <div className="col-12 col-md-7 col-lg-6 mt-2 mt-md-0 h-100">
      <div id="allStores">
        {baskets.map((b, i) => (
          <ShoppingBasket {...b} key={b.storeName + i} />
        ))}
      </div>
      <button
        type="button"
        className="btn btn-primary btn-block w-100"
        id="openMap"
      >
        See on Map
      </button>
    </div>
  );
};

export default ShoppingBasketsList;
