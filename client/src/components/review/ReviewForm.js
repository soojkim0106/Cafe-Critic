import { useEffect, useState, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { object, string, number } from "yup";
import { useFormik, Formik, Field, Form } from "formik";
import { UserContext } from "../../context/UserContext";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router-dom";
import "./reviewform.css";

const ReviewForm = ({cafeId}) => {
  const { user, setUser } = useContext(UserContext);
  const [show, setShow] = useState(false);
  // const { id } = user

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

 console.log(user.username)

  const reviewSchema = object({
    body: string().required("Review body is required"),
    good_description: string().required("Good description is required"),
    bad_description: string().required("Bad description is required"),
    star_rating: number().required("Star rating is required"),
  });

  const initialValues = {
    body: "",
    good_description: "",
    bad_description: "",
    star_rating: "",
    username: user.username,
    // user_id: user.id,
    cafe_id: cafeId,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: reviewSchema,
    onSubmit: (formData) => {
      handlePostReview(formData);
      toast.success("Review posted successfully");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    },
  });

  const handlePostReview = (formData) => {
    fetch("/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: formData.body,
        good_description: formData.good_description,
        bad_description: formData.bad_description,
        star_rating: Number.parseInt(formData.star_rating),
        // user_id: user.id,
        cafe_id: Number.parseInt(cafeId),
        username: formData.username,
      }),
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Failed to submit form");
        }
      })
      .catch((error) => {
        toast.error("An error occurred. Please try again.");
        console.error(error);
      });
  };

  if (!user) {
    return <p>You must log in first</p>;
  }

  return (
    <>
      <Button variant="primary" className="model-start" onClick={handleShow}>
        Write a Review
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className="model-title">Write a Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="review">
            <Formik onsubmit={formik.handleSubmit}>
              <Form className="review-form" onSubmit={formik.handleSubmit}>
                <Field
                  type="text"
                  name="body"
                  placeholder="body"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.body}
                  className="input"
                  autoComplete="body"
                />
                {formik.errors.body && formik.touched.body && (
                  <div className="error-message show">{formik.errors.body}</div>
                )}
                <Field
                  type="text"
                  name="good_description"
                  placeholder="what were the pros?"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.good_description}
                  className="input"
                  autoComplete="good_description"
                />
                {formik.errors.good_description &&
                  formik.touched.good_description && (
                    <div className="error-message show">
                      {formik.errors.good_description}
                    </div>
                  )}
                <Field
                  type="text"
                  name="bad_description"
                  placeholder="what were the cons?"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.bad_description}
                  className="input"
                  autoComplete="bad_description"
                />
                {formik.errors.bad_description &&
                  formik.touched.bad_description && (
                    <div className="error-message show">
                      {formik.errors.bad_description}
                    </div>
                  )}
                <Field
                  type="integer"
                  name="star_rating"
                  placeholder="rating: 1-5 stars"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.star_rating}
                  className="input"
                  autoComplete="star_rating"
                />
                {formik.errors.star_rating && formik.touched.star_rating && (
                  <div className="error-message show">
                    {formik.errors.star_rating}
                  </div>
                )}
                <input type="submit" className="submit" value="submit" />
              </Form>
            </Formik>
          </div>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" className="modal-close" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ReviewForm;
