// import { useState } from 'react'
// import { useNavigate, useOutletContext} from 'react-router-dom'
// import {object, string, number, date, bool} from 'yup';
// import {useFormik} from 'formik'

// //! FOR ADMIN TO ADD NEW CAT
// const catFormSchema = object({
//   name: string().min(2).max(15, "Cat name must be at least 2 to 15 characters"),
// });

// const initialValues = {
//   username: "",
//   email: "",
//   password: ""
// }

// const Registration = () => {
//   const {isLogin, setIsLogin} = useState(false);
//   const {updateCurrentUser} = useOutletContext()
//   const navigate = useNavigate()
//   const requestedUrl = isLogin ? "/login" : "signup"
//   const formik = useFormik({
//     initialValues,
//     validationSchemas: catFormSchema,
//     onSubmit:(formData) => {
//       fetch(requestedUrl, {
//         method: "POST",
//         headers: {
//           "Content-Type" : "application/json"
//         },
//         body: JSON.string(formData)
//       })
//       .then(resp => {
//         if (resp.ok){
//           resp.json()
//           .then(updateCurrentUser)
//           .then(() => navigate("/"))
//         } else{
//           return resp
//           .json()
//           .then((errorObj) => toast.error(errorObj.message));
//         }
//       })
//     }
//   })


//   return (
//     <div>
//       <h2>Log in or Sign up for Meowstar!</h2>
//       <h3>{isLogin ? "Not a member of Meowstar?" : "Meowstar!"}</h3>
//       <button onClick={() => setIsLogin((currentState) => !currentState)}>
//         {isLogin ? "Be part of Meowstar family" : "Login"}
//       </button>

//       <Form onSubmit={formik.handleSubmit}>
//         {!isLogin && (
//           <>
//             <label>Username</label>
//             <input 
//             type="text"
//             name="username"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.username}
//             />
//             {formik.errors.username && formik.touched.username && (
//               <div className="error-message show">{formik.errors.username}</div>
//             )}
//           </>
//         )}
//         <label>Email </label>
//           <input
//             type="text"
//             name="email"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.email}
//           />
//           {formik.errors.email && formik.touched.email && (
//             <div className="error-message show">{formik.errors.email}</div>
//           )}
//           <label>Password </label>
//           <input
//             type="password"
//             name="password"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.password}
//           />
//           {formik.errors.password && formik.touched.password && (
//             <div className="error-message show">{formik.errors.password}</div>
//           )}

//         <input type="submit" value={isLogin ? "Login!" : "Signup!"} />
//       </Form>
//     </div>
//   )
// }

// export default Registration