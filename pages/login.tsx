import { NextPage } from "next";
import Link from "next/link";
import Header from "../components/Header/Header";
import { getCsrfToken } from "next-auth/react";
import { CtxOrReq } from "next-auth/client/_utils";
import { useRouter } from "next/router";
import AuthErrorContainer from "../components/AuthErrorContainer/AuthErrorContainer";
type Props = {
  csrfToken: string;
};

const Login: NextPage<Props> = ({ csrfToken }) => {
  const { error } = useRouter().query;
  return (
    <>
      <Header />
      <div className="container h-100 mt-4">
        <form method="post" action="/api/auth/callback/credentials">
          <AuthErrorContainer error={error} />
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              name="password"
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

export async function getServerSideProps(context: CtxOrReq | undefined) {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken },
  };
}
export default Login;
