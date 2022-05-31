import classNames from "classnames";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { Carts, RecipeDetails } from "../../types";
import API from "../API";
import Loading from "../Loading/Loading";
import ShoppingBasket from "./ShoppingBasket/ShoppingBasket";

type Props = {
  openMapHandler: () => void;
  existingIngredients: string[];
  recipeIngredients: RecipeDetails["ingredients"];
};
const ShoppingBasketsList: NextPage<Props> = (props) => {
  const [loading, setLoading] = useState(true);
  const [baskets, setBaskets] = useState<null | Carts>(null);
  useEffect(() => {
    setLoading(true);
    const whatToSearch = props.recipeIngredients
      .map((el) => el.item)
      .filter(
        (item) =>
          !props.existingIngredients.some((ingr) =>
            item.toLowerCase().includes(ingr)
          )
      )
      .map((el) => el.toLowerCase());

    API.getRecipeCartPrices(whatToSearch)
      .then((stores) => {
        setBaskets(stores as any);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [props.existingIngredients, props.recipeIngredients]);

  return (
    <div className="col-12 col-md-7 col-lg-6 mt-2 mt-md-0 h-100">
      {loading ? (
        <Loading />
      ) : (
        <div id="allStores">
          {baskets?.map((b, i) => (
            <ShoppingBasket
              key={b.name + i}
              storeName={b.name}
              price={String(b.price)}
            />
          ))}
        </div>
      )}
      <button
        type="button"
        className={classNames("btn btn-primary btn-block w-100", {
          disabled: loading,
        })}
        onClick={props.openMapHandler}
        disabled={loading}
      >
        See on Map
      </button>
    </div>
  );
};

export default ShoppingBasketsList;
