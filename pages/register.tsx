import { NextPage } from "next";
import error from "next/error";
import Link from "next/link";
import Header from "../components/Header/Header";
import { useForm } from "react-hook-form";
import API from "../components/API";
import { signIn } from "next-auth/react";

interface RegisterForm {
  email: string;
  password: string;
  passwordSubmit: string;
}
const Register: NextPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>();
  const onSubmit = async (data: RegisterForm) => {
    return API.createNewUser(data)
      .catch((e) => {
        alert(e);
      })
      .then(() => {
        return signIn(
          "credentials",
          {},
          {
            email: data.email,
            password: data.password,
          }
        );
      });
  };
  return (
    <>
      <Header />
      <div className="container h-100 mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="inputEmail">Email address</label>
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              aria-describedby="emailHelp"
              autoComplete="email"
              {...register("email")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword">Password</label>
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              autoComplete="new-password"
              {...register("password")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputPasswordSubmit">Submit Password</label>
            <input
              type="password"
              className="form-control"
              id="inputPasswordSubmit"
              autoComplete="new-password"
              {...register("passwordSubmit")}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
          <Link href="/login">Already have an account?</Link>
        </form>
      </div>
    </>
  );
};
export default Register;
