import "../styles/globals.css";

import { ReactElement, ReactNode } from "react";

import { NextPage } from "next";
import type { AppProps } from "next/app";

import { Providers } from "../provider";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return <Providers>{getLayout(<Component {...pageProps} />)}</Providers>;
}

export default MyApp;
