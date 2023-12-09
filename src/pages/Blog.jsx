import React, { useEffect, useState } from "react";

const Blog = () => {
  const [blogData, setBlogData] = useState([]);
  useEffect(() => {
    fetch("https://ecofood.vercel.app/QNA")
      .then((req) => req.json())
      .then((res) => setBlogData(res));
  }, []);
  return (
    <div>
      <h1 className="text-5xl text-center font-semibold my-5 ga"> Blog</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 p-5 rounded-lg shadow-inner gap-5 shadow-slate-400">
        {blogData.map((oneBlog) => (
          <div
            key={oneBlog?._id}
            className="p-5 rounded-lg shadow-inner shadow-slate-400">
            <h1 className="text-2xl font-medium">{oneBlog?.qustion}</h1>
            <p className="text-lg mt-5">{oneBlog?.ansower}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
