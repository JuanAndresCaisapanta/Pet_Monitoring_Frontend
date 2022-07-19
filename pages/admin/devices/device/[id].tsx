import { SyntheticEvent, useState, ReactElement } from "react";

import { Box, Card, styled } from "@mui/material";
import { TabList, TabPanel, TabContext } from "@mui/lab";
import MuiTab, { TabProps } from "@mui/material/Tab";
import { Ballot, Hail, OnDeviceTraining, Store, Vaccines } from "@mui/icons-material";

import { MainLayout } from "../../../../components";

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

const AdminDevicePage = () => {
  const [value, setValue] = useState<string>("device");

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
            value="device"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <OnDeviceTraining />
                <TabName>dispositivo</TabName>
              </Box>
            }
          />
           <Tab
            value="detail"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Ballot />
                <TabName>Historial</TabName>
              </Box>
            }
          />
        </TabList>
        <TabPanel sx={{ p: 0 }} value="device">
          {/* <TabAdminUpdateUser /> */}
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value="detail">
          {/* <TabAdminUpdateUser /> */}
        </TabPanel>
      </TabContext>
    </Card>
  );
};

AdminDevicePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout title={"Dispositivo"} pageDescription={"Datos del dispositivo"}>
      {page}
    </MainLayout>
  );
};

export default AdminDevicePage;
