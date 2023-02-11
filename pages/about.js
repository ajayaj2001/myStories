import Layout from "../components/layout/layout";
function About() {
  return (
    <>
      <Layout>
        <main className="bg-grey pb-30">
          <div className="container single-content">
            <div className="entry-header entry-header-style-1 mb-50 pt-50 text-center">
              <h1 className="entry-title mb-20 font-weight-900 ">About me</h1>
              <p className="text-muted">
                <span
                  className="typewrite d-inline"
                  data-period="2000"
                  data-type='[ " Travel Blogger. ", "Content Writter. ", "Food Guides " ]'
                ></span>
              </p>
            </div>
            {/* <!--end single header--> */}
            <figure className="image mb-30 m-auto text-center border-radius-10">
              <img
                className="border-radius-10"
                src="/assets/imgs/news/news-17.jpg"
                alt="post-title"
              />
            </figure>
            {/* <!--figure--> */}
            <article className="entry-wraper">
              <p className="font-large">
                {`Hi, I'm Ajay. I'm a full-stack developer with hobbies like
                writing blogs, creating awesome websites like this, swimming,
                For fun, I enjoy reading books and doing a variety of idotic
                activities. I hope this website will help you express your
                feelings and have control over what you want to share. Continue
                expressing and storing your emotions. Don't hide it from
                yourself; it will burst. keep right keep Read, believe, and have
                fun.`}
              </p>
              <hr className="wp-block-separator is-style-wide" />
              <p>
                <span className="mr-5">
                  <ion-icon
                    name="location-outline"
                    role="img"
                    className="md hydrated"
                    aria-label="location outline"
                  ></ion-icon>
                </span>
                <strong>Address</strong> : Some where having hope that miracle
                also happen for me
              </p>
              <p>
                <span className="mr-5">
                  <ion-icon
                    name="home-outline"
                    role="img"
                    className="md hydrated"
                    aria-label="home outline"
                  ></ion-icon>
                </span>
                <strong>My website</strong>:{" "}
                <a href="https://ajay.live">https://ajay.live</a>
              </p>
              <p>
                <span className="mr-5">
                  <ion-icon
                    name="planet-outline"
                    role="img"
                    className="md hydrated"
                    aria-label="planet outline"
                  ></ion-icon>
                </span>
                <strong>Support center</strong>:{" "}
                <a href="email:myblog@ajay.live">myblog@ajay.live</a>
              </p>
              <h3 className="mt-30">Now Your Turn</h3>
              <hr className="wp-block-separator is-style-wide" />
              <p>
                Please contact me directly at ajayaj7397@gmail.com. you can also
                fill the form below for any features you want, or you can
                express your feelings.{" "}
              </p>
              <h1 className="mt-30">Get in touch</h1>
              <hr className="wp-block-separator is-style-wide" />
              <form
                className="form-contact comment_form"
                action="#"
                id="commentForm"
              >
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <input
                        className="form-control"
                        name="name"
                        id="name"
                        type="text"
                        placeholder="Name"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <input
                        className="form-control"
                        name="email"
                        id="email"
                        type="email"
                        placeholder="Email"
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <input
                        className="form-control"
                        name="website"
                        id="website"
                        type="text"
                        placeholder="Phone"
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <textarea
                        className="form-control w-100"
                        name="comment"
                        id="comment"
                        cols="30"
                        rows="9"
                        placeholder="Message"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <button type="submit" className="button button-contactForm">
                    Send message
                  </button>
                </div>
              </form>
            </article>
          </div>
          {/* <!--container--> */}
        </main>
      </Layout>
    </>
  );
}
export default About;
