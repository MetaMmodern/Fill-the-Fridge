import { NextComponentType, NextPage } from "next";
import Image from "next/image";
import React, { useState } from "react";

type Props = { image: string; ingrFast: string[]; link: string; name: string };

const RecipeSearchResultCard: NextPage<Props> = ({
  image,
  ingrFast,
  link,
  name,
}) => {
  //   <div class="card" style="width: 18rem;">
  //   <img src="..." class="card-img-top" alt="...">
  //   <div class="card-body">
  //     <h5 class="card-title">Card title</h5>
  //     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  //     <a href="#" class="btn btn-primary">Go somewhere</a>
  //   </div>
  // </div>
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
