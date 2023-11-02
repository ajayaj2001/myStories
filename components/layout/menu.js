import Link from "next/link";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
const Menu = ({ authUser, signOutUser }) => {
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
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/search">Search</Link>
                </li>
                <li>
                  <Link href="/about">About Me</Link>
                </li>
                {authUser?.uid ? (
                  <li onClick={async () => await signOutUser()}>
                    <Link href="/auth/login">SignOut</Link>
                  </li>
                ) : (
                  <li>
                    <Link href="/auth/login">Login</Link>
                  </li>
                )}
                {authUser?.uid && (
                  <li>
                    <Link href="/dashboard/create">Create</Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
          <div className="float-right header-tools text-muted font-small">
            <ul className="header-social-network d-inline-block list-inline mr-15">
              <li className="list-inline-item">
                <Link
                  href="/#"
                  className="social-icon fb text-xs-center"
                  target="_blank"
                >
                  <i className="elegant-icon social_facebook"></i>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link
                  href="/#"
                  className="social-icon tw text-xs-center"
                  target="_blank"
                >
                  <i className="elegant-icon social_twitter "></i>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link
                  href="/#"
                  className="social-icon pt text-xs-center"
                  target="_blank"
                >
                  <i className="elegant-icon social_pinterest "></i>
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
