import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { deleteBlog, updateBlogById } from "../../firebaseConfig/operations";

const CrudEditor = ({ blogDetails }) => {
  const router = useRouter();
  const [inputDoc, setInputDoc] = useState({
    title: "",
    coverImage: "",
    category: "",
    readTime: "",
    content: "",
    visibility: "false",
  });
  const [error, setError] = useState("");
  const [enableRead, SetEnableRead] = useState(false);

  const deleteBlogById = async () => {
    if (confirm("are you sure you want to delete this blog")) {
      await deleteBlog(blogDetails.id, blogDetails.contentId)
        .then((res) => {
          if (res == "success") {
            router.push("/");
          } else {
            alert("blog not deleted expected error");
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  const updateBlog = async (e) => {
    if (
      inputDoc.title != "" &&
      inputDoc.category != "" &&
      inputDoc.content != "" &&
      inputDoc.coverImage != "" &&
      inputDoc.readTime != ""
    ) {
      e.preventDefault();

      if (confirm("are you sure you want to update this blog")) {
        await updateBlogById(blogDetails, inputDoc)
          .then((res) => {
            if (res == "success") {
              router.reload();
            } else {
              alert("blog not deleted expected error");
            }
          })
          .catch((err) => {
            alert(err);
          });
      }
    } else {
      setError("empty field not allowed");
    }
  };

  useEffect(() => {
    if (blogDetails?.id) {
      setInputDoc({
        ...blogDetails,
      });
    }
  }, [blogDetails]);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ width: "70%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            //justifyContent: "center",
          }}
        >
          <h1 className="mt-30 mr-4">EDIT Editor</h1>
          {enableRead ? (
            <button
              type="submit"
              className="button button-contactForm mr-4 mt-4"
              onClick={() => SetEnableRead(false)}
            >
              Edit Mode
            </button>
          ) : (
            <button
              type="submit"
              className="button button-contactForm mr-4 mt-4"
              onClick={() => SetEnableRead(true)}
            >
              Read Mode
            </button>
          )}
          <button
            type="submit"
            className="button button-contactForm mt-4"
            onClick={() => deleteBlogById()}
          >
            Delete Blog
          </button>
        </div>
        <hr className="wp-block-separator is-style-wide" />

        <form id="createBlog">
          <div className="form-group">
            <input
              type="text"
              required
              className="form-control"
              name="title"
              disabled={enableRead}
              placeholder="Enter Blog Title"
              value={inputDoc.title}
              onChange={(e) =>
                setInputDoc((s) => ({ ...s, title: e.target.value }))
              }
            />
          </div>
          <div
            style={{ display: "flex", flexDirection: "row" }}
            className="form-group"
          >
            <input
              type="text"
              required
              className="form-control mr-3"
              name="coverImage"
              placeholder="Enter cover image url"
              disabled={enableRead}
              value={inputDoc.coverImage}
              onChange={(e) =>
                setInputDoc((s) => ({ ...s, coverImage: e.target.value }))
              }
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
              }}
            >
              <label className="mr-1">Category :</label>
              <select
                required
                name="category"
                form="createBlog"
                className="form-control"
                style={{ width: "80%" }}
                disabled={enableRead}
                value={inputDoc.category}
                onChange={(e) =>
                  setInputDoc((s) => ({ ...s, category: e.target.value }))
                }
              >
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="opel">Opel</option>
                <option value="audi">Audi</option>
              </select>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
              }}
            >
              <div className="switch-wrapper">
                <div className="label-container">
                  <label className="mr-2">Visibility :</label>
                </div>
                <label className="switch-container">
                  <input
                    hidden
                    type="checkbox"
                    name="visibility"
                    id="with-warrenty"
                    checked={inputDoc.visibility === "true"}
                    onChange={(e) =>
                      setInputDoc((s) => ({
                        ...s,
                        visibility:
                          e.target.checked === true ? "true" : "false",
                      }))
                    }
                  />
                  <div className="switch-bg"></div>
                  <div className="round-box"></div>
                  <div className="switch-left">
                    <span>NO</span>
                  </div>
                  <div className="switch-right">
                    <span>YES</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div
            style={{ display: "flex", flexDirection: "row" }}
            className="mb-3"
          >
            <input
              type="text"
              required
              className="form-control"
              name="readTime"
              placeholder="enter read time in your formate"
              disabled={enableRead}
              value={inputDoc.readTime}
              onChange={(e) =>
                setInputDoc((s) => ({ ...s, readTime: e.target.value }))
              }
            />
          </div>
          {error != "" && (
            <div className="mb-3 ml-2" style={{ color: "red" }}>
              {error}
            </div>
          )}
          <CKEditor
            disabled={enableRead}
            editor={ClassicEditor}
            data={inputDoc?.content || ""}
            onChange={(event, editor) =>
              setInputDoc((e) => ({ ...e, content: editor.getData() }))
            }
          />
          {/* )} */}
          <button
            type="submit"
            className="button button-contactForm mt-4"
            disabled={enableRead}
            onClick={(e) => updateBlog(e)}
          >
            Update Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default CrudEditor;
