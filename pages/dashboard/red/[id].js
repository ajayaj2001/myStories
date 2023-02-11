import Layout from "../../../components/layout/layout";
import dynamic from "next/dynamic";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { authUserContext } from "../../../context";
import { fetchBlogById } from "../../../firebaseConfig/operations";

function About() {
  const [singleData, setSingleData] = useState(null);

  const CrudEditor = dynamic(() => import("../../../components/crud"), {
    ssr: false,
  });
  const { authUser } = useContext(authUserContext);

  let Router = useRouter();
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
        {authUser?.uid === singleData?.createdBy ? (
          <CrudEditor blogDetails={singleData} />
        ) : (
          <div>
            You dont have access to edit this blog, Please redirect to home page{" "}
          </div>
        )}
      </Layout>
    </>
  );
}
export default About;
