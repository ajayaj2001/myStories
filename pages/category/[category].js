import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import {
  FacebookIcon,
  FacebookShareButton,
  PinterestIcon,
  PinterestShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import Layout from "../../components/layout/layout";
import { getBlogsByFilter } from "../../firebaseConfig/operations";

function CaregoryList() {
  const router = useRouter();
  const { category } = router.query;
  const [blogList, setBlogList] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    if (category) {
      getBlogList();
    }
  }, [category]);

  const itemsPerPage = 6;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = blogList.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(blogList.length / itemsPerPage);

  const getBlogList = async () => {
    let capitalizedCategory =
      category.charAt(0).toUpperCase() + category.slice(1);
    let val = await getBlogsByFilter("", [capitalizedCategory]);
    setBlogList(val);
    console.log(val);
  };

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % blogList.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Layout>
        <main>
          {/* <!--archive header--> */}
          <div className="archive-header pt-50 text-center pb-50">
            <div className="container">
              <h2 className="font-weight-900">{category?.toUpperCase()}</h2>
              <div className="breadcrumb">
                <Link href="/">
                  <a rel="nofollow">Home</a>
                </Link>
                <span></span> {category?.toLocaleUpperCase()}
              </div>
            </div>
          </div>
          <div className="container">
            {/* <!--Loop Masonry--> */}
            <div className="grid row mb-30" style={{ height: "100%" }}>
              {currentItems.length > 0 ? (
                currentItems.map((blog, i) => (
                  <article
                    className="grid-item col pb-50 wow fadeIn animated"
                    key={i}
                  >
                    <div className="post-card-1 border-radius-10 hover-up">
                      <div
                        className="post-thumb thumb-overlay img-hover-slide position-relative"
                        style={{
                          backgroundImage: `url(${blog.coverImage})`,
                        }}
                      >
                        <Link href={`/blog/${blog.id}`}>
                          <a className="img-link"></a>
                        </Link>
                        <span className="top-right-icon bg-success">
                          <i className="elegant-icon icon_camera_alt"></i>
                        </span>
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
                      <div className="post-content p-30">
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
                        <div className="d-flex post-card-content">
                          <h5 className="post-title mb-20 font-weight-900">
                            <Link href={`/blog/${blog.id}`}>
                              <a>{blog.title}</a>
                            </Link>
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
                ))
              ) : (
                <div>No Blog Found</div>
              )}
            </div>
            <div className="row">
              <div className="col-12">
                <div className="pagination-area mb-30 wow fadeInUp animated">
                  <nav aria-label="Page navigation example">
                    <ReactPaginate
                      breakLabel="..."
                      nextLabel={<i className="elegant-icon arrow_right"></i>}
                      onPageChange={handlePageClick}
                      pageRangeDisplayed={5}
                      pageCount={pageCount}
                      previousLabel={
                        <i className="elegant-icon arrow_left"></i>
                      }
                      renderOnZeroPageCount={null}
                      pageClassName="page-item"
                      pageLinkClassName="page-link"
                      containerClassName="pagination justify-content-start"
                      disabledClassName="page-item-disabled"
                      disabledLinkClassName="page-link-disabled"
                      activeClassName="page-item active"
                      activeLinkClassName="page-link"
                      nextClassName="page-item"
                      nextLinkClassName="page-link"
                      previousClassName="page-item"
                      previousLinkClassName="page-link"
                      marginPagesDisplayed={2}
                    />
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </main>{" "}
      </Layout>
    </>
  );
}
export default CaregoryList;
