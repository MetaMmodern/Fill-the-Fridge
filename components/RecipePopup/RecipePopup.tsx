import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Loading from "../Loading/Loading";
import ShoppingBasketsList from "../ShoppingBasketsList/ShoppingBasketsList";
import MapSideBar from "./MapSidebar/MapSideBar";

type Props = {
  recipeId: number | null;
  showModal: boolean;
  handleCloseModal: () => void;
};
type RecipeDetails = {
  name: string;
  image: string;
  ingredients: { item: string; amount: string }[];
  link: string;
  recipe: string;
};
const RecipePopup: NextPage<Props> = (props) => {
  const [recipeData, setRecipeData] = useState<RecipeDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [mapIsShowing, setMapIsShowing] = useState(false);
  useEffect(() => {
    console.log("yyyep");
    if (props.recipeId) {
      setLoading(true);
      fetch(`/api/recipes/${props.recipeId}`)
        .then(async (recipeData) => {
          const recipeJSON = await recipeData.json();
          console.log(recipeJSON);
          setRecipeData(recipeJSON);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    return () => {
      setRecipeData(null);
    };
  }, [props.recipeId, setRecipeData]);

  return (
    <Modal
      show={props.showModal}
      style={{ borderRadius: "1.5rem" }}
      onHide={props.handleCloseModal}
    >
      {/* <div className="modal-dialog modal-lg d-flex"> */}
      {/* <div
        className="modal-content"
        id="reciepContent"
        style={{ borderRadius: "1.5rem" }}
      > */}
      {/* <div className="backbutton d-none" id="dropmarkers">
        <button
          type="button"
          className="rounded-circle material-icons btn btn-light"
        >
          navigate_before
        </button>
      </div> */}
      {/* <div id="wholemodalReciep"> */}
      <Modal.Header>
        <Modal.Title>{recipeData?.name}</Modal.Title>
        <button
          type="button"
          className="close"
          data-dismiss="modal"
          aria-label="Close"
          onClick={props.handleCloseModal}
        >
          <span aria-hidden="true">×</span>
        </button>
      </Modal.Header>
      <Modal.Body style={{ display: "flex", justifyContent: "center" }}>
        {loading ? (
          <Loading />
        ) : (
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-md-5 col-lg-6">
                <img
                  src={recipeData?.image}
                  alt="recipe-image"
                  className="img-fluid rounded"
                  style={{ height: "auto" }}
                />
              </div>
              <ShoppingBasketsList />
            </div>
            <div className="row ingredientsSingle mt-3 mb-3">
              <div className="col-12 col-md-9 col-lg-6">
                <ul className="list-group" id="allIngs">
                  {recipeData?.ingredients.map((ingrs, idx) => (
                    <li
                      className="list-group-item list-group-item-danger"
                      key={ingrs.item + idx}
                    >
                      <span>{ingrs.item}</span>—{ingrs.amount}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <p>{recipeData?.recipe}</p>
              </div>
            </div>
          </div>
        )}
      </Modal.Body>
      {/* </div> */}
      {/* </div> */}
      {mapIsShowing && <MapSideBar />}
      {/* </div> */}
    </Modal>
  );
};

export default RecipePopup;
