import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // const location = useLocation();

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    try {
      fetch("/logout", { method: "DELETE" }).then((res) => {
        if (res.status === 204) {
          setUser(null);
          toast.success("Come again!");
        } else {
          toast.error("Logout failed. Please try again.");
        }
      });
    } catch (err) {
      throw err;
    }
  };

  const updateCurrentUser = (user) => setUser(user);


  const handleEditUser = (formData) => {
    fetch(`/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => {
        if (!resp.ok) {
          return resp.json().then((errorObj) => {
            if(errorObj.error){
              let errorMessage = errorObj.error
              if (errorMessage.includes("UNIQUE")){
                errorMessage = 'Username or Email already exists. Please try again.'
              }
              toast.error(errorMessage);
            }
          });
        }
        return resp.json().then(() => {
          toast.success("Profile updated successfully");
        });
      })
      .then((user) => {
        updateCurrentUser(user);
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.message);
      });
  };

  const handleDeleteUser = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account with us?"
    );
    if (confirmDelete) {
      fetch(`/users/${user.id}`, { method: "DELETE" }).then(logout);
    }
  };

  useEffect(() => {
    // if (location.pathname !== "/" && location.pathname !== "/registration") {
      fetch("/me").then((resp) => {
        if (resp.ok) {
          resp.json().then(setUser);
        } else {
          toast.error("Please log in");
        }
      });
    // }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        updateCurrentUser,
        handleEditUser,
        handleDeleteUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
