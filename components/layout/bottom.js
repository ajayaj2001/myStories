import BottomCarousel from "../slider/BottomCarousel";
const Bottom = () => {
  return (
    <>
      <div className="site-bottom pt-20 ">
        <div className="container">
          <div className="sidebar-widget widget-latest-posts mb-30 mt-20 wow fadeInUp animated d-none d-lg-block">
            <div className="widget-header-2 position-relative mb-30">
              <h5 className="mt-5 mb-30">Categories</h5>
            </div>
            <BottomCarousel />
          </div>
        </div>
        {/* <!--container--> */}
      </div>
    </>
  );
};

export default Bottom;
