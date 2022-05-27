import "../styles/globals.css";

import { ReactElement, ReactNode } from "react";

import { NextPage } from "next";
import type { AppProps } from "next/app";

import { CssBaseline, ThemeProvider } from "@mui/material";

import { theme } from "../themes";
import {
  BreedProvider,
  PetProvider,
  SpeciesProvider,
  UiProvider,
  AuthProvider,
  UserProvider,
  DeviceProvider,
} from "../context";

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
        <SpeciesProvider>
          <BreedProvider>
            <PetProvider>
              <DeviceProvider>
                <UiProvider>
                  <ThemeProvider theme={theme}>
                    <CssBaseline />
                    {getLayout(<Component {...pageProps} />)}
                  </ThemeProvider>
                </UiProvider>
              </DeviceProvider>
            </PetProvider>
          </BreedProvider>
        </SpeciesProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default MyApp;
