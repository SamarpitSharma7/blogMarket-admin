import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import Alert from "react-bootstrap/Alert";

const BlogOp = () => {
  const [blogs, setBlogs] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    // Fetch all blogs when the component mounts
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/blogs"
        );

        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const handleDeleteBlog = async (blogId) => {
    try {
      // Delete the blog
      await axios.delete(`http://localhost:5000/api/admin/blogs/${blogId}`);
      setShowAlert(true);

      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
      setTimeout(() => {
        setShowAlert(false);
      }, 4000);
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div>
      <h2 className="my-4">Admin Blogs</h2>
      {showAlert && (
        <Alert variant="success" onClose={() => setShowAlert(false)}>
          Blog deleted successfully!
        </Alert>
      )}
      <Row xs={1} md={2} lg={3} className="g-4">
        {blogs.map((blog) => (
          <Col key={blog._id}>
            <Card className="mx-3 my-2" style={{ width: "18rem" }}>
              {/* <Card.Img variant="top" src={blog.photo} alt={blog.title} /> */}
              <Card.Body>
                <Card.Title>{blog.title}</Card.Title>
                <Card.Text>
                  {blog.desc.length > 30
                    ? `${blog.desc.slice(0, 100)}...`
                    : blog.desc}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteBlog(blog._id)}
                >
                  Delete
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
export default BlogOp;
