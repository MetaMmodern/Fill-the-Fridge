import classNames from "classnames";
import React, { FC } from "react";
import {
  CommentsResponse,
  RecipeFullDetails,
  SingleCommentResponse,
} from "../../types";
import Comment from "../Comment/Comment";
import CommentForm from "../CommentForm/CommentForm";
import IngredientsInPopup from "../IngredientsFull/IngredientsFull";
import Loading from "../Loading/Loading";
import ShoppingBasketsList from "../ShoppingBasketsList/ShoppingBasketsList";

interface Props {
  ingredients: string[];
  mapIsShowing: boolean;
  recipeData: RecipeFullDetails | null;
  closeModal?: () => void;
  loading?: boolean;
  openMap: () => void;
  baskets: any;
  setBaskets: any;
  comments: SingleCommentResponse[];
  addCommentToState: (comment: SingleCommentResponse) => void;
}
const WholeRecipeContent: FC<Props> = (props) => {
  return (
    <div
      id="wholemodalRecipe"
      className={classNames({
        "d-none": props.mapIsShowing,
      })}
    >
      <div className="modal-header">
        <div className="modal-title">
          <h2>{props.recipeData?.name}</h2>
        </div>
        {props.closeModal ? (
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={props.closeModal}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        ) : null}
      </div>
      <div
        className="modal-body"
        style={{ display: "flex", justifyContent: "center" }}
      >
        {props.recipeData && !props.loading ? (
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-md-5 col-lg-6">
                <img
                  src={props.recipeData?.image}
                  alt="recipe-image"
                  className="img-fluid rounded"
                  style={{ height: "auto" }}
                />
              </div>
              <ShoppingBasketsList
                openMapHandler={props.openMap}
                existingIngredients={props.ingredients}
                recipeIngredients={props.recipeData.ingredients}
                baskets={props.baskets}
                setBaskets={props.setBaskets}
              />
            </div>
            {props.recipeData ? (
              <IngredientsInPopup
                existingIngredients={props.ingredients}
                recipeIngredients={props.recipeData.ingredients}
              />
            ) : null}
            <div className="row">
              <div className="col-12">
                <p>{props.recipeData?.recipe}</p>
              </div>
            </div>
            <div className="row pt-2 border-top">
              <div className="col-12 ">
                {props.comments.map((commentData, i) => {
                  return <Comment key={i} {...commentData} />;
                })}
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <p>
                  <CommentForm
                    updateStateComments={(comment) =>
                      props.addCommentToState(comment)
                    }
                    recipeId={props.recipeData.id}
                  />
                </p>
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
  );
};

export default WholeRecipeContent;
