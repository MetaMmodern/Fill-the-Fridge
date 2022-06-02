import { NextPage } from "next";
import CloseIcon from "@mui/icons-material/Close";

import styles from "./Tag.module.scss";
type Props = { name: string; onTagClose: () => void };

const Tag: NextPage<Props> = (props) => {
  return (
    <div className={styles.tag}>
      <div>{props.name}</div>
      <CloseIcon
        className={styles["material-icons"]}
        onClick={props.onTagClose}
      />
    </div>
  );
};

export default Tag;
