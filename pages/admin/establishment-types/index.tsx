import { ReactElement, SyntheticEvent, useState } from "react";

import { Box, Card } from "@mui/material";
import MuiTab, { TabProps } from "@mui/material/Tab";
import { styled } from "@mui/material/styles";
import { TabList, TabPanel, TabContext } from "@mui/lab";
import { Hail } from "@mui/icons-material";

import { MainLayout, TabAdminEstablishmentTypes } from "../../../components";

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
const AdminEstablishmentTypesPage = () => {
  const [value, setValue] = useState<string>("establishmentTypes");

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
            value="establishmentTypes"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Hail />
                <TabName>Establecimientos</TabName>
              </Box>
            }
          />
        </TabList>
        <TabPanel sx={{ p: 0 }} value="establishmentTypes">
          <TabAdminEstablishmentTypes />
        </TabPanel>
      </TabContext>
    </Card>
  );
};

AdminEstablishmentTypesPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout title={"Establecimientos"} pageDescription={"Administracion de Establecimientos"}>
      {page}
    </MainLayout>
  );
};
export default AdminEstablishmentTypesPage;
