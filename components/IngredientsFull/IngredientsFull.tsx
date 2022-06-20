import classNames from "classnames";
import React from "react";
import { RecipeFullDetails } from "../../types";

interface Props {
  existingIngredients: string[];
  recipeIngredients: RecipeFullDetails["ingredients"];
}
const IngredientsInPopup: React.FC<Props> = ({
  recipeIngredients,
  existingIngredients,
}) => {
  return (
    <div className="row ingredientsSingle mt-3 mb-3">
      <div className="col-12 col-md-9 col-lg-6">
        <ul className="list-group" id="allIngs">
          {recipeIngredients.map((ingrs, idx) => (
            <li
              className={classNames("list-group-item", {
                "list-group-item-danger": !existingIngredients.some((v) =>
                  ingrs.item.toLowerCase().includes(v)
                ),
              })}
              key={ingrs.item + idx}
            >
              <span>{ingrs.item}</span>—{ingrs.amount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IngredientsInPopup;
