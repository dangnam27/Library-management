import React, { useState } from "react";
import { getAction } from "../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import "./AddProduct.css";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Toast from "react-bootstrap/Toast";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
const AddProduct = () => {
  const [confirm, setConfirm] = useState(false);
  const [show, setShow] = useState(false);
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    category: "",
    title: "",
    ISBN: "",
    amount: "",
    author: "",
    note: "",
    publisher: "",
    update_on: "",
  });

  const formSchema = yup.object().shape({
    category: yup.string().required(),
    title: yup.string().required(),
    ISBN: yup
      .string()
      .matches(
        /^(?:ISBN(?:-13)?:?\ )?(?=[0-9]{13}$|(?=(?:[0-9]+[-\ ]){4})[-\ 0-9]{17}$)97[89][-\ ]?[0-9]{1,5}[-\ ]?[0-9]+[-\ ]?[0-9]+[-\ ]?[0-9]$/
      )
      .required(),
    amount: yup
      .number("Amount must be numberic ")
      .min(1, "Amount must be more than zero")
      .required(),
    author: yup.string().required(),
    publisher: yup.string().required(),
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getDate = () => {
    const updateTime = new Date();
    const date = updateTime.getDate();
    const month = updateTime.getMonth();
    const year = updateTime.getFullYear();
    form.update_on = date + "-" + month + "-" + year;
    setForm({ ...form });
  };
  const handleClose = (e) => {
    getDate();
    setConfirm(false);

    if (e.target.value === "agree") {
      axios
        .get(`https://637edb84cfdbfd9a63b87c1c.mockapi.io/books`)
        .then((res) => {
          const found = res.data.findIndex(
            (e) => Number(e.ISBN) === Number(form.ISBN)
          );
          if (found === -1) {
            setShow(true);
            setTimeout(() => {
              axios
                .post(`https://637edb84cfdbfd9a63b87c1c.mockapi.io/books`, form)
                .then((res1) => {
                  axios
                    .get(`https://637edb84cfdbfd9a63b87c1c.mockapi.io/books`)
                    .then((res2) => {
                      dispatch(getAction("FECTH_BOOKS_SUCCESS", res2.data));
                    })
                    .then((res3) => {
                      navigate("/home/products");
                    })
                    .catch((err3) => console.log(err3));
                })
                .catch((err1) => console.log(err1));
            }, 1000);
          } else {
            setShowError(true);
          }
        });
    }
  };

  const handleSubmit = () => {
    setConfirm(true);
  };

  return (
    <div className="container mb-5">
      {/* Show popup ISBN existed */}
      <Toast
        onClose={() => setShowError(false)}
        show={showError}
        delay={3000}
        autohide
        className="toast-popup bg-danger text-white">
        <Toast.Header className="bg-danger text-white">
          <i className="bi bi-bug-fill fw-bold"></i>
          <strong className="ms-3 me-auto fw-bold">Error</strong>
        </Toast.Header>
        <Toast.Body>ISBN has existed</Toast.Body>
      </Toast>
      {/* Show popup add success */}
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
        <Toast.Body>Book has been add success!</Toast.Body>
      </Toast>
      <h3 className="my-4 py-2 text-center text-success fw-bold bg-warning rounded">
        ADD BOOK
      </h3>

      {/* Create user */}
      <Formik
        initialValues={form}
        enableReinitialize={true}
        validationSchema={formSchema}
        onSubmit={handleSubmit}>
        <Form className="">
          <div className="form-floating ">
            <label
              htmlFor="category"
              className="select-label text-success text-opacity-75 ">
              Category
            </label>
            <Field
              id="category"
              as="select"
              name="category"
              onChange={(e) => handleChange(e)}
              className="form-select w-auto mb-3">
              <option value="default" hidden>
                -- Choose --
              </option>
              <option value="arts">Arts</option>
              <option value="biographies">Biographies</option>
              <option value="business">Business</option>
              <option value="technology">Technology</option>
              <option value="history">History</option>
              <option value="novel">Novel</option>
              <option value="other">Other</option>
            </Field>
          </div>
          <ErrorMessage
            component="div"
            name="category"
            className="text-capitalize fw-bold text-danger mt-3"></ErrorMessage>
          <br />
          <div className="form-floating mb-3 ">
            <Field
              id="title"
              className="form-control"
              placeholder="Title"
              name="title"
              value={form.title}
              onChange={(e) => handleChange(e)}></Field>
            <label htmlFor="title" className="text-success">
              Title book
            </label>
          </div>
          <ErrorMessage
            component="div"
            name="title"
            className="text-capitalize fw-bold text-danger mt-3"></ErrorMessage>
          <br />

          <div className="d-sm-flex gap-3">
            <div>
              <div className="form-floating mb-3">
                <Field
                  id="ISBN"
                  className="form-control "
                  placeholder="ISBN"
                  name="ISBN"
                  value={form.ISBN}
                  onChange={(e) => handleChange(e)}></Field>
                <label htmlFor="ISBN" className="text-success">
                  ISBN
                </label>
              </div>
              <ErrorMessage
                component="div"
                name="ISBN"
                className="text-capitalize fw-bold text-danger mt-3"></ErrorMessage>
              <br />
            </div>
            <div>
              <div className="form-floating mb-3">
                <Field
                  id="amount"
                  className="form-control "
                  placeholder="Amount"
                  name="amount"
                  value={form.amount}
                  onChange={(e) => handleChange(e)}></Field>
                <label htmlFor="amount" className="text-success">
                  Amount
                </label>
              </div>
              <ErrorMessage
                component="div"
                name="amount"
                className="text-capitalize fw-bold text-danger mt-3"></ErrorMessage>
              <br />
            </div>
          </div>

          <div className="d-sm-flex gap-3">
            <div className="">
              <div className="form-floating mb-3">
                <Field
                  id="author"
                  className="form-control "
                  placeholder="Author"
                  name="author"
                  value={form.author}
                  onChange={(e) => handleChange(e)}></Field>
                <label htmlFor="author" className="text-success">
                  Author
                </label>
              </div>
              <ErrorMessage
                component="div"
                name="author"
                className="text-capitalize fw-bold text-danger mt-3"></ErrorMessage>
              <br />
            </div>
            <div className="">
              <div className="form-floating mb-3">
                <Field
                  id="publisher"
                  className="form-control"
                  placeholder="Publisher"
                  name="publisher"
                  value={form.publisher}
                  onChange={(e) => handleChange(e)}></Field>
                <label htmlFor="publisher" className="text-success">
                  Publisher
                </label>
              </div>
              <ErrorMessage
                component="div"
                name="publisher"
                className="text-capitalize fw-bold text-danger mt-3"></ErrorMessage>
              <br />
            </div>
          </div>

          <div className="form-floating mb-3">
            <Field
              id="note"
              className="form-control"
              placeholder="Note"
              name="note"
              value={form.note}
              onChange={(e) => handleChange(e)}></Field>
            <label htmlFor="note" className="text-success">
              Note
            </label>
          </div>
          <ErrorMessage
            component="div"
            name="note"
            className="text-capitalize fw-bold text-danger mt-3"></ErrorMessage>
          <br />

          <Button
            type="submit"
            variant="contained"
            color="success"
            startIcon={<CheckIcon />}
            onSubmit={handleSubmit}
            className="px-4 me-4 mb-3">
            Add
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<CloseIcon />}
            onClick={() => {
              navigate("/home/products");
            }}
            className="px-4 me-5 mb-3 shadow-sm">
            Cancel
          </Button>

          {/* Show dialog confirm when click button Save */}
          <Dialog
            open={confirm}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">
              {"Are you sure you want to add?"}
            </DialogTitle>

            <DialogActions>
              <Button onClick={handleClose} value="cancel">
                Disagree
              </Button>
              <Button onClick={handleClose} autoFocus value="agree">
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </Form>
      </Formik>
    </div>
  );
};

export default AddProduct;
