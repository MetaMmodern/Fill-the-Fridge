import dynamic from "next/dynamic";

const RecipePopupNoSSR = dynamic(
  () => import("./RecipePopup"),
  { ssr: false } // <-- not including this component on server-side
);
// eslint-disable-next-line import/no-anonymous-default-export
export default RecipePopupNoSSR;
