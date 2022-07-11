import React, { ReactElement } from 'react'
import { MainLayout } from '../../../components';

const AdminEstablishmentsPage = () => {
  return (
    <div>index</div>
  )
}

AdminEstablishmentsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout
      title={"Monitoreo Mascotas"}
      pageDescription={"Una PWA donde se puede monitorear a tu mascota"}
    >
      {page}
    </MainLayout>
  );
};
export default AdminEstablishmentsPage;