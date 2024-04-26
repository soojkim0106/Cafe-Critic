import { useEffect, useState, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { object, string } from "yup";
import { useFormik, Formik } from "formik";
import { UserContext } from "../../context/UserContext";
import {Modal} from "react-bootstrap-modal";
import {Button} from 'react-bootstrap-buttons';

const ReviewForm = () => {
  const { user, updateCurrentUser } = useContext(UserContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const reviewSchema = object({
    body: string().required("Review body is required"),
    good_description: string().required("Good description is required"),
    bad_description: string().required("Bad description is required"),
    star_rating: string()
      .required("Star rating is required")
      .max(5, "Star rating must be between 1 and 5"),
  });

  const initialValues = {
    body: "",
    good_description: "",
    bad_description: "",
    star_rating: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: reviewSchema,
    onSubmit: (formData) => {
      handlePostReview(formData);
      toast.success("Review posted successfully");
      window.location.reload();
    },
  });

  const handlePostReview = (formData) => {
    fetch(`/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => {
        if (!resp.ok) {
          return resp.json().then((errorObj) => {
            toast.error(errorObj.message);
          });
        }
        return resp.json();
      })
      .then((review) => {
        updateCurrentUser(review);
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.message);
      });
  };

  if (!user) {
    return <p>You must log in first</p>;
  }

  return (
    <>
      <div className="review-form">
        <Button variant="primary" onClick={handleShow}>
          Add Review
        </Button>
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Your Review</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={formik.handleSubmit}>
              <label htmlFor="name">Body</label>
              <input
                type="text"
                name="body"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.body}
              />
              {formik.errors.body && formik.touched.body && (
                <div className="error-message show">{formik.errors.body}</div>
              )}
              <label htmlFor="name">Good Description</label>
              <input
                type="text"
                name="good_description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.good_description}
              />
              {formik.errors.good_description &&
                formik.touched.good_description && (
                  <div className="error-message show">
                    {formik.errors.good_description}
                  </div>
                )}
              <label htmlFor="name">Bad Description</label>
              <input
                type="text"
                name="bad_description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.bad_description}
              />
              {formik.errors.bad_description &&
                formik.touched.bad_description && (
                  <div className="error-message show">
                    {formik.errors.bad_description}
                  </div>
                )}
              <label htmlFor="name">Star Rating</label>
              <input
                type="text"
                name="star_rating"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.star_rating}
              />
              {formik.errors.star_rating && formik.touched.star_rating && (
                <div className="error-message show">
                  {formik.errors.star_rating}
                </div>
              )}
            </form>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Review
              </Button>
            </Modal.Footer>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default ReviewForm;
