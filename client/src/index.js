import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import UserProvider from "./context/UserContext";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <GoogleOAuthProvider clientId="1043251127291-45mscbh11d51040eeinopn9be09qlg1k.apps.googleusercontent.com">
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </GoogleOAuthProvider>
);
