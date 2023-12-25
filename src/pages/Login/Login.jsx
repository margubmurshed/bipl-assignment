import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Navigate } from "react-router-dom";

const Login = () => {
  const { user, userLoading, userLogin } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const username = form.username.value;
    const password = form.password.value;
    userLogin(username, password);
  };

  return (
    <>
      {userLoading ? (
        <div className="h-screen flex justify-center items-center">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <>
          {!user ? (
            <div className="hero min-h-screen bg-base-200">
              <div className="hero-content flex-col">
                <div className="text-center lg:text-left">
                  <p className="">Welcome Back</p>
                  <h1 className="text-5xl font-bold">Login now!</h1>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                  <form className="card-body" onSubmit={handleSubmit}>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Username</span>
                      </label>
                      <input
                        type="text"
                        placeholder="username"
                        className="input input-bordered"
                        name="username"
                        required
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Password</span>
                      </label>
                      <input
                        type="password"
                        placeholder="password"
                        className="input input-bordered"
                        name="password"
                        required
                      />
                    </div>
                    <div className="form-control mt-6">
                      <button className="btn btn-primary" type="submit">
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <Navigate to="/" />
          )}
        </>
      )}
    </>
  );
};

export default Login;
