import { FC, ReactNode, useContext, useState } from "react";
import Head from "next/head";

import { Navbar, SideMenu } from "../ui";
import { MainContent } from "../ui/layout/MainContent";
import { Box } from "@mui/material";
import { UiContext } from "../../context";

interface Props {
  title: string;
  pageDescription: string;
  imageFullUrl?: string;
  children: ReactNode;
}

export const MainLayout: FC<Props> = ({
  children,
  title,
  pageDescription,
  imageFullUrl,
}) => {
  // const [mobileOpen, setMobileOpen] = useState(false);
  // const handleDrawerToggle = () => {
  //   setMobileOpen(!mobileOpen);
  // };

  const {isMenuOpen, toggleSideMenu} = useContext(UiContext);

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
      <SideMenu
        isMenuOpen={isMenuOpen}
        toggleSideMenu={toggleSideMenu}
      />
      <MainContent>{children}</MainContent>
    </Box>
  );
};
