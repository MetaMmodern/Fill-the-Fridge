import { NextPage } from "next";
import React from "react";
import RecipeSearchResultCard from "../RecipeSearchResultCard";

type Props = {
  recipes:
    | {
        image: string;
        ingrFast: string[];
        link: string;
        name: string;
        id: string;
      }[]
    | null;
  openRecipe: (id: string) => void;
};
const ResultsContainer: NextPage<Props> = (props) => {
  return (
    <div
      className="row row-cols-1 row-cols-sm-2 row-cols-md-3"
      id="search-results-container"
    >
      {props.recipes ? (
        props.recipes.map((r, i) => (
          <RecipeSearchResultCard
            key={i}
            {...r}
            openRecipe={() => {
              console.log("immediate");
              props.openRecipe(r.id);
            }}
          />
        ))
      ) : (
        <div style={{ width: "100%" }}>
          nothing found, try changing your request
        </div>
      )}
    </div>
  );
};

export default ResultsContainer;
