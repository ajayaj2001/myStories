import React, { useState } from "react";
import Bottom from "./bottom";
import Footer from "./footer";
import Header from "./header";
import Sidebar from "./sidebar";
import BackToTop from "../elements/backToTop";
import Head from "next/head";

const Layout = ({ children, authUser, signOutUser }) => {
  const addClass = () => {
    document.body.classList.add("canvas-opened");
  };

  const removeClass = () => {
    document.body.classList.remove("canvas-opened");
  };

  const openSearch = () => {
    document.body.classList.toggle("open-search-form");
  };

  return (
    <>
      <Head>
        <title>My Stories - Personal Blog</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <Sidebar removeClass={removeClass} />
      <Header
        addClass={addClass}
        openSearch={openSearch}
        authUser={authUser}
        signOutUser={signOutUser}
      />

      {children}

      <Bottom />
      <Footer removeClass={removeClass} />
      <BackToTop />
    </>
  );
};

export default Layout;
