import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from './AuthContext';

const Register = () => {
  const { register } = useContext(AuthContext);

  // Define validation schema using Yup
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    role_id: Yup.number().required('Role ID is required'),
    department_id: Yup.number().required('Department ID is required'),
    password: Yup.string().required('Password is required'),
  });

  const initialValues = {
    username: '',
    name: '',
    email: '',
    role_id: '',
    department_id: '',
    password: '',
  };

  const handleSubmit = (values, { setSubmitting }) => {
    // Call the register function from the AuthContext
    register(values);
    setSubmitting(false);
  };

  return (
    <div>
      <h2>Register</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <Field type="text" name="username" placeholder="Username" />
              <ErrorMessage name="username" component="div" />
            </div>
            <div>
              <Field type="text" name="name" placeholder="Name" />
              <ErrorMessage name="name" component="div" />
            </div>
            <div>
              <Field type="email" name="email" placeholder="Email" />
              <ErrorMessage name="email" component="div" />
            </div>
            <div>
              <Field type="number" name="role_id" placeholder="Role ID" />
              <ErrorMessage name="role_id" component="div" />
            </div>
            <div>
              <Field type="number" name="department_id" placeholder="Department ID" />
              <ErrorMessage name="department_id" component="div" />
            </div>
            <div>
              <Field type="password" name="password" placeholder="Password" />
              <ErrorMessage name="password" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
