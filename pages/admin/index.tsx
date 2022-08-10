import { ReactElement } from "react";

import { Grid } from "@mui/material";

import {
  AdminCard,
  AdminTypeCard,
  ContactCard,
  HomeCard,
  HomeTable,
  MainLayout,
  ManualCard,
} from "../../components";

const AdminHomePage = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12}>
        <AdminCard />
      </Grid>
      <Grid item xs={12} sm={12}>
        <AdminTypeCard />
      </Grid>
    </Grid>
  );
};
AdminHomePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout
      title={"Monitoreo Mascotas"}
      pageDescription={"Una PWA donde se puede monitorear a tu mascota"}
    >
      {page}
    </MainLayout>
  );
};
export default AdminHomePage;
