import { useEffect, useState } from "react";
import CheckItems from "./CheckItems";
import EasyLogin from "./EasyLogin";
import axiosInstance from "../utils/AxiosInstance";

function CheckoutDetails() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle loading state
  // if (isLoading) {
  //     return <LogoLoader/>; // Or your loading component
  // }

  return (
    <div className="ot-checkout-wrapper space-top space-extra-bottom">
      <div className="container">
        <CheckItems isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </div>
    </div>
  );
}

export default CheckoutDetails;
