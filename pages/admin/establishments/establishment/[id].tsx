import { SyntheticEvent, useState, ReactElement } from "react";

import { Box, Card, styled } from "@mui/material";
import { TabList, TabPanel, TabContext } from "@mui/lab";
import MuiTab, { TabProps } from "@mui/material/Tab";
import { Hail, Store, Vaccines } from "@mui/icons-material";

import { MainLayout, TabAdminUpdateEstablishment } from "../../../../components";

const Tab = styled(MuiTab)<TabProps>(({ theme }: any) => ({
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

const AdminEstablishmentPage = () => {
  const [value, setValue] = useState<string>("establishment");

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label="medicine-settings tabs"
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value="establishment"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Store />
                <TabName>Establecimiento</TabName>
              </Box>
            }
          />
        </TabList>
        <TabPanel sx={{ p: 0 }} value="establishment">
          <TabAdminUpdateEstablishment/>
        </TabPanel>
      </TabContext>
    </Card>
  );
};

AdminEstablishmentPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout title={"Establecimiento"} pageDescription={"Datos del establecimiento"}>
      {page}
    </MainLayout>
  );
};

export default AdminEstablishmentPage;
