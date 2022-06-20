import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Header from "../../components/Header/Header";
import TagInput from "../../components/TagInput/TagInput";
import API from "../../components/API";
import { CommentsResponse, RecipeFullDetails } from "../../types";
import { useEffect, useState } from "react";
import MapSideBar from "../../components/RecipePopup/MapSidebar/MapSideBar";
import WholeRecipeContent from "../../components/WholeRecipeContent/WholeRecipeContent";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import styles from "./styles.module.scss";
import classnames from "classnames";

interface Props {
  recipe: RecipeFullDetails;
  comments: CommentsResponse["comments"];
}
const Recipe: NextPage<Props> = (props) => {
  const [mapIsShowing, setMapIsShowing] = useState(false);
  const [comments, setComments] = useState(props.comments);
  const [baskets, setBaskets] = useState([]);
  const [tags, setTags] = useState<string[]>([]);
  useEffect(() => {
    const localTags = localStorage.getItem("tags");
    const parsedTags = localTags ? JSON.parse(localTags) : [];
    setTags(parsedTags);
  }, []);

  return (
    <>
      <Head>
        {/* <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- og tags -->
    <meta property="og:title" content="<%= `Fill the Fridge: ${name}` %>" />
    <meta property="og:url" content=<%=link %> />
    <meta property="og:image" content=<%=image %> />
    <meta property="og:type" content="article" />
    <meta property="og:description" content="<%= `${reciep.substr(0, 127)}...` %>" />
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
      integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous" />
    <link rel="stylesheet" href="/assets/css/input.css" />
    <link rel="stylesheet" href="/assets/css/fullreciep.css" />
    <!-- Bootstrap JavaScript and JQuery-->
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
      integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n"
      crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
      integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
      crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
      integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
      crossorigin="anonymous"></script>
    <script
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCYsL3NtRxHucdRBUKgnmP5m0QQcTnjM3s&libraries=places"></script>
    
    <script src="/assets/js/main.js" type="module"></script>
    <title>
      <%= `Fill the Fridge: ${name}` %>
    </title> */}
      </Head>
      <Header />
      <TagInput
        getRecipes={function (tags: string[]): void {
          throw new Error("Function not implemented.");
        }}
      />

      <div className="container mt-4 container-infinite mb-4">
        <div className={classnames({ "d-flex": mapIsShowing })}>
          <div
            className={styles.fullrecipe}
            id="reciepContent"
            style={{ width: mapIsShowing ? "3.5rem" : undefined }}
          >
            <div
              className={classnames(styles.backbutton, {
                "d-none": !mapIsShowing,
              })}
              style={{ marginTop: "0.5rem" }}
              id="dropmarkers"
            >
              <button
                type="button"
                className="rounded-circle btn btn-light"
                style={{ padding: 0, width: "2rem", height: "2rem" }}
                onClick={() => setMapIsShowing(false)}
              >
                <NavigateBeforeIcon />
              </button>
            </div>
            <WholeRecipeContent
              ingredients={tags}
              mapIsShowing={mapIsShowing}
              openMap={() => setMapIsShowing(true)}
              baskets={baskets}
              setBaskets={setBaskets}
              recipeData={props.recipe}
              comments={comments}
              addCommentToState={(newComment) => {
                setComments([...comments, newComment]);
              }}
            />
          </div>
          {mapIsShowing && <MapSideBar mapIsShowing stores={baskets || []} />}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  if (!context.params) {
    return { props: {} };
  }
  const { id } = context.params;
  const dataPromises = [
    API.getRecipeDetails(id as string),
    API.getRecipeComments(id as string),
  ];
  const { recipe, comments } = await Promise.allSettled(dataPromises).then(
    (values) => {
      const recipe = values[0].status == "fulfilled" ? values[0].value : {};
      const { comments } =
        values[1].status == "fulfilled" ? values[1].value : { comments: [] };
      return { recipe, comments };
    }
  );

  return {
    props: {
      recipe,
      comments,
    },
  };
};

export default Recipe;
