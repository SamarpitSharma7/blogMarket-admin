import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import Alert from "react-bootstrap/Alert";

const UserOp = () => {
  const [users, setUsers] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    // Fetch data using Axios and update the state
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users");
        setUsers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`);
      setShowAlert(true);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      setTimeout(() => {
        setShowAlert(false);
      }, 4000);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <Container>
      <h2 className="fw-bold my-3">User's Table</h2>
      {showAlert && (
        <Alert variant="success" onClose={() => setShowAlert(false)}>
          User deleted successfully!
        </Alert>
      )}
      <Table className="text-center table-dark" striped bordered hover>
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <MdDeleteForever
                  color="red"
                  onClick={() => handleDeleteUser(user._id)}
                  style={{ cursor: "pointer" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default UserOp;
