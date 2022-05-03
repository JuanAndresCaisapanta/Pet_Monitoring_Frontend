import { Typography } from "@mui/material";
import type { NextPage } from "next";
import { MainLayout } from "../components/layout";

const Home: NextPage = () => {
  return (
    <MainLayout
      title={"Monitoreo Mascotas"}
      pageDescription={"Una PWA donde se puede monitorear a tu mascota"}
    >
      <Typography variant="h1" component='h1'>Monitoreo</Typography>
    </MainLayout>
  );
};

export default Home;
