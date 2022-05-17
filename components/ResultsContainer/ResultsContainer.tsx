import { NextPage } from "next";
import React from "react";
import RecipeSearchResultCard from "../RecipeSearchResultCard";

type Props = {
  recipes:
    | { image: string; ingrFast: string[]; link: string; name: string }[]
    | null;
};
const ResultsContainer: NextPage<Props> = (props) => {
  return (
    <div
      className="row row-cols-1 row-cols-sm-2 row-cols-md-3"
      id="search-results-container"
    >
      {props.recipes ? (
        props.recipes.map((r, i) => <RecipeSearchResultCard key={i} {...r} />)
      ) : (
        <div>nothing found</div>
      )}
    </div>
  );
};

export default ResultsContainer;
