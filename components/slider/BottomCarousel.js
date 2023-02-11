import Link from "next/link";
import Slider from "react-slick";
const BottomCarousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoPlay: true,
  };
  return (
    <>
      <Slider {...settings} className="carausel-3-columns">
        <div className="d-flex bg-grey has-border p-25 hover-up-2 transition-normal border-radius-5">
          <div className="post-thumb post-thumb-64 d-flex mr-15 border-radius-5 img-hover-scale overflow-hidden">
            <Link href="/category/travel">
              <a className="color-white">
                <img src="/assets/imgs/news/thumb-1.jpg" alt="" />
              </a>
            </Link>
          </div>
          <div className="post-content media-body">
            <h6>
              {" "}
              <Link href="/category/travel">
                <a>Travel Tips</a>
              </Link>{" "}
            </h6>
            <p className="text-muted font-small">
              Travel is an investment in yourself
            </p>
          </div>
        </div>
        <div className="d-flex bg-grey has-border p-25 hover-up-2 transition-normal border-radius-5">
          <div className="post-thumb post-thumb-64 d-flex mr-15 border-radius-5 img-hover-scale overflow-hidden">
            <Link href="/category/personal">
              <a className="color-white">
                <img src="/assets/imgs/news/thumb-2.jpg" alt="" />
              </a>
            </Link>
          </div>
          <div className="post-content media-body">
            <h6>
              <Link href="/category/personal">
                <a>Personal</a>
              </Link>
            </h6>
            <p className="text-muted font-small">
              {` You define your own life. Don't let other people write your script`}
            </p>
          </div>
        </div>
        <div className="d-flex bg-grey has-border p-25 hover-up-2 transition-normal border-radius-5">
          <div className="post-thumb post-thumb-64 d-flex mr-15 border-radius-5 img-hover-scale overflow-hidden">
            <Link href="/category/food">
              <a className="color-white">
                <img src="/assets/imgs/news/thumb-3.jpg" alt="" />
              </a>
            </Link>
          </div>
          <div className="post-content media-body">
            <h6>
              <Link href="/category/food">
                <a>Foody</a>
              </Link>
            </h6>
            <p className="text-muted font-small">
              Food is symbolic of love when words are inadequate.
            </p>
          </div>
        </div>
      </Slider>
    </>
  );
};

export default BottomCarousel;
