import Link from "next/link";
import Menu from "./menu";

const Header = ({ addClass, openSearch, authUser, signOutUser }) => {
  return (
    <>
      <header className="main-header header-style-1 font-heading">
        <div className="header-top">
          <div className="container">
            <div className="row pt-15 pb-10">
              <div className="col-md-3 col-xs-6">
                <Link href="/">
                  <img
                    className="logo"
                    src="/assets/imgs/theme/logo.png"
                    alt=""
                    width={140}
                    height={60}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Menu
          addClass={addClass}
          authUser={authUser}
          signOutUser={signOutUser}
        />
      </header>
    </>
  );
};

export default Header;
