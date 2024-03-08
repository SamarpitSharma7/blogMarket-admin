import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import Alert from "react-bootstrap/Alert";

const CommentOp = () => {
  const [comments, setComments] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    // Fetch data using Axios and update the state
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/comments/all"
        );
        setComments(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteComment = async (cmtid) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/comments/${cmtid}`);
      setShowAlert(true);
      setComments((prevComments) =>
        prevComments.filter((cmt) => cmt._id !== cmtid)
      );
      setTimeout(() => {
        setShowAlert(false);
      }, 4000);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <>
      <Container>
        <h2 className="text-center">Comments Management</h2>

        {showAlert && (
          <Alert variant="success" onClose={() => setShowAlert(false)}>
            Comment deleted successfully!
          </Alert>
        )}
        <Table className="text-center table-dark" striped bordered hover>
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>Comment</th>
              <th>Author</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((cmt, index) => (
              <tr key={cmt._id}>
                <td>{index + 1}</td>
                <td>{cmt.comment}</td>
                <td>{cmt.author}</td>
                <td>
                  <MdDeleteForever
                    color="red"
                    onClick={() => handleDeleteComment(cmt._id)}
                    style={{ cursor: "pointer" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};
export default CommentOp;
