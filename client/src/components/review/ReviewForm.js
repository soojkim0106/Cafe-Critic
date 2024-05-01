import { useEffect, useState, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { object, string, number } from "yup";
import { useFormik, Formik, Field, Form,  } from "formik";
import { UserContext } from "../../context/UserContext";
import { Modal, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

const ReviewForm = () => {
  const { user, setUser } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const { cafeId } = useParams();

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  // const updateReview = (updatedReview) => {
  //   setUser({...user, reviews: updatedReview})
  // }

  const reviewSchema = object({
    body: string().required("Review body is required"),
    good_description: string().required("Good description is required"),
    bad_description: string().required("Bad description is required"),
    star_rating: number()
      .required("Star rating is required")
  });

  const initialValues = {
    body: "",
    good_description: "",
    bad_description: "",
    star_rating: "",
    // username: user.username,
    // cafe_id: cafeId,
    // user_id: user.id,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: reviewSchema,
    onSubmit: (formData) => {
      handlePostReview(formData);
      toast.success("Review posted successfully");
    },
  });

  const handlePostReview = (formData) => {

    const {id} = user;
    console.log(`formData: ${formData}`)
    console.log(`userId: ${id}`)
    console.log(`cafeId: ${cafeId}`)
    console.log(user.username)

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
        user_id: user.id,
        cafe_id: Number.parseInt(cafeId),
        username: user.username,
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
    </>
  );
};

export default ReviewForm;
