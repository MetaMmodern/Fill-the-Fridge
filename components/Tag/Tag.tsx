import { NextPage } from "next";

import styles from "./Tag.module.scss";
type Props = { name: string; onTagClose: () => void };

const Tag: NextPage<Props> = (props) => {
  return (
    <div className={styles.tag}>
      <div>{props.name}</div>
      <span
        className={`material-icons ${styles["material-icons"]}`}
        onClick={props.onTagClose}
      >
        close
      </span>
    </div>
  );
};

export default Tag;
