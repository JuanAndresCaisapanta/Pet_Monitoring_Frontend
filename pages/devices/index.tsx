import React, { ReactElement } from "react";
import { MainLayout } from "../../components/layout";

const DevicePage = () => {
  return <h1>Dispositivos</h1>;
};

DevicePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout
      title={"Monitoreo Mascotas"}
      pageDescription={"Una PWA donde se puede monitorear a tu mascota"}
    >
      {page}
    </MainLayout>
  );
};

export default DevicePage;
