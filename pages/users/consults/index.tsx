import { ReactElement, SyntheticEvent, useState } from "react";

import { Box, Card } from "@mui/material";
import MuiTab, { TabProps } from "@mui/material/Tab";
import { styled } from "@mui/material/styles";
import { TabList, TabPanel, TabContext } from "@mui/lab";
import { Ballot } from "@mui/icons-material";

import { MainLayout, TabConsult } from "../../../components";

const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    minWidth: 100,
  },
  [theme.breakpoints.down("sm")]: {
    minWidth: 67,
  },
}));

const TabName = styled("span")(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: "0.8rem",
  marginLeft: theme.spacing(2.4),
}));
const ConsultPage = () => {
  const [value, setValue] = useState<string>("consult");

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label="account-settings tabs"
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value="consult"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Ballot />
                <TabName>Consultas</TabName>
              </Box>
            }
          />
        </TabList>
        <TabPanel sx={{ p: 0 }} value="consult">
          <TabConsult />
        </TabPanel>
      </TabContext>
    </Card>
  );
};
ConsultPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout title={"Monitoreo Mascotas"} pageDescription={"Una PWA donde se puede monitorear a tu mascota"}>
      {page}
    </MainLayout>
  );
};
export default ConsultPage;
