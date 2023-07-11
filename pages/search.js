import Link from "next/link";
import { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import ReactPaginate from "react-paginate";
import {
  FacebookIcon,
  FacebookShareButton,
  PinterestIcon,
  PinterestShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import Layout from "../components/layout/layout";
import { fetchBlogTags, getBlogsByFilter } from "../firebaseConfig/operations";
function PageSearch() {
  const [blogList, setBlogList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [itemOffset, setItemOffset] = useState(0);
  const [tagSelected, setTagSelected] = useState([]);
  const [category, setCategory] = useState([]);

  const updateCategoryList = () => {
    fetchBlogTags().then((tags) => {
      if (tags.length > 0) return setCategory(tags);
    });
  };

  const itemsPerPage = 6;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = blogList.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(blogList.length / itemsPerPage);

  const getBlogList = async () => {
    let tags = [];
    if (tagSelected.length > 0) {
      tags = tagSelected.map((tag) => tag.value);
    }
    let val = await getBlogsByFilter(searchText, tags);
    setBlogList(val);
  };

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % blogList.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    getBlogList();
  }, [searchText, tagSelected]);

  useEffect(() => {
    updateCategoryList();
  }, []);

  const onSubmit = (val) => {
    val.preventDefault();
    let value = val.target.searchKey.value;
    setSearchText(value);
  };

  return (
    <>
      <Layout>
        <main>
          {/* <!--archive header--> */}
          <div className="archive-header pt-50">
            <div className="container">
              <h2 className="font-weight-900">Search </h2>
              <form onSubmit={onSubmit}>
                <div
                  className="form-group"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="text"
                    className="form-control"
                    name="searchKey"
                    placeholder="Press Enter to search"
                  />
                  <div style={{ display: "flex", marginLeft: "2rem" }}>
                    <label className="mr-2">Filter Category :</label>
                    <MultiSelect
                      hasSelectAll={false}
                      shouldToggleOnHover={true}
                      className="multi-select "
                      valueRenderer={(selected) =>
                        selected?.map((val) => (
                          <button
                            style={{ marginRight: ".5rem" }}
                            key={val.value}
                          >
                            {val.label}
                          </button>
                        ))
                      }
                      value={tagSelected}
                      onChange={(val) => setTagSelected(val)}
                      options={category?.map((tag) => ({
                        label: tag,
                        value: tag,
                      }))}
                      labelledBy="Categorysss"
                    />
                  </div>
                </div>
              </form>
              <div className="breadcrumb">
                We found {blogList.length} articles{" "}
                {searchText && (
                  <>
                    for <strong>{searchText} </strong> key word
                  </>
                )}
              </div>
              <div className="bt-1 border-color-1 mt-30 mb-50"></div>
            </div>
          </div>
          <div className="pb-50">
            <div className="container">
              <div className="row">
                <div className="col-lg-8">
                  <div className="post-module-3 search-item-container">
                    <div className="loop-list loop-list-style-1">
                      {currentItems &&
                        currentItems.map((blog, i) => (
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
                <div className="col-lg-4">
                  <div className="widget-area">
                    <div className="sidebar-widget widget-latest-posts mb-50 wow fadeInUp animated">
                      <div className="widget-header-1 position-relative mb-30">
                        <h5 className="mt-5 mb-30">Most popular</h5>
                      </div>
                      <div className="post-block-list post-module-1">
                        <ul className="list-post">
                          <li className="mb-30 wow fadeInUp animated">
                            <div className="d-flex bg-white has-border p-25 hover-up transition-normal border-radius-5">
                              <div className="post-content media-body">
                                <h6 className="post-title mb-15 text-limit-2-row font-medium">
                                  <Link href="/#">
                                    Spending Some Quality Time with Kids? It’s
                                    Possible
                                  </Link>
                                </h6>
                                <div className="entry-meta meta-1 float-left font-x-small text-uppercase">
                                  <span className="post-on">05 August</span>
                                  <span className="post-by has-dot">
                                    150 views
                                  </span>
                                </div>
                              </div>
                              <div className="post-thumb post-thumb-80 d-flex ml-15 border-radius-5 img-hover-scale overflow-hidden">
                                <Link href="/#">
                                  <a className="color-white">
                                    <img
                                      src="/assets/imgs/news/thumb-6.jpg"
                                      alt=""
                                    />
                                  </a>
                                </Link>
                              </div>
                            </div>
                          </li>
                          <li className="mb-30 wow fadeInUp animated">
                            <div className="d-flex bg-white has-border p-25 hover-up transition-normal border-radius-5">
                              <div className="post-content media-body">
                                <h6 className="post-title mb-15 text-limit-2-row font-medium">
                                  <Link href="/#">
                                    Relationship Podcasts are Having “That” Talk
                                  </Link>
                                </h6>
                                <div className="entry-meta meta-1 float-left font-x-small text-uppercase">
                                  <span className="post-on">12 August</span>
                                  <span className="post-by has-dot">
                                    6k views
                                  </span>
                                </div>
                              </div>
                              <div className="post-thumb post-thumb-80 d-flex ml-15 border-radius-5 img-hover-scale overflow-hidden">
                                <Link href="/#">
                                  <a className="color-white">
                                    <img
                                      src="/assets/imgs/news/thumb-7.jpg"
                                      alt=""
                                    />
                                  </a>
                                </Link>
                              </div>
                            </div>
                          </li>
                          <li className="mb-30 wow fadeInUp animated">
                            <div className="d-flex bg-white has-border p-25 hover-up transition-normal border-radius-5">
                              <div className="post-content media-body">
                                <h6 className="post-title mb-15 text-limit-2-row font-medium">
                                  <Link href="/#">
                                    Here’s How to Get the Best Sleep at Night
                                  </Link>
                                </h6>
                                <div className="entry-meta meta-1 float-left font-x-small text-uppercase">
                                  <span className="post-on">15 August</span>
                                  <span className="post-by has-dot">
                                    16k views
                                  </span>
                                </div>
                              </div>
                              <div className="post-thumb post-thumb-80 d-flex ml-15 border-radius-5 img-hover-scale overflow-hidden">
                                <Link href="/#">
                                  <a className="color-white">
                                    <img
                                      src="/assets/imgs/news/thumb-2.jpg"
                                      alt=""
                                    />
                                  </a>
                                </Link>
                              </div>
                            </div>
                          </li>
                          <li className=" wow fadeInUp animated">
                            <div className="d-flex bg-white has-border p-25 hover-up transition-normal border-radius-5">
                              <div className="post-content media-body">
                                <h6 className="post-title mb-15 text-limit-2-row font-medium">
                                  <Link href="/#">
                                    America’s Governors Get Tested for a Virus
                                    That Is Testing Them
                                  </Link>
                                </h6>
                                <div className="entry-meta meta-1 float-left font-x-small text-uppercase">
                                  <span className="post-on">12 August</span>
                                  <span className="post-by has-dot">
                                    3k views
                                  </span>
                                </div>
                              </div>
                              <div className="post-thumb post-thumb-80 d-flex ml-15 border-radius-5 img-hover-scale overflow-hidden">
                                <Link href="/#">
                                  <a className="color-white">
                                    <img
                                      src="/assets/imgs/news/thumb-3.jpg"
                                      alt=""
                                    />
                                  </a>
                                </Link>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="sidebar-widget widget_instagram wow fadeInUp animated">
                      <div className="widget-header-1 position-relative mb-30">
                        <h5 className="mt-5 mb-30">Instagram</h5>
                      </div>
                      <div className="instagram-gellay">
                        <ul className="insta-feed">
                          <li>
                            <Link href="/#">
                              <a
                                href="/assets/imgs/thumbnail-3.jpg"
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
                            </Link>
                          </li>
                          <li>
                            <Link href="/#">
                              <a
                                href="/assets/imgs/thumbnail-4.jpg"
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
                            </Link>
                          </li>
                          <li>
                            <Link href="/#">
                              <a
                                href="/assets/imgs/thumbnail-5.jpg"
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
                            </Link>
                          </li>
                          <li>
                            <Link href="/#">
                              <a
                                href="/assets/imgs/thumbnail-3.jpg"
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
                            </Link>
                          </li>
                          <li>
                            <Link href="/#">
                              <a
                                href="/assets/imgs/thumbnail-4.jpg"
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
                            </Link>
                          </li>
                          <li>
                            <Link href="/#">
                              <a
                                href="/assets/imgs/thumbnail-5.jpg"
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
export default PageSearch;
