import "../styles/globals.css";

import { ReactElement, ReactNode } from "react";

import { NextPage } from "next";
import type { AppProps } from "next/app";

import { CssBaseline, ThemeProvider } from "@mui/material";

import { theme } from "../themes";
import { UiProvider } from "../context";
import { AuthProvider } from "../context/auth";
import { UserProvider } from "../context/user";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <AuthProvider>
      <UserProvider>
        <UiProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {getLayout(<Component {...pageProps} />)}
          </ThemeProvider>
        </UiProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default MyApp;
