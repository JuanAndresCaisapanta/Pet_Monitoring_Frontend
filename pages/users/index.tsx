import { Grid, Typography } from "@mui/material";
import type { NextPage } from "next";
import { ReactElement } from "react";
import { MainLayout } from "../../components/layout";
import { ContactCard, HomeCard, HomeTable, ManualCard } from "../../components/ui";

const HomePage = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <HomeCard />
      </Grid>
      <Grid item xs={12} sm={3}>
        <ManualCard/>
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
