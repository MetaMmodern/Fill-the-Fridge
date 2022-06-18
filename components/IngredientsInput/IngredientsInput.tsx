import { NextPage } from "next";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { newRecipeIngredient } from "../../types";

interface IngredientsInputProps {
  ingredients: newRecipeIngredient[];
  setNewIngredient: (newIngredient: newRecipeIngredient) => void;
  removeIngredient: (index: number) => void;
}
const IngredientsInput: NextPage<IngredientsInputProps> = (props) => {
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const saveNewIngredient = () => {
    props.setNewIngredient({ item, amount });
    setItem("");
    setAmount("");
  };
  return (
    <>
      <div>
        <span>old ingrs:</span>
        {props.ingredients.map((ingr, index) => {
          return (
            <div key={index}>
              <span>{ingr.item}</span>-<span>{ingr.amount}</span>
              <button onClick={() => props.removeIngredient(index)}>
                Delete
              </button>
            </div>
          );
        })}
      </div>
      <div>
        <label>Ingredient Name</label>
        <input value={item} onChange={(e) => setItem(e.target.value)}></input>
        <label>Ingredient Amount</label>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        ></input>
        <button onClick={saveNewIngredient}>Add</button>
      </div>
      {/* <form>
        <input {...register("name")} />
        <input {...register("amount")} />
      </form> */}
    </>
  );
};

export default IngredientsInput;
