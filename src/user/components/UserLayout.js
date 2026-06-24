import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Breadcrumb from "./Breadcrumb";
import CIconModal from "./CIconModal";

const UserLayout = () => {
  const location = useLocation();
  const isLanding = location.pathname === "/";
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  return (
    <>
      {!isLanding && <Header onCIconClick={() => setIsAppointmentModalOpen(true)} />}
      {!isLanding && <Breadcrumb />}
      <main>
        <Outlet />
      </main>
      {!isLanding && (
        <CIconModal
          isOpen={isAppointmentModalOpen}
          onClose={() => setIsAppointmentModalOpen(false)}
        />
      )}
    </>
  );
};

export default UserLayout;
