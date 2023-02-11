import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { authUserContext } from "../../context";
import Layout from "../../components/layout/layout";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const router = useRouter();

  const { signInUser } = useContext(authUserContext);

  const onSubmit = (event) => {
    setError(null);
    signInUser(email, password)
      .then((authUser) => {
        router.push("/dashboard/create");
      })
      .catch((error) => {
        setError(error.message);
      });
    event.preventDefault();
  };

  return (
    <>
      <Layout>
        <main className="bg-grey pt-80 pb-50">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-6 col-md-10">
                <div className="login_wrap widget-taber-content p-30 bg-white border-radius-10">
                  <div className="padding_eight_all bg-white">
                    <div className="heading_s1 text-center">
                      <h3 className="mb-30 font-weight-900">Login</h3>
                    </div>
                    <form onSubmit={onSubmit}>
                      {error && <div style={{ color: "red" }}>{error}</div>}
                      <div className="form-group">
                        <input
                          type="text"
                          required=""
                          value={email}
                          className="form-control"
                          name="email"
                          placeholder="Your Email"
                          onChange={(event) => setEmail(event.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          className="form-control"
                          required=""
                          type="password"
                          name="password"
                          value={password}
                          placeholder="Password"
                          onChange={(event) => setPassword(event.target.value)}
                        />
                      </div>
                      <div
                        className="login_footer form-group"
                        style={{ margin: "2rem 0rem 3rem 0rem" }}
                      >
                        <div className="chek-form">
                          <div className="custome-checkbox">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="checkbox"
                              id="exampleCheckbox1"
                              value=""
                            />
                            <label
                              className="form-check-label"
                              htmlFor="exampleCheckbox1"
                            >
                              <span>Remember me</span>
                            </label>
                          </div>
                        </div>
                        <a className="text-muted">Forgot password?</a>
                      </div>
                      <div className="form-group">
                        <button
                          type="submit"
                          className="button button-contactForm btn-block"
                        >
                          Log in
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}
export default Login;
