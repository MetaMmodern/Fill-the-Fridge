import { NextPage } from "next";
import {
  FormEventHandler,
  KeyboardEventHandler,
  useEffect,
  useState,
} from "react";
import Tag from "../Tag/Tag";

import styles from "./TagInput.module.scss";

type Props = { getRecipes: (tags: string[]) => void };
const TagInput: NextPage<Props> = (props) => {
  const [tags, setTags] = useState<string[] | null>(null);
  const [inputValue, setInputValue] = useState("");

  const onKeyUp: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (
      e.key === "Enter" &&
      inputValue !== "" &&
      inputValue.split(" ").join("") !== ""
    ) {
      setTags([...(tags || []), inputValue]);

      setInputValue("");
    }
    if (
      e.key === "Backspace" &&
      inputValue === "" &&
      tags &&
      tags?.length > 0
    ) {
      e.preventDefault();
      const lastTag = tags[tags.length - 1];
      setInputValue(lastTag);
      setTags([...(tags.slice(0, tags.length - 1) || [])]);
    }
  };

  useEffect(() => {
    const localTags = localStorage.getItem("tags");
    const parsedTags = localTags ? JSON.parse(localTags) : [];
    setTags(parsedTags);
  }, []);
  useEffect(() => {
    if (tags != null) {
      localStorage.setItem("tags", JSON.stringify(tags));
    }
  }, [tags]);

  const tagCloseHandler = (index: number) => {
    if (tags) {
      setTags([...tags.slice(0, index), ...tags.slice(index + 1)]);
    }
  };
  return (
    <div className="container h-100 mt-4">
      <div className={`form-inline w-100 ${styles["tag-container"]}`}>
        {tags?.map((tag, i) => (
          <Tag name={tag} key={tag + i} onTagClose={() => tagCloseHandler(i)} />
        ))}
        <input
          type="text"
          className="form-control"
          id="inputIngredients"
          onKeyUp={onKeyUp}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={!tags?.length ? "Ingredients" : undefined}
        />
        <button
          className={`btn btn-primary ${styles.submit}`}
          onClick={() => props.getRecipes(tags || [])}
        >
          Search recieps
        </button>
      </div>
    </div>
  );
};

export default TagInput;
