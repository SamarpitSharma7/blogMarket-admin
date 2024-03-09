import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [blogRes, cmtRes, userRes] = await Promise.all([
          axios.get("https://blogmarket-backend.onrender.com/api/admin/blogs"),
          axios.get("https://blogmarket-backend.onrender.com/api/comments/all"),
          axios.get("https://blogmarket-backend.onrender.com/api/users"),
        ]);

        setBlogs(blogRes.data);
        // console.log(blogRes.data);
        setComments(cmtRes.data);
        // console.log(cmtRes.data);
        setUsers(userRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAll();
  }, []);

  return (
    <>
      <h1>home page</h1>
      <h1>Total blogs: {blogs.length}</h1>
      <h1>Total users: {users.length}</h1>
      <h1>Total comments: {comments.length}</h1>
    </>
  );
};
export default Home;
