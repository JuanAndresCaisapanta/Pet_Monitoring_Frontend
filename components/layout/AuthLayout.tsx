import { FC, ReactNode } from "react";

import Head from "next/head";
import Image from "next/image";

import { Box, CardContent, Typography } from "@mui/material";
import MuiCard, { CardProps } from "@mui/material/Card";
import { styled } from "@mui/material/styles";

const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up("sm")]: { width: "28rem" },
}));

interface Props {
  children: ReactNode;
  title: string;
  detail: string;
}

export const AuthLayout: FC<Props> = ({ children, title, detail }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Box textAlign="center" p="20px">
            <Card>
              <CardContent>
                <Box
                  sx={{
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    src="/images/logo.png"
                    alt="Logo"
                    height="50%"
                    width="50%"
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      ml: 1,
                      lineHeight: 1,
                      fontWeight: 600,
                      fontSize: "1.5rem !important",
                    }}
                    color="primary"
                  >
                    MonIOpeT
                  </Typography>
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 600, marginBottom: 1.5 }}
                  >
                    Bienvenido
                  </Typography>
                  <Typography variant="body2">{detail}</Typography>
                </Box>
                {children}
              </CardContent>
            </Card>
          </Box>
        </Box>
      </main>
    </>
  );
};
