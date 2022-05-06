import React, { ReactElement } from 'react'
import { MainLayout } from '../../components/layout'

const ProfilePage = () => {
  return (
   
<h1>Perfil</h1>
  )
}
ProfilePage.getLayout = function getLayout(page: ReactElement) {
    return (
      <MainLayout
        title={"Monitoreo Mascotas"}
        pageDescription={"Una PWA donde se puede monitorear a tu mascota"}
      >
        {page}
      </MainLayout>
    );
  };
export default ProfilePage
