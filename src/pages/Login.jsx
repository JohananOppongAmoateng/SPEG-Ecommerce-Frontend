import React, { useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import AuthModal from "../components/EasyLogin";

const Login = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  return (
    <div>
      {/* <Breadcrumb pageName="Login" /> */}
      <div className="">
        <AuthModal />
      </div>
    </div>
  );
};

export default Login;
