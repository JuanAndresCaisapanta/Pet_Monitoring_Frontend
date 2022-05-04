import { Grid, Typography } from "@mui/material";
import type { NextPage } from "next";
import { MainLayout } from "../components/layout";
import { HomeCard, HomeTable} from "../components/ui";

const Home: NextPage = () => {
  return (
    <MainLayout
      title={"Monitoreo Mascotas"}
      pageDescription={"Una PWA donde se puede monitorear a tu mascota"}
    >
      
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <HomeCard />
        </Grid>
        <Grid item xs={12}>
          <HomeTable />
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default Home;
