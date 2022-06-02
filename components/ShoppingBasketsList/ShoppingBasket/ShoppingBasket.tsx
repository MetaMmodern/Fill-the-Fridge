import { NextPage } from "next";
import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
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
        className="mr-1"
      >
        <ShoppingCartIcon />
      </span>
      <div className="storeName">{props.storeName}</div>
      <span>—</span>
      <div className="Price">{props.price} grn.</div>
    </div>
  );
};

export default ShoppingBasket;
