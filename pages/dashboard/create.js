import Layout from "../../components/layout/layout";
import dynamic from "next/dynamic";
import { useContext } from "react";
import { authUserContext } from "../../context";

function About() {
  const EditorContainer = dynamic(
    () => import("../../components/editor/EditorContainer"),
    {
      ssr: false,
    }
  );
  const { authUser } = useContext(authUserContext);
  return (
    <>
      <Layout>
        <main
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {authUser?.uid != null ? (
            <div
              style={{
                alignContent: "center",
                justifyContent: "center",
              }}
              className="container single-content"
            >
              {EditorContainer ? (
                <EditorContainer userDetail={authUser} />
              ) : (
                "Loading...."
              )}
            </div>
          ) : (
            <div>{`You Don't Have Access Please login`}</div>
          )}
        </main>
      </Layout>
    </>
  );
}
export default About;
