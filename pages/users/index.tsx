import { ReactElement } from "react";

import { Grid } from "@mui/material";

import {
  ContactCard,
  HomeCard,
  HomeTable,
  MainLayout,
  ManualCard,
} from "../../components";

const HomePage = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <HomeCard />
      </Grid>
      <Grid item xs={12} sm={3}>
        <ManualCard />
      </Grid>
      <Grid item xs={12} sm={3}>
        <ContactCard />
      </Grid>
      <Grid item xs={12} sm={12}>
        <HomeTable />
      </Grid>
    </Grid>
  );
};
HomePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout
      title={"Monitoreo Mascotas"}
      pageDescription={"Una PWA donde se puede monitorear a tu mascota"}
    >
      {page}
    </MainLayout>
  );
};
export default HomePage;
