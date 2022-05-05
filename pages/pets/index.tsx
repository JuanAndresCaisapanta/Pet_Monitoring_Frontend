import React, { ReactElement } from "react";
import { MainLayout } from "../../components/layout";

const PetPage = () => {
  return <h1>holi</h1>;
};

PetPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout
      title={"Monitoreo Mascotas"}
      pageDescription={"Una PWA donde se puede monitorear a tu mascota"}
    >
      {page}
    </MainLayout>
  );
};

export default PetPage;

