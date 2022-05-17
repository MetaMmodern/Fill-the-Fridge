import { NextPage } from "next";
import Link from "next/link";
import Header from "../components/Header/Header";
const Login: NextPage = () => {
  return (
    <>
      <Header />
      <div className="container h-100 mt-4">
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Log In
          </button>
          <Link href="/register">Don&apos;t have an account?</Link>
        </form>
      </div>
    </>
  );
};
export default Login;
