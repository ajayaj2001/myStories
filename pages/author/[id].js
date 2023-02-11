import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/layout/layout";
import post from "../../data/post.json";
import { fetchUserByIdAndBlog } from "../../firebaseConfig/operations";
import {
  FacebookIcon,
  FacebookShareButton,
  PinterestIcon,
  PinterestShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

function Author() {
  let Router = useRouter();

  const [singleData, setSingleData] = useState(null);

  const { id } = Router.query;

  const fetchUser = (userId) => {
    if (userId) {
      fetchUserByIdAndBlog(userId).then((val) => {
        setSingleData(val);
      });
    }
  };

  useEffect(() => {
    fetchUser(id);
  }, [id]);
  return (
    <>
      <Layout>
        <main className="bg-grey pt-50 pb-50">
          <div className="container">
            <div className="row">
              <div className="col-12">
                {/* <!--author box--> */}
                {singleData?.id && (
                  <div className="author-bio mb-50 bg-white p-30 border-radius-10">
                    <div className="author-image mb-30">
                      <a href={`/author/${singleData.id}`}>
                        <img
                          src={singleData.profileUrl}
                          alt=""
                          className="avatar"
                        />
                      </a>
                    </div>
                    <div className="author-info">
                      <h3 className="font-weight-900">
                        <span className="vcard author">
                          <span className="fn">
                            <a href={`/author/${singleData.id}`} rel="author">
                              {singleData.name}
                            </a>
                          </span>
                        </span>
                      </h3>
                      <h5 className="text-muted">About author</h5>
                      <div className="author-description text-muted">
                        {singleData.about}
                      </div>
                      <strong className="text-muted">Follow : </strong>
                      <ul className="header-social-network d-inline-block list-inline color-white mb-20">
                        <li className="list-inline-item">
                          <FacebookShareButton
                            url={singleData.facebookUrl}
                            quote={`"check this author ${singleData.name}"`}
                            hashtag="ajBlogs personalBlog"
                          >
                            <FacebookIcon size={24} round={true} />
                          </FacebookShareButton>
                        </li>
                        <li className="list-inline-item">
                          <TwitterShareButton
                            url={singleData.twitterUrl}
                            title={`check this author "${singleData.name}"`}
                            hashtag="ajBlogs personalBlog"
                          >
                            <TwitterIcon size={24} round={true} />
                          </TwitterShareButton>
                        </li>
                        <li className="list-inline-item">
                          <PinterestShareButton
                            url={singleData.instagramUrl}
                            media={singleData.profileUrl}
                            description={`check this author "${singleData.name}"`}
                          >
                            <PinterestIcon size={24} round={true} />
                          </PinterestShareButton>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-lg-8">
                <div className="post-module-2">
                  <div className="widget-header-2 position-relative mb-30  wow fadeInUp animated">
                    <h5 className="mt-5 mb-30">Posted by Steven</h5>
                  </div>
                  <div className="loop-list loop-list-style-1">
                    <div className="row">
                      {singleData?.blogList?.slice(0, 2).map((item, i) => (
                        <article
                          key={i}
                          className="col-md-6 mb-30 wow fadeInUp animated"
                          data-wow-delay="0.2s"
                        >
                          <div className="post-card-1 border-radius-10 hover-up">
                            <div
                              className="post-thumb thumb-overlay img-hover-slide position-relative"
                              style={{
                                backgroundImage: `url(${item.coverImage})`,
                              }}
                            >
                              <Link href={`/blog/${item.id}`}>
                                <a className="img-link"></a>
                              </Link>
                              <span className="top-right-icon bg-success">
                                <i className="elegant-icon icon_camera_alt"></i>
                              </span>
                              <ul className="social-share">
                                <li>
                                  <Link href="#">
                                    <a>
                                      <i className="elegant-icon social_share"></i>
                                    </a>
                                  </Link>
                                </li>
                                <li>
                                  <Link href="#">
                                    <a
                                      className="fb"
                                      title="Share on Facebook"
                                      target="_blank"
                                    >
                                      <i className="elegant-icon social_facebook"></i>
                                    </a>
                                  </Link>
                                </li>
                                <li>
                                  <Link href="#">
                                    <a
                                      className="tw"
                                      target="_blank"
                                      title="Tweet now"
                                    >
                                      <i className="elegant-icon social_twitter"></i>
                                    </a>
                                  </Link>
                                </li>
                                <li>
                                  <Link href="#">
                                    <a
                                      className="pt"
                                      target="_blank"
                                      title="Pin it"
                                    >
                                      <i className="elegant-icon social_pinterest"></i>
                                    </a>
                                  </Link>
                                </li>
                              </ul>
                            </div>
                            <div className="post-content p-30">
                              <div className="entry-meta meta-0 font-small mb-10">
                                {item.category?.map((tag) => (
                                  <Link key={tag} href={`/category/${tag}`}>
                                    <a>
                                      <span className="post-cat text-primary">
                                        #{tag}
                                      </span>
                                    </a>
                                  </Link>
                                ))}
                              </div>
                              <div className="d-flex post-card-content">
                                <h5 className="post-title mb-20 font-weight-900">
                                  <Link href={`/blog/${item.id}`}>
                                    <a>{item.title}</a>
                                  </Link>
                                </h5>
                                <div className="entry-meta meta-1 float-left font-x-small text-uppercase">
                                  <span className="post-on">{item.date}</span>
                                  <span className="time-reading has-dot">
                                    {item.readTime} read
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
                <div className="post-module-3">
                  <div className="loop-list loop-list-style-1">
                    {singleData?.blogList?.slice(2).map((blog, i) => (
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
                                  backgroundImage: `url(${blog.coverImage})`,
                                }}
                              >
                                <Link href={`/blog/${blog.id}`}>
                                  <a className="img-link"></a>
                                </Link>
                              </div>
                              <ul className="social-share">
                                <li>
                                  <Link href="/#">
                                    <a>
                                      <i className="elegant-icon social_share"></i>
                                    </a>
                                  </Link>
                                </li>
                                <li>
                                  <FacebookShareButton
                                    url={`https://blog.ajay.live/blog/${blog.id}`}
                                    quote={`"check this blog ${blog.title}"`}
                                    hashtag="ajBlogs personalBlog"
                                  >
                                    <FacebookIcon size={24} round={true} />
                                  </FacebookShareButton>
                                </li>
                                <li>
                                  <TwitterShareButton
                                    url={`https://blog.ajay.live/blog/${blog.id}`}
                                    title={`check this blog "${blog.title}"`}
                                    hashtag="ajBlogs personalBlog"
                                  >
                                    <TwitterIcon size={24} round={true} />
                                  </TwitterShareButton>
                                </li>
                                <li>
                                  <PinterestShareButton
                                    url={`https://blog.ajay.live/blog/${blog.id}`}
                                    media={blog.coverImage}
                                    description={`check this blog "${blog.title}"`}
                                  >
                                    <PinterestIcon size={24} round={true} />
                                  </PinterestShareButton>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="col-md-8 align-self-center">
                            <div className="post-content">
                              <div className="entry-meta meta-0 font-small mb-10">
                                {blog.category?.map((tag) => (
                                  <Link key={tag} href={`/category/${tag}`}>
                                    <a>
                                      <span className="post-cat text-primary">
                                        #{tag}
                                      </span>
                                    </a>
                                  </Link>
                                ))}
                              </div>
                              <h5 className="post-title font-weight-900 mb-20">
                                <Link href={`/blog/${blog.id}`}>
                                  <a>{blog.title}</a>
                                </Link>
                                <span className="post-format-icon">
                                  <i className="elegant-icon icon_star_alt"></i>
                                </span>
                              </h5>
                              <div className="entry-meta meta-1 float-left font-x-small text-uppercase">
                                <span className="post-on">
                                  {new Date(
                                    blog.createdOn.seconds * 1000
                                  ).toLocaleDateString(undefined, {
                                    day: "2-digit",
                                    year: "numeric",
                                    month: "short",
                                  })}
                                </span>
                                <span className="post-by has-dot">
                                  {`${blog.views} views`}
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
              <div className="col-lg-4 primary-sidebar sticky-sidebar">
                <div className="widget-area">
                  <div className="sidebar-widget widget-latest-posts mb-50 wow fadeInUp animated">
                    <div className="widget-header-2 position-relative mb-30">
                      <h5 className="mt-5 mb-30">Most popular</h5>
                    </div>
                    <div className="post-block-list post-module-1">
                      <ul className="list-post">
                        {post.slice(1, 5).map((item, i) => (
                          <li key={i} className="mb-30 wow fadeInUp animated">
                            <div className="d-flex bg-white has-border p-25 hover-up transition-normal border-radius-5">
                              <div className="post-content media-body">
                                <h6 className="post-title mb-15 text-limit-2-row font-medium">
                                  <Link href={`/blog/${item.id}`}>
                                    <a>{item.title}</a>
                                  </Link>
                                </h6>
                                <div className="entry-meta meta-1 float-left font-x-small text-uppercase">
                                  <span className="post-on">{item.date}</span>
                                  <span className="post-by has-dot">
                                    {item.views} views
                                  </span>
                                </div>
                              </div>
                              <div className="post-thumb post-thumb-80 d-flex ml-15 border-radius-5 img-hover-scale overflow-hidden">
                                <Link href={`/blog/${item.id}`}>
                                  <a className="color-white">
                                    <img
                                      src={`/assets/imgs/news/${item.img}`}
                                      alt=""
                                    />
                                  </a>
                                </Link>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="sidebar-widget widget_instagram wow fadeInUp animated">
                    <div className="widget-header-2 position-relative mb-30">
                      <h5 className="mt-5 mb-30">Instagram</h5>
                    </div>
                    <div className="instagram-gellay">
                      <ul className="insta-feed">
                        <li>
                          <a
                            href="assets/imgs/thumbnail-3.jpg"
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
                          </a>
                        </li>
                        <li>
                          <a
                            href="assets/imgs/thumbnail-4.jpg"
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
                          </a>
                        </li>
                        <li>
                          <a
                            href="assets/imgs/thumbnail-5.jpg"
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
                          </a>
                        </li>
                        <li>
                          <a
                            href="assets/imgs/thumbnail-3.jpg"
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
                          </a>
                        </li>
                        <li>
                          <a
                            href="assets/imgs/thumbnail-4.jpg"
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
                          </a>
                        </li>
                        <li>
                          <a
                            href="assets/imgs/thumbnail-5.jpg"
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
                          </a>
                        </li>
                      </ul>
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
export default Author;
