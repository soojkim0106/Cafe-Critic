import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { object, string, bool } from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import styled from "styled-components";

const catSchema = object({
  name: string()
    .min(2, "Cat name must be at least 2 characters")
    .max(15, "Cat name cannot be longer than 15 characters")
    .required("Name is required"),
  age: string().max(20, "Cat age cannot exceed 20"),
  gender: string(),
  breed: string(),
  temperment: string(),
  image: string().matches(
    /(https?:\/\/.*\.(?:png|jpg|jpeg))/,
    "File URL must be in JPEG, JPG, or PNG format"
  ),
  good_with_children: bool(),
  good_with_animal: bool(),
  availability: bool(),
  fixed: bool(),
});

const initialValues = {
  name: "",
  age: "",
  gender: "",
  breed: "",
  temperament: "",
  image: "",
  good_with_children: false,
  good_with_animal: false,
  availability: false,
  fixed: false,
};

const CatForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues,
    validationSchema: catSchema,
    onSubmit: (formData) => {
      setIsSubmitting(true);
      fetch("/cats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((resp) => {
          if (resp.ok) {
            navigate("/");
          } else {
            return resp.json().then((error) => {
              toast.error(error.message);
            });
          }
        })
        .catch((error) => {
          toast.error("An error occurred. Please try again.");
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    },
  });

  return (
    <div>
      <h1>Add a Cat</h1>
      <Form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.errors.name && formik.touched.name && (
          <div className="error-message show">{formik.errors.name}</div>
        )}

        <label>Age</label>
        <input
          type="number"
          name="age"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.age}
        />
        {formik.errors.age && formik.touched.age && (
          <div className="error-message show">{formik.errors.age}</div>
        )}

        <label>Gender</label>
        <input
          type="text"
          name="gender"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.gender}
        />

        <label>Breed</label>
        <input
          type="text"
          name="breed"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.breed}
        />

        <label>Temperament</label>
        <input
          type="text"
          name="temperament"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.temperament}
        />

        <label>Image URL</label>
        <input
          type="text"
          name="image"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.image}
        />
        {formik.errors.image && formik.touched.image && (
          <div className="error-message show">{formik.errors.image}</div>
        )}

        <label>Good with Children</label>
        <input
          type="checkbox"
          name="good_with_children"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          checked={formik.values.good_with_children}
        />

        <label>Good with Animals</label>
        <input
          type="checkbox"
          name="good_with_animal"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          checked={formik.values.good_with_animal}
        />

        <label>Availability</label>
        <input
          type="checkbox"
          name="availability"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          checked={formik.values.availability}
        />

        <label>Fixed</label>
        <input
          type="checkbox"
          name="fixed"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          checked={formik.values.fixed}
        />

        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </Form>
    </div>
  );
};

export default CatForm;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
  margin: auto;
  font-family: Arial, sans-serif;
  font-size: 16px;

  label {
    margin-bottom: 5px;
  }

  input[type="text"],
  input[type="number"],
  input[type="checkbox"] {
    margin-bottom: 10px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }

  input[type="submit"] {
    background-color: #42ddf5;
    color: white;
    height: 40px;
    font-size: 18px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  input[type="submit"]:hover {
    background-color: #36b9cc;
  }

  .error-message {
    color: red;
    font-size: 14px;
    margin-top: 5px;
  }
`;
