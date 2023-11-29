import { useEffect, useState } from "react";
import { useParams } from "react-router";

// function Users() {
//   const [{ data: user, error, status }, setUsers] = useState({
//     data: null,
//     error: null,
//     status: "pending",
//   });
//   const { id } = useParams();

//   useEffect(() => {
//     fetch(`/users/${id}`).then((r) => {
//       if (r.ok) {
//         r.json().then((user) =>
//           setUsers({ data: user, error: null, status: "resolved" })
//         );
//       } else {
//         r.json().then((err) =>
//           setUsers({ data: null, error: err.error, status: "rejected" })
//         );
//       }
//     });
//   }, [id]);}

//   export default Users;