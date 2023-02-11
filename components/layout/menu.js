import Link from "next/link";
import { useEffect, useLayoutEffect, useState } from "react";

const Menu = () => {
  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    document.addEventListener("scroll", () => {
      const scrollCheck = window.scrollY > 100;
      if (scrollCheck !== scroll) {
        setScroll(scrollCheck);
      }
    });
  });

  return (
    <>
      <div className={scroll ? "header-sticky sticky-bar" : "header-sticky"}>
        <div className="container align-self-center position-relative ">
          <div className="main-nav float-left ">
            <nav>
              <ul className="main-menu d-none d-lg-inline font-small">
                <li>
                  <Link href="/category/travel">
                    <a>Home</a>
                  </Link>
                </li>

                <li>
                  <Link href="/search">
                    <a>Search</a>
                  </Link>
                </li>

                <li>
                  <Link href="/category/Nature">
                    <a>Category</a>
                  </Link>
                </li>
                <li>
                  <Link href="/about">
                    <a>About Me</a>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="float-right header-tools text-muted font-small">
            <ul className="header-social-network d-inline-block list-inline mr-15">
              <li className="list-inline-item">
                <Link href="/#">
                  <a
                    className="social-icon fb text-xs-center"
                    target="_blank"
                    href="#"
                  >
                    <i className="elegant-icon social_facebook"></i>
                  </a>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link href="/#">
                  <a
                    className="social-icon tw text-xs-center"
                    target="_blank"
                    href="#"
                  >
                    <i className="elegant-icon social_twitter "></i>
                  </a>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link href="/#">
                  <a
                    className="social-icon pt text-xs-center"
                    target="_blank"
                    href="#"
                  >
                    <i className="elegant-icon social_pinterest "></i>
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="clearfix"></div>
        </div>
      </div>
    </>
  );
};

export default Menu;
