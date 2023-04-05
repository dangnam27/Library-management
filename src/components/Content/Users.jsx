import React from "react";
import "./Users.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getAction } from "../redux/actions";
import { useNavigate } from "react-router-dom";
import Toast from "react-bootstrap/Toast";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
const Users = () => {
  const [confirm, setConfirm] = useState(false);
  const [show, setShow] = useState(false);
  const [showSameID, setShowSameID] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const loginedUser = useSelector((state) => state.loginedUser);
  const [listUsers, setListUsers] = useState([...users]);
  const [findItem, setFindItem] = useState("");
  const [idActive, setIdActive] = useState(1);
  const [typeFilter, setTypeFilter] = useState("name");
  const [pageNumbers, setPageNumbers] = useState([]);
  const [itemDelete, setItemDelete] = useState({});
  const getPageNumbers = (list) => {
    const pages = [];
    for (let i = 1; i <= Math.ceil(list.length / 10); i++) {
      pages.push(i);
    }
    setPageNumbers([...pages]);
  };
  useEffect(() => {
    getPageNumbers(listUsers);
  }, []);

  const [usersPerPage, setUsersPerPage] = useState([...listUsers.slice(0, 10)]);

  //Jump pageNumbers
  const handleJumpPage = (index) => {
    const firstIndex = index * 10 - 10;
    const lastIndex = index * 10;
    const newList = listUsers.slice(firstIndex, lastIndex);
    setUsersPerPage(newList);
    setIdActive(index);
  };

  //Filter user
  const handleFilter = (e) => {
    setFindItem(e.target.value);
    const convertValue = e.target.value.trim().toLowerCase();
    const listFilter = users.filter((item) =>
      item[typeFilter].toString().trim().toLowerCase().includes(convertValue)
    );
    setListUsers([...listFilter]);
    getPageNumbers(listFilter);
    setIdActive(1);
    const newList = listFilter.slice(0, 10);
    setUsersPerPage(newList);
  };

  //Add user
  const handleAddUser = () => {
    navigate("/home/adduser");
  };

  //Edit user
  const handleEditUser = (e) => {
    navigate("/home/userdetail", { state: e });
  };
  const handleClickOpen = (e) => {
    setConfirm(true);
    setItemDelete(e);
  };
  //Delete user and update state
  const handleDelete = (e) => {
    setConfirm(false);

    if (e.id === loginedUser[0].id) {
      setShowSameID(true);
    } else if (e.target.value === "confirm") {
      axios
        .delete(
          `https://637edb84cfdbfd9a63b87c1c.mockapi.io/users/${itemDelete.id}`
        )
        .then((res) => {
          const newList = users.filter((e) => e.id !== res.data.id);
          dispatch(getAction("FECTH_USER_SUCCESS", newList));
          setListUsers([...newList]);
          getPageNumbers(newList);
          setIdActive(1);
          setUsersPerPage(newList.slice(0, 10));
        })
        .then((res2) => {
          setShow(true);
          setFindItem("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //Trigger Toast popup

  return (
    <div>
      {/* Show popup same ID */}
      <Toast
        onClose={() => setShowSameID(false)}
        show={showSameID}
        delay={3000}
        autohide
        className="toast-popup bg-danger text-white">
        <Toast.Header className="bg-danger text-white">
          <i className="bi bi-check-circle-fill fw-bold"></i>
          <strong className="ms-3 me-auto fw-bold">Error!</strong>
        </Toast.Header>
        <Toast.Body>You cant delete your account loging</Toast.Body>
      </Toast>
      {/* Show popup delete */}
      <Toast
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
        className="toast-popup bg-success text-white">
        <Toast.Header className="bg-success text-white">
          <i className="bi bi-check-circle-fill fw-bold"></i>
          <strong className="ms-3 me-auto fw-bold">Success</strong>
        </Toast.Header>
        <Toast.Body>User has been delete!</Toast.Body>
      </Toast>

      {/* Add user */}
      <div className="d-flex flex-column flex-sm-row justify-content-between gap-2 align-items-sm-center  my-4">
        <h3 className="d-none d-sm-block">Users</h3>

        {/* Filter users */}
        <div className="d-flex gap-2 w-sm-75 w-100">
          <Dropdown
            onSelect={(e) => {
              setTypeFilter(e);
            }}>
            <Dropdown.Toggle
              variant="warning"
              id="dropdown-basic"
              className="text-capitalize">
              Filter {typeFilter}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                eventKey="name"
                className={typeFilter === "name" ? "active" : ""}>
                Name
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="role"
                className={typeFilter === "role" ? "active" : ""}>
                Role
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="username"
                className={typeFilter === "username" ? "active" : ""}>
                Username
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="schoolCode"
                className={typeFilter === "schoolCode" ? "active" : ""}>
                School Code
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="studentCode"
                className={typeFilter === "studentCode" ? "active" : ""}>
                Student Code
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <input
            type="text"
            value={findItem}
            placeholder="Search..."
            className="form-control "
            onChange={handleFilter}
          />
        </div>

        {loginedUser[0].role === "admin" ? (
          <button
            className="btn btn-primary fw-bold shadow text-nowrap"
            onClick={handleAddUser}>
            + New User
          </button>
        ) : (
          ""
        )}
      </div>

      {/* Show users */}
      <div className="table-responsive-md">
        <table className="table table-hover w-100">
          <thead className="bg-secondary text-light">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Birthday</th>
              <th>Email</th>
              <th>Role</th>
              <th>School Code</th>
              <th>Student Code</th>
              <th>{loginedUser[0].role === "admin" ? "Action" : ""}</th>
            </tr>
          </thead>
          <tbody>
            {usersPerPage.map((e, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <img
                      src={e.avatar}
                      alt=""
                      className="rounded-circle avatar"
                    />
                    <p className="m-0 text-capitalize">{e.name}</p>
                  </div>
                </td>
                <td className="text-capitalize">{e.birthday}</td>
                <td className="text-capitalize">{e.email}</td>
                <td className="text-capitalize">{e.role}</td>
                <td className="text-capitalize">{e.schoolCode}</td>
                <td className="text-capitalize">{e.studentCode}</td>
                <td>
                  {loginedUser[0].role === "admin" ? (
                    <div className="d-flex flex-column flex-lg-row gap-2 gap-lg-0 h-100">
                      <button
                        className="btn btn-warning me-3"
                        onClick={() => handleEditUser(e)}>
                        Edit
                      </button>
                      <button
                        className="btn btn-danger "
                        onClick={() => {
                          handleClickOpen(e);
                        }}>
                        Delete
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            ))}
            {/* Pagination - phân trang */}
            <tr>
              <td colSpan={10} className="py-3">
                <div className="pagination d-flex justify-content-end">
                  <ul className="pagination">
                    {pageNumbers.map((i) => (
                      <li
                        className={`page-item page-link ${
                          idActive === i ? "active" : ""
                        }`}
                        key={i}
                        onClick={() => {
                          handleJumpPage(i);
                        }}>
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Show dialog confirm when click button Delete */}
      <Dialog
        open={confirm}
        onClose={handleDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete?"}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleDelete} value="cancel">
            Disagree
          </Button>
          <Button onClick={handleDelete} autoFocus value="confirm">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default Users;
