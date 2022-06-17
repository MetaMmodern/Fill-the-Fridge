import { NextPage } from "next";
import React, { useEffect, useRef, useState } from "react";
import MapSideBar from "./MapSidebar/MapSideBar";
import API from "../API";
import classNames from "classnames";
import styles from "./RecipePopup.module.scss";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { Carts, RecipeDetails } from "../../types";
import classnames from "classnames";
import { useRouter } from "next/router";
import WholeRecipeContent from "../WholeRecipeContent/WholeRecipeContent";
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
  const [baskets, setBaskets] = useState<null | Carts>(null);
  const router = useRouter();
  useEffect(() => {
    if (modalOpened) {
      history.pushState(
        `/recipe/${props.recipeId}`,
        "page 2",
        `/recipe/${props.recipeId}`
      );
    } else {
      history.pushState(`/`, "page 2", `/`);
    }
  }, [modalOpened, props.recipeId, router]);

  useEffect(() => {
    if (props.recipeId !== null) {
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
          "w-100": mapIsShowing,
        })}
      >
        <div
          className={classNames("modal-content", {
            [styles["recipeContent-jammed"]]: mapIsShowing,
          })}
          id="recipeContent"
          style={{
            borderRadius: "1.5rem",
            width: mapIsShowing ? "3.5rem" : undefined,
          }}
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
          <WholeRecipeContent
            ingredients={props.ingredients}
            mapIsShowing={mapIsShowing}
            closeModal={closeModal}
            loading={loading}
            openMap={() => setMapIsShowing(true)}
            baskets={baskets}
            setBaskets={setBaskets}
            recipeData={recipeData}
          />
        </div>
        {mapIsShowing && <MapSideBar mapIsShowing stores={baskets || []} />}
      </div>
    </div>
  ) : null;
};

export default RecipePopup;
