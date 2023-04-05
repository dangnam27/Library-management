import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Dashboard = () => {
  const navigate = useNavigate();
  const booksList = useSelector((state) => state.books);
  const usersList = useSelector((state) => state.users);
  const adminList = usersList.filter((e) => e.role === "admin").length;
  const libraryList = usersList.filter((e) => e.role === "library").length;
  const studentList = usersList.filter((e) => e.role === "student").length;
  const borrowandreturnList = useSelector((state) => state.borrowandreturn);
  const returnedList = borrowandreturnList.filter(
    (e) => e.dayReturned !== ""
  ).length;

  const top6RecentUsers = [];
  usersList.slice(-6).map((e) => {
    top6RecentUsers.unshift(e);
  });
  //last 5 books add
  const recentBooks = [];
  for (let i = booksList.length - 1; i > booksList.length - 6; i--) {
    recentBooks.push(booksList[i]);
  }

  //last 5 books borrow
  const last5Books = [];
  for (
    let i = borrowandreturnList.length - 1;
    i > borrowandreturnList.length - 6;
    i--
  ) {
    last5Books.push(borrowandreturnList[i]);
  }
  //Top 3 books borrow
  const totalEachBook = [];
  borrowandreturnList.forEach((item) => {
    const index = totalEachBook.findIndex((e) => e.bookID === item.bookID);
    if (index === -1) {
      totalEachBook.push({
        bookID: item.bookID,
        total: parseInt(item.amount),
        title: item.title,
      });
    } else {
      const newTotal =
        parseInt(item.amount) + parseInt(totalEachBook[index].total);
      totalEachBook[index] = {
        bookID: item.bookID,
        total: newTotal,
        title: item.title,
      };
    }
  });
  const max1 = { bookID: "", total: 0, title: "" };
  const max2 = { bookID: "", total: 0, title: "" };
  const max3 = { bookID: "", total: 0, title: "" };
  totalEachBook.forEach((item) => {
    if (item.total > max1.total) {
      max1.total = item.total;
      max1.bookID = item.bookID;
      max1.title = item.title;
    }
  });
  totalEachBook.forEach((item) => {
    if (item.total > max2.total && item.total < max1.total) {
      max2.total = item.total;
      max2.bookID = item.bookID;
      max2.title = item.title;
    }
  });
  totalEachBook.forEach((item) => {
    if (item.total > max3.total && item.total < max2.total) {
      max3.total = item.total;
      max3.bookID = item.bookID;
      max3.title = item.title;
    }
  });

  if (
    usersList.length > 0 &&
    booksList.length > 0 &&
    top6RecentUsers.length > 0 &&
    recentBooks.length > 0 &&
    last5Books.length > 0 &&
    totalEachBook.length > 0
  ) {
    return (
      <div className="container ">
        {/* Statistic */}
        <div className="row gap-3 gap-md-0">
          <div className="col-12 col-md-6 col-lg-3 p-md-3 ">
            <div className="bg-info rounded p-0">
              <div className="d-flex gap-5 justify-content-between align-items-center  p-3">
                <div className=" text-white">
                  <h1>{usersList.length}</h1>
                  <span>Users</span>
                </div>
                <div className="icon text-white">
                  <i className="bi bi-people  "></i>
                </div>
              </div>
              <div
                className="text-center text-white  p-1 get-info"
                onClick={() => {
                  navigate("/home/users");
                }}>
                <span>More info</span>
                <i className="bi bi-arrow-right-circle ps-2"></i>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3 p-md-3 ">
            <div className="bg-success rounded p-0">
              <div className="d-flex gap-5 justify-content-between align-items-center  p-3">
                <div className=" text-white">
                  <h1>{booksList.length}</h1>
                  <span>Books</span>
                </div>
                <div className="icon text-white">
                  <i className="bi bi-journals"></i>
                </div>
              </div>
              <div
                className="text-center text-white  p-1 get-info"
                onClick={() => {
                  navigate("/home/products");
                }}>
                <span>More info</span>
                <i className="bi bi-arrow-right-circle ps-2"></i>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3 p-md-3">
            <div className="bg-warning rounded p-0">
              <div className="d-flex gap-5 justify-content-between align-items-center  p-3">
                <div className=" text-white">
                  <h1>{borrowandreturnList.length}</h1>
                  <span>Borrows</span>
                </div>
                <div className="icon text-white">
                  <i className="bi bi-clipboard-minus"></i>
                </div>
              </div>
              <div
                className="text-center text-white  p-1 get-info"
                onClick={() => {
                  navigate("/home/borrowreturn");
                }}>
                <span>More info</span>
                <i className="bi bi-arrow-right-circle ps-2"></i>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3  p-md-3">
            <div className="bg-danger rounded p-0">
              <div className="d-flex gap-5 justify-content-between align-items-center  p-3">
                <div className=" text-white">
                  <h1>{returnedList}</h1>
                  <span>Returned</span>
                </div>
                <div className="icon text-white">
                  <i className="bi bi-clipboard-check"></i>
                </div>
              </div>
              <div
                className="text-center text-white  p-1 get-info"
                onClick={() => {
                  navigate("/home/borrowreturn");
                }}>
                <span>More info</span>
                <i className="bi bi-arrow-right-circle ps-2"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-5 ">
          <div className="col-12 col-lg-4 ">
            {/* Last member */}
            <div className="border shadow p-2 rounded  my-3">
              <div className="d-flex justify-content-between gap-2">
                <span className="p-2 bg-danger d-inline-block rounded fw-bold text-white ">
                  Lastest Members
                </span>
                <button
                  className="btn btn-outline-danger shadow-sm"
                  onClick={() => {
                    navigate("/home/adduser");
                  }}>
                  Create New User
                </button>
              </div>
              <div className="row mt-2">
                <div className="col-4 text-center my-3">
                  <img
                    src={top6RecentUsers[0].avatar}
                    alt=""
                    className="rounded-circle w-50"
                  />
                  <p className="text-capitalize">{top6RecentUsers[0].name}</p>
                </div>
                <div className="col-4 text-center my-3">
                  <img
                    src={top6RecentUsers[1].avatar}
                    alt=""
                    className="rounded-circle w-50"
                  />
                  <p className="text-capitalize">{top6RecentUsers[1].name}</p>
                </div>
                <div className="col-4 text-center my-3">
                  <img
                    src={top6RecentUsers[2].avatar}
                    alt=""
                    className="rounded-circle w-50"
                  />
                  <p className="text-capitalize">{top6RecentUsers[2].name}</p>
                </div>

                <div className="col-4 text-center my-3">
                  <img
                    src={top6RecentUsers[3].avatar}
                    alt=""
                    className="rounded-circle w-50"
                  />
                  <p className="text-capitalize">{top6RecentUsers[3].name}</p>
                </div>
                <div className="col-4 text-center my-3">
                  <img
                    src={top6RecentUsers[4].avatar}
                    alt=""
                    className="rounded-circle w-50"
                  />
                  <p className="text-capitalize">{top6RecentUsers[4].name}</p>
                </div>
                <div className="col-4 text-center my-3">
                  <img
                    src={top6RecentUsers[5].avatar}
                    alt=""
                    className="rounded-circle w-50"
                  />
                  <p className="text-capitalize">{top6RecentUsers[5].name}</p>
                </div>
              </div>
            </div>

            {/* Top 3 books borrow */}
            <div className="border shadow p-2 rounded  my-3">
              <div className="d-flex justify-content-between gap-2">
                <span className="p-2 bg-success d-inline-block rounded fw-bold text-white">
                  Most Borrowed Books
                </span>
                <button
                  className="btn btn-outline-success shadow-sm"
                  onClick={() => {
                    navigate("/home/borrowreturn");
                  }}>
                  Place New Order
                </button>
              </div>
              <div>
                <table className="table mt-2">
                  <thead>
                    <tr>
                      <th>BookID</th>
                      <th>Title</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{max1.bookID}</td>
                      <td>{max1.title}</td>
                      <td>{max1.total}</td>
                    </tr>
                    <tr>
                      <td>{max2.bookID}</td>
                      <td>{max2.title}</td>
                      <td>{max2.total}</td>
                    </tr>
                    <tr>
                      <td>{max3.bookID}</td>
                      <td>{max3.title}</td>
                      <td>{max3.total}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-8">
            {/* Last books borrow */}
            <div className="border shadow p-2 rounded  my-3">
              <div>
                <span className="p-2 bg-danger d-inline-block rounded fw-bold text-white">
                  Last Books Borrow
                </span>
              </div>
              <div className="table-responsive">
                <table className="table mt-1">
                  <thead>
                    <tr className="h-100">
                      <th>OrderID</th>
                      <th>Student Name</th>
                      <th>Title</th>
                      <th>Amount</th>
                      <th>Time Borrow</th>
                    </tr>
                  </thead>
                  <tbody>
                    {last5Books.map((item, index) => (
                      <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.title}</td>
                        <td>{item.amount}</td>
                        <td>{item.dayBorrow.slice(4, 24)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div></div>
            </div>

            {/* Last 5 books added */}
            <div className="border shadow p-2 rounded  my-3">
              <div className="d-flex justify-content-between gap-2">
                <span className="p-2 bg-success d-inline-block rounded fw-bold text-white">
                  Recently Added Books
                </span>
                <button
                  className="btn btn-outline-success shadow-sm"
                  onClick={() => {
                    navigate("/home/addproduct");
                  }}>
                  Add New Book
                </button>
              </div>
              <div className="table-responsive">
                <table className="table mt-2 ">
                  <thead>
                    <tr>
                      <th>BookID</th>
                      <th>Title</th>
                      <th>Amount</th>
                      <th>Author</th>
                      <th>Publisher</th>
                      <th>Category</th>
                    </tr>
                  </thead>

                  <tbody>
                    {recentBooks.map((item, index) => (
                      <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.title}</td>
                        <td>{item.amount}</td>
                        <td>{item.author}</td>
                        <td>{item.publisher}</td>
                        <td className="text-capitalize">{item.category}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else return;
};

export default Dashboard;
