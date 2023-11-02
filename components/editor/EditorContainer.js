import React, { useState, useEffect } from "react";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { createBlog, fetchBlogTags } from "../../firebaseConfig/operations";
import { MultiSelect } from "react-multi-select-component";

const EditorContainer = ({ userDetail }) => {
  const [inputDoc, setInputDoc] = useState("");
  const [error, setError] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [subscribers, setSubscribers] = useState(false);
  const [category, setCategory] = useState([]);
  const [tagSelected, setTagSelected] = useState([]);
  const updateCategoryList = () => {
    fetchBlogTags().then((tags) => {
      if (tags.length > 0) return setCategory(tags);
    });
  };

  useEffect(() => {
    updateCategoryList();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (inputDoc == "") {
      setError("Need Blog Content To Upload");
    } else if (tagSelected.length <= 0) {
      setError("At least select one category");
    } else {
      setError("");
      e.target.visibility.value = visibility;
      e.target.subscribers.value = subscribers;
      e.target.category = { value: tagSelected.map((tag) => tag.value) };
      console.log(e, "category");
      createBlog(e, inputDoc, userDetail).then(() => {
        alert("success");
        e.target.reset();
        setInputDoc("");
      });
    }
  };

  return (
    <div>
      <h1 className="mt-30">Blog Editor</h1>
      <hr className="wp-block-separator is-style-wide" />
      {error != "" && (
        <div className="mb-3 ml-2" style={{ color: "red" }}>
          {error}
        </div>
      )}
      <form onSubmit={onSubmit} id="createBlog">
        <div className="form-group">
          <input
            type="text"
            required
            className="form-control"
            name="title"
            placeholder="Enter Blog Title"
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
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "130%",
              alignItems: "center",
            }}
          >
            <label className="mr-2">Category :</label>
            <MultiSelect
              hasSelectAll={false}
              shouldToggleOnHover={true}
              className="multi-select"
              valueRenderer={(selected) =>
                selected?.map((val) => (
                  <button style={{ marginRight: ".5rem" }} key={val.value}>
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
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "80%",
              alignItems: "center",
            }}
          >
            <div className="switch-wrapper">
              <div className="label-container">
                <label className="">Visibility :</label>
              </div>
              <label className="switch-container">
                <input
                  hidden
                  type="checkbox"
                  name="visibility"
                  id="with-warrenty"
                  checked={visibility}
                  onChange={(e) => setVisibility(e.target.checked)}
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
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "80%",
              alignItems: "center",
            }}
          >
            <div className="switch-wrapper">
              <div className="label-container">
                <label className="">Subscribers only :</label>
              </div>
              <label className="switch-container">
                <input
                  hidden
                  type="checkbox"
                  name="subscribers"
                  id="with-warrenty"
                  checked={subscribers}
                  onChange={(e) => setSubscribers(e.target.checked)}
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
        <div style={{ display: "flex", flexDirection: "row" }} className="mb-3">
          <input
            type="text"
            required
            className="form-control"
            name="readTime"
            placeholder="enter read time in your formate"
          />
        </div>
        <CKEditor
          editor={ClassicEditor}
          data={inputDoc}
          onChange={(event, editor) => setInputDoc(editor.getData())}
        />
        <button type="submit" className="button button-contactForm mt-4">
          Upload Blog
        </button>
      </form>
    </div>
  );
};

export default EditorContainer;
