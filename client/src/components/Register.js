import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Register = () => {
  const { register } = useContext(AuthContext);
  const history = useHistory();
  const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);

  // Fetch roles and departments on component mount
  useEffect(() => {
    const fetchRolesAndDepartments = async () => {
      try {
        // Fetch roles
        const rolesResponse = await fetch('/roles');
        const rolesData = await rolesResponse.json();
        setRoles(rolesData.roles);

        // Fetch departments
        const departmentsResponse = await fetch('/departments');
        const departmentsData = await departmentsResponse.json();
        setDepartments(departmentsData.departments);
      } catch (error) {
        console.error('Error fetching roles and departments:', error);
      }
    };
        
    fetchRolesAndDepartments();
  }, []);

  // Define validation schema using Yup
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    role_id: Yup.number().required('Role is required'),
    department_id: Yup.number().required('Department is required'),
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

  const handleRegistration = async (values, { setSubmitting }) => {
    try {
      await register(values);
      history.push('/Login'); // Redirect to time log after successful registration
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleRegistration}
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
              <label htmlFor="role_id">Role:</label>
              <Field as="select" name="role_id">
                <option value="" disabled>
                  Select Role
                </option>
                {roles.map(role => (
                  <option key={role.id} value={role.id}>{role.name}</option>
                ))}
              </Field>
              <ErrorMessage name="role_id" component="div" />
            </div>
            <div>
              <label htmlFor="department_id">Department:</label>
              <Field as="select" name="department_id">
                <option value="" disabled>
                  Select Department
                </option>
                {departments.map(department => (
                  <option key={department.id} value={department.id}>{department.name}</option>
                ))}
              </Field>
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
