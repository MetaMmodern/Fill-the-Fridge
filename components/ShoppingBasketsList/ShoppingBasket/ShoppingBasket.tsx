import { NextPage } from "next";
import React from "react";

type Props = {
  storeName: string;
  price: string;
};
const ShoppingBasket: NextPage<Props> = (props) => {
  return (
    <div className="store d-flex align-items-center mb-2">
      <span
        data-toggle="tooltip"
        data-placement="right"
        data-html="true"
        title=""
        className="material-icons mr-1"
      >
        shopping_cart
      </span>
      <div className="storeName">{props.storeName}</div>
      <span>—</span>
      <div className="Price">{props.price} grn.</div>
    </div>
  );
};

export default ShoppingBasket;
