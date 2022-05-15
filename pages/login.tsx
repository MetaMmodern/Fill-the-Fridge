import {NextPage} from 'next'
const Login: NextPage = () => {
  return   <><div className="container mt-4">
    <div className="d-flex flex-row justify-content-between ">
      <h3 className="font-weight-bold">
        <a href="/" className="text-black">Fill the Fridge</a>
      </h3>
      <div style={{height: "100%", display: "flex", alignItems: "center"}}>
        <button className="help text-black ml-3 mr-1 bg-white border-0">?</button>
      </div>
    </div>
  </div>
  <div className="container h-100 mt-4">
    <form>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
          autoComplete="email"/>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input type="password" className="form-control" id="exampleInputPassword1" autoComplete="current-password"/>
      </div>
      <button type="submit" className="btn btn-primary">Log In</button>
      <a href="/register">Don't have an account?</a>
      </form>
  </div></>;
};
export default Login;