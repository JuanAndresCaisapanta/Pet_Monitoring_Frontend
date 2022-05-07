import React, { ReactElement } from "react";
import { MainLayout } from "../../components/layout";
import { Subtitle } from "../../components/ui";

const PetPage = () => {
  return <Subtitle subtitle="Mascotas" />;
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
