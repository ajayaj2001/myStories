import { async } from "@firebase/util";
import {
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
  updateDoc,
  setDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from ".";

export const createUserInDb = async (userDetail, id) => {
  return await setDoc(doc(db, "user", id), {
    ...userDetail,
    id,
    createdOn: serverTimestamp(),
    blogList: [],
  }).then(() => "success");
};

export const fetchBlogTags = async () => {
  return await getDoc(doc(db, "category", "blogTags"))
    .then((blog) => {
      return blog.data().tags;
    })
    .catch((err) => console.log(err));
};

export const createBlog = async (e, content, userDetail) => {
  var value = e.target;

  let contentId = await addDoc(collection(db, "blogContents"), {
    content,
  })
    .then(async (e) => {
      return e.id;
    })
    .catch((err) => console.log(err));
  console.log("testing", value);

  await addDoc(collection(db, "blogs"), {
    title: value.title.value,
    coverImage: value.coverImage.value,
    readTime: value.readTime.value,
    contentId: contentId,
    createdBy: userDetail.uid,
    views: 0,
    likes: 0,
    visibility: value.visibility.value,
    subscribers: value.subscribers.value,
    category: value.category.value,
    createdOn: serverTimestamp(),
  }).catch((err) => console.log(err));
};

const fetchBlogContent = async (id) => {
  return await getDoc(doc(db, "blogContents", id))
    .then((blog) => {
      return blog.data().content;
    })
    .catch((err) => console.log(err));
};

export const fetchUserById = async (id) => {
  return await getDoc(doc(db, "user", id))
    .then((blog) => {
      return blog.data();
    })
    .catch((err) => console.log(err));
};

export const fetchUserByIdAndBlog = async (id) => {
  let user = {};

  await getDoc(doc(db, "user", id))
    .then(async (blog) => {
      user = blog.data();
      if (user?.id) {
        let blogDetails = [];
        for (let blog of user.blogList) {
          await getDoc(doc(db, "blogs", blog)).then((data) => {
            blogDetails.push({ ...data.data(), id: data.id });
          });
        }
        user.blogList = blogDetails;
      }
    })
    .catch((err) => console.log(err));

  return user;
};

export const fetchBlogById = async (id) => {
  return await getDoc(doc(db, "blogs", id)).then(async (data) => {
    if (data.data()) {
      let result = data.data();
      let content = await fetchBlogContent(result.contentId);
      let userDetails = await fetchUserById(result.createdBy);
      return {
        ...result,
        content,
        id: data.id,
        userDetails,
      };
    }
  });
};

export const getBlogsByFilter = async (searchKey, tags) => {
  let allBlogs = [];
  await getDocs(collection(db, "blogs"))
    .then((values) => {
      values.forEach((value) => {
        if (value.data().visibility === "true")
          allBlogs.push({ ...value.data(), id: value.id });
      });
    })
    .catch((err) => console.log(err));

  let filteredBlogs = [];

  if (allBlogs.length > 0 && searchKey.length > 0) {
    filteredBlogs = allBlogs
      .filter((blog) =>
        blog.title.toLowerCase().includes(searchKey?.toLowerCase())
      )
      .sort((x, y) =>
        new Date(x.createdOn * 1000) < new Date(y.createdOn * 1000) ? 1 : -1
      );
  } else {
    filteredBlogs = allBlogs.sort((x, y) =>
      new Date(x.createdOn * 1000) < new Date(y.createdOn * 1000) ? 1 : -1
    );
  }

  if (tags.length > 0) {
    return filteredBlogs.filter((blog) =>
      blog.category.some((r) => tags.includes(r))
    );
  } else {
    return filteredBlogs;
  }
};

export const deleteBlog = async (id, contentId) => {
  return await deleteDoc(doc(db, "blogContents", contentId))
    .then(async (values) => {
      return await deleteDoc(doc(db, "blogs", id))
        .then(() => "success")
        .catch((e) => console.log(e));
    })
    .catch((err) => console.log(err));
};

export const updateBlogById = async (oldBlog, newBlog) => {
  return await updateDoc(doc(db, "blogContents", oldBlog.contentId), {
    content: newBlog.content,
  })
    .then(async () => {
      return await updateDoc(doc(db, "blogs", oldBlog.id), {
        title: newBlog.title,
        coverImage: newBlog.coverImage,
        readTime: newBlog.readTime,
        category: newBlog.category,
        visibility: newBlog.visibility,
      })
        .then(() => "success")
        .catch((e) => console.log(e));
    })
    .catch((err) => console.log(err));
};
