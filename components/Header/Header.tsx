import Link from "next/link";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <div className="container mt-4">
      <div className="d-flex flex-row justify-content-between">
        <h3 className="font-weight-bold">
          <Link href="/" className="text-black">
            Fill the Fridge
          </Link>
        </h3>
        <div style={{ height: "100%", display: "flex", alignItems: "center" }}>
          <button className={`btn btn-success ${styles.cleaner} ml-3`}>
            Clear the Fridge
          </button>
          <button
            className={`${styles.help} text-black ml-3 mr-1 bg-white border-0`}
          >
            ?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
