import { useContext, useState } from "react";
import { useRouter } from "next/router";

import { authUserContext } from "../../context";

import Layout from "../../components/layout/layout";
function Register() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const { createUser } = useContext(authUserContext);

  const onSubmit = (event) => {
    event.preventDefault();
    setError(null);

    var password = event.target.password.value;
    var confirmPassword = event.target.confirmPassword.value;
    if (!event.target.checkbox.checked)
      setError("Agree our terms and condition");
    else if (password === confirmPassword)
      createUser(event.target)
        .then(() => {
          router.push("/auth/login");
          console.log("Success. The user is created in Firebase");
        })
        .catch((error) => {
          // An error occurred. Set error message to be displayed to user
          console.log(error.message);
          setError(error.message);
        });
    else setError("password must be same as confirm password");
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
                      <h3 className="mb-30 font-weight-900">
                        Create an account
                      </h3>
                    </div>
                    <form onSubmit={onSubmit}>
                      {error && <div style={{ color: "red" }}>{error}</div>}
                      <div className="form-group">
                        <input
                          type="text"
                          required
                          className="form-control"
                          name="email"
                          placeholder="Email"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          className="form-control"
                          required
                          type="password"
                          name="password"
                          placeholder="Password"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          className="form-control"
                          required
                          type="password"
                          name="confirmPassword"
                          placeholder="Confirm password"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          className="form-control"
                          required
                          type="text"
                          name="name"
                          placeholder="Your Name"
                        />
                      </div>
                      <div className="form-group">
                        <textarea
                          className="form-control"
                          required
                          type="text"
                          name="about"
                          placeholder="Tell about your self"
                        />
                      </div>
                      <label
                        className="form-check-label mb-3"
                        htmlFor="exampleCheckbox1"
                      >
                        Please provide valid links
                      </label>
                      <div className="form-group">
                        <input
                          className="form-control"
                          required
                          type="text"
                          name="profileUrl"
                          placeholder="Paste profile image url"
                        />
                      </div>
                      <div
                        className="form-group"
                        style={{ display: "flex", flexDirection: "row" }}
                      >
                        <input
                          className="form-control mr-2"
                          type="text"
                          name="instagramUrl"
                          placeholder="Instagram url"
                        />
                        <input
                          className="form-control mr-2"
                          type="text"
                          name="facebookUrl"
                          placeholder="FaceBook Url"
                        />
                        <input
                          className="form-control"
                          type="text"
                          name="twitterUrl"
                          placeholder="Twitter Url"
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
                            />
                            <label
                              className="form-check-label"
                              htmlFor="exampleCheckbox1"
                            >
                              <span>I agree to terms &amp; Policy.</span>
                            </label>
                          </div>
                        </div>
                        <a className="text-muted">Lean more</a>
                      </div>
                      <div className="form-group">
                        <button
                          type="submit"
                          className="button button-contactForm btn-block"
                        >
                          Submit &amp; Register
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
export default Register;
