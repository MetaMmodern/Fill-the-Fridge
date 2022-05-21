import { NextComponentType, NextPage } from "next";
import Image from "next/image";
import React, { useState } from "react";

type Props = {
  image: string;
  ingrFast: string[];
  link: string;
  name: string;
  openRecipe: () => void;
};

const RecipeSearchResultCard: NextPage<Props> = ({
  image,
  ingrFast,
  link,
  name,
  openRecipe,
}) => {
  return (
    <div className="col mb-4">
      <div className="card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} className="card-img-top" alt="recipe-image" />
        <div className="card-body">
          <h5 className="card-title">
            <a
              target="_blank"
              href={link}
              className="recipe-link"
              rel="noreferrer"
              onClick={(e) => {
                e.preventDefault();
                console.log("dude I'm trying");
                openRecipe();
              }}
            >
              {name}
            </a>
          </h5>
          <p
            className="card-text"
            style={{ display: "flex", flexDirection: "column" }}
          >
            {ingrFast?.map((ingr, key) => (
              <span key={key}>{ingr}</span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecipeSearchResultCard;
