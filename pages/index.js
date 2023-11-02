import Link from "next/link";
import Layout from "./../components/layout/layout";
import PostCarousel1 from "./../components/slider/PostCarousel1";
import post from "../data/post.json";
import author from "../data/author.json";
import { authUserContext } from "../context";
import { useContext } from "react";

function Home() {
  const { signOutUser, authUser } = useContext(authUserContext);
  return (
    <>
      <Layout signOutUser={signOutUser} authUser={authUser}>
        <main>
          <div className="featured-1">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 align-self-center">
                  <p className="text-muted">
                    <span
                      className="typewrite d-inline"
                      data-period="2000"
                      data-type='[ " Travel Blogger. ", "Content Writter. ", "Food Guides " ]'
                    ></span>
                  </p>
                  <h2>
                    Hello, I’m <span>Ajay</span>
                  </h2>
                  <h3 className="mb-20"> Welcome to my blog</h3>
                  <h5 className="text-muted">
                    Dont miss out on the latest news about Travel tips, Hotels
                    review, Food guide...
                  </h5>
                  <form className="input-group form-subcriber mt-30 d-flex">
                    <input
                      type="email"
                      className="form-control bg-white font-small"
                      placeholder="Enter your email"
                    />
                    <button className="btn bg-primary text-white" type="submit">
                      Subscribe
                    </button>
                  </form>
                </div>
                <div className="col-lg-6 text-right d-none d-lg-block">
                  <img src="/assets/imgs/authors/featured.png" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="hot-tags pt-30 pb-30 font-small align-self-center">
              <div className="widget-header-3">
                <div className="row align-self-center">
                  <div className="col-md-4 align-self-center">
                    <h5 className="widget-title">Featured posts</h5>
                  </div>
                  <div className="col-md-8 text-md-right font-small align-self-center">
                    <p className="d-inline-block mr-5 mb-0">
                      <i className="elegant-icon  icon_tag_alt mr-5 text-muted"></i>
                      Hot tags:
                    </p>
                    <ul className="list-inline d-inline-block tags">
                      <li className="list-inline-item">
                        <a href="#"># Covid-19</a>
                      </li>
                      <li className="list-inline-item">
                        <a href="#"># Inspiration</a>
                      </li>
                      <li className="list-inline-item">
                        <a href="#"># Work online</a>
                      </li>
                      <li className="list-inline-item">
                        <a href="#"># Stay home</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="loop-grid mb-30">
              <div className="row">
                <div className="col-lg-8 mb-30">
                  <PostCarousel1 />
                </div>
                {post.slice(1, 5).map((item, i) => (
                  <article
                    className="col-lg-4 col-md-6 mb-30 wow fadeInUp animated"
                    data-wow-delay="0.2s"
                    key={i}
                  >
                    <div className="post-card-1 border-radius-10 hover-up">
                      <div
                        className="post-thumb thumb-overlay img-hover-slide position-relative"
                        style={{
                          backgroundImage: `url(assets/imgs/news/${item.img})`,
                        }}
                      >
                        <Link
                          href={`/blog/${item.id}`}
                          className="img-link"
                        ></Link>
                        <span className="top-right-icon bg-success">
                          <i className="elegant-icon icon_camera_alt"></i>
                        </span>
                        <ul className="social-share">
                          <li>
                            <Link href="#">
                              <i className="elegant-icon social_share"></i>
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="#"
                              className="fb"
                              title="Share on Facebook"
                              target="_blank"
                            >
                              <i className="elegant-icon social_facebook"></i>
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="#"
                              className="tw"
                              target="_blank"
                              title="Tweet now"
                            >
                              <i className="elegant-icon social_twitter"></i>
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="#"
                              className="pt"
                              target="_blank"
                              title="Pin it"
                            >
                              <i className="elegant-icon social_pinterest"></i>
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="post-content p-30">
                        <div className="entry-meta meta-0 font-small mb-10">
                          <Link href={`/category/${item.category}`}>
                            <span className="post-cat text-info">
                              {item.category}
                            </span>
                          </Link>
                        </div>
                        <div className="d-flex post-card-content">
                          <h5 className="post-title mb-20 font-weight-900">
                            <Link href={`/blog/${item.id}`}>{item.title}</Link>
                          </h5>
                          <div className="entry-meta meta-1 float-left font-x-small text-uppercase">
                            <span className="post-on">{item.date}</span>
                            <span className="time-reading has-dot">
                              {item.readTime} mins read
                            </span>
                            <span className="post-by has-dot">
                              {item.views} views
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-grey pt-50 pb-50">
            <div className="container">
              <div className="row">
                <div className="col-lg-8">
                  <div className="post-module-3">
                    <div className="widget-header-1 position-relative mb-30">
                      <h5 className="mt-5 mb-30">Latest posts</h5>
                    </div>
                    <div className="loop-list loop-list-style-1">
                      {post.slice(4, 8).map((item, i) => (
                        <article
                          className="hover-up-2 transition-normal wow fadeInUp animated"
                          key={i}
                        >
                          <div className="row mb-40 list-style-2">
                            <div className="col-md-4">
                              <div className="post-thumb position-relative border-radius-5">
                                <div
                                  className="img-hover-slide border-radius-5 position-relative"
                                  style={{
                                    backgroundImage: `url(assets/imgs/news/${item.img})`,
                                  }}
                                >
                                  <Link
                                    href={`/blog/${item.id}`}
                                    className="img-link"
                                  ></Link>
                                </div>
                                <ul className="social-share">
                                  <li>
                                    <Link href="/#">
                                      <i className="elegant-icon social_share"></i>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      href="/#"
                                      className="fb"
                                      title="Share on Facebook"
                                      target="_blank"
                                    >
                                      <i className="elegant-icon social_facebook"></i>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      href="/#"
                                      className="tw"
                                      target="_blank"
                                      title="Tweet now"
                                    >
                                      <i className="elegant-icon social_twitter"></i>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      href="/#"
                                      className="pt"
                                      target="_blank"
                                      title="Pin it"
                                    >
                                      <i className="elegant-icon social_pinterest"></i>
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="col-md-8 align-self-center">
                              <div className="post-content">
                                <div className="entry-meta meta-0 font-small mb-10">
                                  <Link href={`/category/${item.category}`}>
                                    <span className="post-cat text-primary">
                                      {item.category}
                                    </span>
                                  </Link>
                                </div>
                                <h5 className="post-title font-weight-900 mb-20">
                                  <Link href={`/blog/${item.id}`}>
                                    {item.title}
                                  </Link>
                                  <span className="post-format-icon">
                                    <i className="elegant-icon icon_star_alt"></i>
                                  </span>
                                </h5>
                                <div className="entry-meta meta-1 float-left font-x-small text-uppercase">
                                  <span className="post-on">{item.date}</span>
                                  <span className="time-reading has-dot">
                                    {item.readTime} mins read
                                  </span>
                                  <span className="post-by has-dot">
                                    {item.views} views
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                  <div className="pagination-area mb-30 wow fadeInUp animated">
                    <nav aria-label="Page navigation example">
                      <ul className="pagination justify-content-start">
                        <li className="page-item">
                          <Link href="/#" className="page-link">
                            <i className="elegant-icon arrow_left"></i>
                          </Link>
                        </li>
                        <li className="page-item active">
                          <Link href="/#" className="page-link">
                            01
                          </Link>
                        </li>
                        <li className="page-item">
                          <Link href="/#" className="page-link">
                            02
                          </Link>
                        </li>
                        <li className="page-item">
                          <Link href="/#" className="page-link">
                            03
                          </Link>
                        </li>
                        <li className="page-item">
                          <Link href="/#" className="page-link">
                            04
                          </Link>
                        </li>
                        <li className="page-item">
                          <Link href="/#" className="page-link">
                            <i className="elegant-icon arrow_right"></i>
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="widget-area">
                    <div className="sidebar-widget widget-about mb-50 pt-30 pr-30 pb-30 pl-30 bg-white border-radius-5 has-border  wow fadeInUp animated">
                      {author.slice(0, 1).map((item, i) => (
                        <>
                          <img
                            className="about-author-img mb-25"
                            src={`/assets/imgs/authors/${item.img}`}
                            alt=""
                          />
                          <h5 className="mb-20">Hello, Im {item.title}</h5>
                          <p className="font-medium text-muted">{item.desc}</p>
                          <strong>Follow me: </strong>
                          <ul className="header-social-network d-inline-block list-inline color-white mb-20">
                            <li className="list-inline-item">
                              <Link
                                href="/#"
                                className="fb"
                                target="_blank"
                                title="Facebook"
                              >
                                <i className="elegant-icon social_facebook"></i>
                              </Link>
                            </li>
                            <li className="list-inline-item">
                              <Link
                                href="/#"
                                className="tw"
                                target="_blank"
                                title="Tweet now"
                              >
                                <i className="elegant-icon social_twitter"></i>
                              </Link>
                            </li>
                            <li className="list-inline-item">
                              <Link
                                href="/#"
                                className="pt"
                                target="_blank"
                                title="Pin it"
                              >
                                <i className="elegant-icon social_pinterest"></i>
                              </Link>
                            </li>
                          </ul>
                        </>
                      ))}
                    </div>
                    <div className="sidebar-widget widget_instagram wow fadeInUp animated">
                      <div className="widget-header-1 position-relative mb-30">
                        <h5 className="mt-5 mb-30">Instagram</h5>
                      </div>
                      <div className="instagram-gellay">
                        <ul className="insta-feed">
                          <li>
                            <Link
                              href="/#"
                              className="play-video"
                              data-animate="zoomIn"
                              data-duration="1.5s"
                              data-delay="0.1s"
                            >
                              <img
                                className="border-radius-5"
                                src="/assets/imgs/news/thumb-1.jpg"
                                alt=""
                              />
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/#"
                              className="play-video"
                              data-animate="zoomIn"
                              data-duration="1.5s"
                              data-delay="0.1s"
                            >
                              <img
                                className="border-radius-5"
                                src="/assets/imgs/news/thumb-2.jpg"
                                alt=""
                              />
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/#"
                              className="play-video"
                              data-animate="zoomIn"
                              data-duration="1.5s"
                              data-delay="0.1s"
                            >
                              <img
                                className="border-radius-5"
                                src="/assets/imgs/news/thumb-3.jpg"
                                alt=""
                              />
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/#"
                              className="play-video"
                              data-animate="zoomIn"
                              data-duration="1.5s"
                              data-delay="0.1s"
                            >
                              <img
                                className="border-radius-5"
                                src="/assets/imgs/news/thumb-4.jpg"
                                alt=""
                              />
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/#"
                              className="play-video"
                              data-animate="zoomIn"
                              data-duration="1.5s"
                              data-delay="0.1s"
                            >
                              <img
                                className="border-radius-5"
                                src="/assets/imgs/news/thumb-5.jpg"
                                alt=""
                              />
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/#"
                              className="play-video"
                              data-animate="zoomIn"
                              data-duration="1.5s"
                              data-delay="0.1s"
                            >
                              <img
                                className="border-radius-5"
                                src="/assets/imgs/news/thumb-6.jpg"
                                alt=""
                              />
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
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
export default Home;
