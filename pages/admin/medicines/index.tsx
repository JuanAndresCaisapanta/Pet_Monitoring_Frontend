import React, { ReactElement } from 'react'
import { MainLayout } from '../../../components';

const AdminMedicinesPage = () => {
  return (
    <div>index</div>
  )
}

AdminMedicinesPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout
      title={"Monitoreo Mascotas"}
      pageDescription={"Una PWA donde se puede monitorear a tu mascota"}
    >
      {page}
    </MainLayout>
  );
};
export default AdminMedicinesPage;