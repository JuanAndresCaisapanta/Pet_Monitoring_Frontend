import React, { ReactElement } from 'react'
import { MainLayout } from '../../../components';

const AdminBreedsPage = () => {
  return (
    <div>index</div>
  )
}

AdminBreedsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout
      title={"Monitoreo Mascotas"}
      pageDescription={"Una PWA donde se puede monitorear a tu mascota"}
    >
      {page}
    </MainLayout>
  );
};
export default AdminBreedsPage;