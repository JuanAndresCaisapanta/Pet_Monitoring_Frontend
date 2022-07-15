import { FC, ReactNode, useContext } from "react";

import Head from "next/head";

import { Box, CircularProgress, Grid, Typography } from "@mui/material";

import { MainContent, Navbar, SideMenu } from "../ui";
import { AuthContext, UiContext } from "../../context";

interface Props {
  title: string;
  pageDescription: string;
  imageFullUrl?: string;
  children: ReactNode;
}

export const MainLayout: FC<Props> = ({ children, title, pageDescription, imageFullUrl }) => {
  const { isMenuOpen, toggleSideMenu } = useContext(UiContext);
  const { user } = useContext(AuthContext);

  if (user) {
    return (
      <Box sx={{ display: "flex" }}>
        <Head>
          <title>{title}</title>
          <meta name="description" content={pageDescription} />
          <meta name="og:title" content={title} />
          <meta name="og:description" content={pageDescription} />
          {imageFullUrl && <meta name="og:image" content={imageFullUrl} />}
        </Head>
        <Navbar toggleSideMenu={toggleSideMenu} />
        <SideMenu isMenuOpen={isMenuOpen} toggleSideMenu={toggleSideMenu} />
        <MainContent>{children}</MainContent>
      </Box>
    );
  } else {
    return (
      <Box sx={{ display: "flex" }}>
        <Head>
          <title>{title}</title>
          <meta name="description" content={pageDescription} />
          <meta name="og:title" content={title} />
          <meta name="og:description" content={pageDescription} />
          {imageFullUrl && <meta name="og:image" content={imageFullUrl} />}
        </Head>
        <MainContent>
          <Grid container direction="column" alignItems={"center"}>
            <Grid item>
              <Typography color={"primary"} sx={{ mt: 1 }}>
                Cargando...
              </Typography>
            </Grid>
            <Grid item>
              <Typography color={"primary"} sx={{ mt: 1 }}>
              <CircularProgress color="secondary" />
              </Typography>
            </Grid>
          </Grid>
        </MainContent>
      </Box>
    );
  }
};
