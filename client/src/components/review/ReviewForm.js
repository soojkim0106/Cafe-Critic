import { useState, useContext } from "react";
import toast from "react-hot-toast";
import { object, string, number } from "yup";
import { useFormik } from "formik";
import { UserContext } from "../../context/UserContext";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import "./reviewform.css";

const ReviewForm = ({cafeId}) => {
  const { user } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


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
    username: user?.username,
    // user_id: user.id,
    cafe_id: cafeId,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: reviewSchema,
    onSubmit: (formData) => {
      handlePostReview(formData);
      // navigate('/cafes')
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
    .then(response => {
      if (response.status === 201) {
        toast.success("Review posted successfully!");
        navigate('/cafe');
      } else if (!response.ok) {
        toast.error("You cannot submit another review for this cafe.");
      }
      return response.json();
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
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
              <form className="review-form" onSubmit={formik.handleSubmit}>
                <input
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
                <input
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
                <input
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
                <input
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
                <button className="review-submit-btn" type="submit">Post Review</button>
              </form>
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
