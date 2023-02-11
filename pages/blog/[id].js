import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/layout";
import data from "../../data/post.json";
import { fetchBlogById } from "../../firebaseConfig/operations";
import Image from "next/image";
import { authUserContext } from "../../context";

import {
  TwitterShareButton,
  PinterestShareButton,
  WhatsappShareButton,
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  PinterestIcon,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";

const SingleVendor = () => {
  let Router = useRouter();

  const [singleData, setSingleData] = useState(null);
  const { authUser } = useContext(authUserContext);

  const { id } = Router.query;

  useEffect(() => {
    fetchBlog(id);
  }, [id]);

  const fetchBlog = async (id) => {
    if (id) {
      await fetchBlogById(id).then((blog) => {
        console.log(blog, "all");
        setSingleData(blog);
      });
    }
  };
  return (
    <>
      <Layout>
        {singleData && (
          <>
            <main className="bg-grey pb-30">
              {singleData.createdBy === authUser?.uid && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    //paddingRight: "20rem",
                  }}
                >
                  <div>
                    Hi {singleData.userDetails.name}, I think of us as
                    journalists; the medium we work in is blogging
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="btn button"
                      onClick={() =>
                        Router.push(`/dashboard/red/${singleData.id}`)
                      }
                      style={{
                        height: "2.7rem",
                        margin: "1rem 0rem 1rem 0rem",
                      }}
                    >
                      Edit This Blog
                    </button>
                  </div>
                </div>
              )}
              <div
                className="entry-header entry-header-style-2 pb-80 pt-80 mb-50 text-white"
                style={{
                  backgroundImage: `url(${singleData.coverImage})`,
                  backgroundRepeat: " no-repeat",
                  backgroundSize: "fill",
                }}
              >
                <div className="container entry-header-content">
                  <h1 className="entry-title mb-50 font-weight-900">
                    {singleData.title}
                  </h1>
                  <div className="entry-meta align-items-center meta-2 font-small color-white">
                    <p className="mb-5">
                      <Link href="/author">
                        <a className="author-avatar" href="#">
                          <img
                            className="img-circle"
                            src={singleData.userDetails.profileUrl}
                            alt=""
                          />
                        </a>
                      </Link>
                      By{" "}
                      <Link href={`/author/${singleData.userDetails.id}`}>
                        <a>
                          <span className="author-name font-weight-bold">
                            {singleData.userDetails.name}
                          </span>
                        </a>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
              <div className="container single-content">
                {/* <!--end single header--> */}
                {/* <!--figure--> */}
                <article className="entry-wraper mb-50">
                  <div
                    dangerouslySetInnerHTML={{ __html: singleData.content }}
                  />
                  <div className="entry-bottom mt-50 mb-30 wow fadeIn animated">
                    <div className="tags">
                      <span>Tags: </span>
                      {singleData.category?.map((cat) => (
                        <Link key={cat} href={`/category/${cat}`}>
                          <a>#{cat}</a>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="single-social-share clearfix wow fadeIn animated">
                    <div className="entry-meta meta-1 font-small color-grey float-left mt-10">
                      <span className="hit-count mr-15">
                        <i className="elegant-icon icon_like mr-5"></i>
                        {singleData.likes} likes
                      </span>
                      <span className="hit-count">
                        <i className="elegant-icon icon_star-half_alt mr-5"></i>
                        Rate: 9/10
                      </span>
                    </div>
                    <ul className="header-social-network d-inline-block list-inline float-md-right mt-md-0 mt-4">
                      <li className="list-inline-item text-muted">
                        <span>Share this: </span>
                      </li>
                      <li className="list-inline-item">
                        <FacebookShareButton
                          url={window?.location.href}
                          quote={`"check this blog ${singleData.title}"`}
                          hashtag="ajBlogs personalBlog"
                        >
                          <FacebookIcon size={28} round={true} />
                        </FacebookShareButton>
                      </li>
                      <li className="list-inline-item">
                        <TwitterShareButton
                          url={window?.location.href}
                          title={`check this blog "${singleData.title}"`}
                          hashtag="ajBlogs personalBlog"
                        >
                          <TwitterIcon size={28} round={true} />
                        </TwitterShareButton>
                      </li>
                      <li className="list-inline-item">
                        <PinterestShareButton
                          url={window?.location.href}
                          media={singleData.coverImage}
                          description={`check this blog "${singleData.title}"`}
                        >
                          <PinterestIcon size={28} round={true} />
                        </PinterestShareButton>
                      </li>
                      <li className="list-inline-item">
                        <WhatsappShareButton
                          url={window?.location.href}
                          title={`check this blog "${singleData.title}"`}
                        >
                          <WhatsappIcon size={28} round={true} />
                        </WhatsappShareButton>
                      </li>
                      <li className="list-inline-item">
                        <LinkedinShareButton
                          url={window?.location.href}
                          title={`check this blog "${singleData.title}"`}
                        >
                          <LinkedinIcon size={28} round={true} />
                        </LinkedinShareButton>
                      </li>
                    </ul>
                  </div>
                  {/* <!--author box--> */}
                  <div className="author-bio p-30 mt-50 border-radius-10 bg-white wow fadeIn animated">
                    <div className="author-image mb-30">
                      <Link href="/author">
                        <a>
                          <img
                            src={singleData.userDetails.profileUrl}
                            alt=""
                            className="avatar"
                          />
                        </a>
                      </Link>
                    </div>
                    <div className="author-info">
                      <h4 className="font-weight-bold mb-20">
                        <span className="vcard author">
                          <span className="fn">
                            <Link href="/author">
                              <a>{singleData.userDetails.name}</a>
                            </Link>
                          </span>
                        </span>
                      </h4>
                      <h5 className="text-muted">About author</h5>
                      <div className="author-description text-muted">
                        {singleData.userDetails.about}
                      </div>
                      <Link href="/author">
                        <a className="author-bio-link mb-md-0 mb-3">
                          View all posts (
                          {singleData.userDetails.blogList.length})
                        </a>
                      </Link>
                      <div className="author-social">
                        <ul className="author-social-icons">
                          <li className="author-social-link-facebook">
                            <Link href="/#">
                              <a target="_blank">
                                <i className="ti-facebook"></i>
                              </a>
                            </Link>
                          </li>
                          <li className="author-social-link-twitter">
                            <Link href="/#">
                              <a target="_blank">
                                <i className="ti-twitter-alt"></i>
                              </a>
                            </Link>
                          </li>
                          <li className="author-social-link-pinterest">
                            <Link href="/#">
                              <a target="_blank">
                                <i className="ti-pinterest"></i>
                              </a>
                            </Link>
                          </li>
                          <li className="author-social-link-instagram">
                            <Link href="/#">
                              <a target="_blank">
                                <i className="ti-instagram"></i>
                              </a>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/* <!--related posts--> */}
                  <div className="related-posts">
                    <div className="post-module-3">
                      <div className="widget-header-2 position-relative mb-30">
                        <h5 className="mt-5 mb-30">Related posts</h5>
                      </div>
                      <div className="loop-list loop-list-style-1">
                        {data.slice(1, 3).map((item, i) => (
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
                                      backgroundImage: `url(/assets/imgs/news/${item.img})`,
                                    }}
                                  >
                                    <Link href={`/blog/${item.id}`}>
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
                                      <Link href="/#">
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
                                      <Link href="/#">
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
                                      <Link href="/#">
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
                              </div>
                              <div className="col-md-8 align-self-center">
                                <div className="post-content">
                                  <div className="entry-meta meta-0 font-small mb-10">
                                    <Link href={`/blog/${item.id}`}>
                                      <a>
                                        <span className="post-cat text-primary">
                                          {item.category}
                                        </span>
                                      </a>
                                    </Link>
                                  </div>
                                  <h5 className="post-title font-weight-900 mb-20">
                                    <Link href={`/blog/${item.id}`}>
                                      <a>{item.title}</a>
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
                  </div>
                  {/* <!--More posts--> */}
                  <div className="single-more-articles border-radius-5">
                    <div className="widget-header-2 position-relative mb-30">
                      <h5 className="mt-5 mb-30">You might be interested in</h5>
                      <button className="single-more-articles-close">
                        <i className="elegant-icon icon_close"></i>
                      </button>
                    </div>
                    <div className="post-block-list post-module-1 post-module-5">
                      <ul className="list-post">
                        <li className="mb-30">
                          <div className="d-flex hover-up-2 transition-normal">
                            <div className="post-thumb post-thumb-80 d-flex mr-15 border-radius-5 img-hover-scale overflow-hidden">
                              <Link href="/single">
                                <a className="color-white">
                                  <img
                                    src="/assets/imgs/news/thumb-1.jpg"
                                    alt=""
                                  />
                                </a>
                              </Link>
                            </div>
                            <div className="post-content media-body">
                              <h6 className="post-title mb-15 text-limit-2-row font-medium">
                                <Link href="/single">
                                  <a>The Best Time to Travel to Cambodia</a>
                                </Link>
                              </h6>
                              <div className="entry-meta meta-1 float-left font-x-small text-uppercase">
                                <span className="post-on">27 Jan</span>
                                <span className="post-by has-dot">
                                  13k views
                                </span>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className="mb-10">
                          <div className="d-flex hover-up-2 transition-normal">
                            <div className="post-thumb post-thumb-80 d-flex mr-15 border-radius-5 img-hover-scale overflow-hidden">
                              <Link href="/single">
                                <a className="color-white">
                                  <img
                                    src="/assets/imgs/news/thumb-2.jpg"
                                    alt=""
                                  />
                                </a>
                              </Link>
                            </div>
                            <div className="post-content media-body">
                              <h6 className="post-title mb-15 text-limit-2-row font-medium">
                                <Link href="/single">
                                  <a>
                                    20 Photos to Inspire You to Visit Cambodia
                                  </a>
                                </Link>
                              </h6>
                              <div className="entry-meta meta-1 float-left font-x-small text-uppercase">
                                <span className="post-on">27 August</span>
                                <span className="post-by has-dot">
                                  14k views
                                </span>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* <!--Comments--> */}
                  <div className="comments-area">
                    <div className="widget-header-2 position-relative mb-30">
                      <h5 className="mt-5 mb-30">Comments</h5>
                    </div>
                  </div>
                  {/* <!--comment form--> */}
                  <div className="comment-form wow fadeIn animated">
                    <div className="widget-header-2 position-relative mb-30">
                      <h5 className="mt-5 mb-30">Leave a Reply</h5>
                    </div>
                    <form
                      className="form-contact comment_form"
                      action="#"
                      id="commentForm"
                    >
                      <div className="row">
                        <div className="col-12">
                          <div className="form-group">
                            <textarea
                              className="form-control w-100"
                              name="comment"
                              id="comment"
                              cols="30"
                              rows="9"
                              placeholder="Write Comment"
                            ></textarea>
                          </div>
                        </div>
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
                              placeholder="Website"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <button
                          type="submit"
                          className="btn button button-contactForm"
                        >
                          Post Comment
                        </button>
                      </div>
                    </form>
                  </div>
                </article>
              </div>
              {/* <!--container--> */}
            </main>
          </>
        )}
      </Layout>
    </>
  );
};

export default SingleVendor;
