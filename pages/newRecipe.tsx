import { NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import API from "../components/API";
import Header from "../components/Header/Header";
import IngredientsInput from "../components/IngredientsInput/IngredientsInput";
import { newRecipeForm, newRecipeIngredient } from "../types";

const NewRecipe: NextPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<newRecipeForm>();
  const [ingredients, setIngredients] = useState<newRecipeIngredient[]>([]);
  const onSubmit = (data: newRecipeForm) => {
    const formToSend: Record<string, any> = {
      ...data,
      ingredients,
      image: data.image[0],
    };
    const formData = new FormData();
    for (const key in formToSend) {
      if (Object.prototype.hasOwnProperty.call(formToSend, key)) {
        const element = formToSend[key];
        if (Array.isArray(element)) {
          formData.append(key, `[${element.reduce((acc, curr)=>{return acc + JSON.stringify(curr)}, '')}]`);

        }
        else {
          formData.append(key, element);
        }
      }
    }
    API.createNewRecipe(formData).then((resultId) => {
      console.log(resultId);
    });

    console.log(formToSend);
    return null;
  };
  const setNewIngredient = (newIngredient: newRecipeIngredient) => {
    setIngredients([...ingredients, newIngredient]);
  };
  const removeIngredient = (ingrIndex: number) => {
    const ingredientsWithoutDeleted = [
      ...ingredients.slice(0, ingrIndex),
      ...ingredients.slice(ingrIndex + 1),
    ];

    setIngredients(ingredientsWithoutDeleted);
  };
  return (
    <>
      <Head>
        <title>Fill the Fridge: New Recipe</title>
        <meta
          name="description"
          content="Create a new recipe in Fill the Fridge"
        />
      </Head>

      <Header />
      <div className="container h-100 mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="inputName">Recipe Name</label>

            <input
              type="text"
              className="form-control"
              id="inputName"
              aria-describedby="recipeNameHelp"
              {...register("name")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputDescription">Description</label>

            <textarea
              className="form-control"
              id="inputDescription"
              aria-describedby="fullDescriptionHelp"
              {...register("fullDescription")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputImage">Recipe Image</label>

            <input
              type={"file"}
              className="form-control"
              id="inputImage"
              aria-describedby="recipeImageHelp"
              {...register("image")}
            />
          </div>
          <IngredientsInput
            ingredients={ingredients}
            setNewIngredient={setNewIngredient}
            removeIngredient={removeIngredient}
          />
          <button type="submit" className="btn btn-primary">
            Save Recipe
          </button>
        </form>
      </div>
    </>
  );
};

export default NewRecipe;
