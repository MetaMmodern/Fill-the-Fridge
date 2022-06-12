import Link from "next/link";
import styles from "./Header.module.scss";
import { signIn, useSession, signOut } from "next-auth/react";
import { useEffect } from "react";

const Header = () => {
  const { data: session } = useSession();
  useEffect(() => {
    console.log(session);
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex flex-row justify-content-between">
        <h3 className="font-weight-bold">
          <Link href="/" className="text-black">
            Fill the Fridge
          </Link>
        </h3>
        <div style={{ height: "100%", display: "flex", alignItems: "center" }}>
          {session ? (
            <>
              <button className={`btn btn-success ${styles.cleaner} ml-3`}>
                <Link href="/newRecipe">Add Recipe</Link>
              </button>
              <button
                className={`btn btn-success ${styles.cleaner} ml-3`}
                onClick={() => signOut()}
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              className={`btn btn-success ${styles.cleaner} ml-3`}
              onClick={() => signIn()}
            >
              Sign In
            </button>
          )}

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
