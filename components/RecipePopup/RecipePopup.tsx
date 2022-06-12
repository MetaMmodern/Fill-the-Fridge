import { NextPage } from "next";
import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import Loading from "../Loading/Loading";
import ShoppingBasketsList from "../ShoppingBasketsList/ShoppingBasketsList";
import MapSideBar from "./MapSidebar/MapSideBar";
import API from "../API";
import classNames from "classnames";
import styles from "./RecipePopup.module.scss";
import IngredientsInPopup from "./IngredientsInPopup/IngredientsInPopup";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { RecipeDetails } from "../../types";
import classnames from "classnames";
type Props = {
  recipeId: string | null;
  ingredients: string[];
  dropRecipeId: () => void;
};

const RecipePopup: NextPage<Props> = (props) => {
  const [recipeData, setRecipeData] = useState<RecipeDetails | null>(null);
  const [modalOpened, setModalOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mapIsShowing, setMapIsShowing] = useState(false);
  useEffect(() => {
    if (props.recipeId !== null) {
      console.log("immediate");
      setModalOpened(true);
    }
  }, [props.recipeId]);
  useEffect(() => {
    if (props.recipeId) {
      setLoading(true);
      API.getRecipeDetails(props.recipeId)
        .then((res) => {
          setRecipeData(res);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    return () => {
      setRecipeData(null);
      setLoading(false);
      setMapIsShowing(false);
    };
  }, [props.recipeId, setRecipeData]);

  const closeModal = () => {
    setModalOpened(false);
    props.dropRecipeId();
  };

  return modalOpened ? (
    <div style={{ borderRadius: "1.5rem" }} className="modal d-flex">
      <div
        className={classnames("modal-dialog modal-lg", {
          "d-flex": mapIsShowing,
        })}
      >
        <div
          className={classNames("modal-content", {
            [styles["recipeContent-jammed"]]: mapIsShowing,
          })}
          id="recipeContent"
          style={{ borderRadius: "1.5rem" }}
        >
          <div
            className={classNames(styles.backbutton, {
              "d-none": !mapIsShowing,
            })}
            id="dropmarkers"
          >
            <button
              type="button"
              className="rounded-circle btn btn-light"
              onClick={() => setMapIsShowing(false)}
            >
              <NavigateBeforeIcon />
            </button>
          </div>

          <div
            id="wholemodalReciep"
            className={classNames({
              "d-none": mapIsShowing,
            })}
          >
            <div className="modal-header">
              <div className="modal-title">{recipeData?.name}</div>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={closeModal}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div
              className="modal-body"
              style={{ display: "flex", justifyContent: "center" }}
            >
              {recipeData && !loading ? (
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-12 col-md-5 col-lg-6">
                      {/* // eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={recipeData?.image}
                        alt="recipe-image"
                        className="img-fluid rounded"
                        style={{ height: "auto" }}
                      />
                    </div>
                    <ShoppingBasketsList
                      openMapHandler={() => setMapIsShowing(true)}
                      existingIngredients={props.ingredients}
                      recipeIngredients={recipeData.ingredients}
                    />
                  </div>
                  {recipeData ? (
                    <IngredientsInPopup
                      existingIngredients={props.ingredients}
                      recipeIngredients={recipeData.ingredients}
                    />
                  ) : null}
                  <div className="row">
                    <div className="col-12">
                      <p>{recipeData?.recipe}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="d-flex justify-content-center"
                  style={{ maxWidth: "400px", minWidth: "100%" }}
                >
                  <Loading />
                </div>
              )}
            </div>
          </div>
        </div>
        {mapIsShowing && <MapSideBar mapIsShowing />}
      </div>
    </div>
  ) : null;
};

export default RecipePopup;
