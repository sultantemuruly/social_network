import "./globals.css";

import { Routes, Route } from "react-router-dom";
import { Home } from "./root/pages";
import SigninForm from "./auth/forms/SigninForm";
import SignupForm from "./auth/forms/SignupForm";
import AuthLayout from "./auth/AuthLayout";
import RootLayout from "./root/RootLayout";

const App = () => {
  return;
  <main className="flex h-screen">
    <Routes>
      {/* public routes */}
      <Route element={<AuthLayout/>}>
        <Route path="/sign-in" element={<SigninForm />}></Route>
        <Route path="/sign-up" element={<SignupForm />}></Route>
      </Route>

      {/* private routes */}
      <Route element={<RootLayout/>}>
        <Route index element={<Home />}></Route>
      </Route>
    </Routes>
  </main>;
};
export default App;
