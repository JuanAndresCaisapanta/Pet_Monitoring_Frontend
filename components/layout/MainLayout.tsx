import { FC, ReactNode, useState } from "react";
import Head from "next/head";

import { Navbar, SideMenu } from "../ui";
import { MainContent } from "../ui/MainContent";
import { Box } from "@mui/material";

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
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />
        {imageFullUrl && <meta name="og:image" content={imageFullUrl} />}
      </Head>
      <Box sx={{ display: "flex" }}>
        <Navbar handleDrawerToggle={handleDrawerToggle} />
        <nav>
          <SideMenu
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
          />
        </nav>
        <main>
          <MainContent>{children}</MainContent>
        </main>
        {/* Footer */}
        <footer>{/* TODO: mi custom footer */}</footer>
      </Box>
    </>
  );
};
