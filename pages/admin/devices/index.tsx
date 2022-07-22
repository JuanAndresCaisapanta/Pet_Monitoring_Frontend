import { ReactElement, SyntheticEvent, useState } from "react";

import { Box, Card } from "@mui/material";
import MuiTab, { TabProps } from "@mui/material/Tab";
import { styled } from "@mui/material/styles";
import { TabList, TabPanel, TabContext } from "@mui/lab";
import { AddCircleOutline, OnDeviceTraining, Pets, Vaccines } from "@mui/icons-material";

import { MainLayout, TabAdminAddDevice, TabAdminDevices } from "../../../components";

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
const AdminDevicesPage = () => {
  const [value, setValue] = useState<string>("devices");

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
            value="devices"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <OnDeviceTraining />
                <TabName>Dispositivos</TabName>
              </Box>
            }
          />
          <Tab
            value="add-devices"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <AddCircleOutline />
                <TabName>Agregar</TabName>
              </Box>
            }
          />
        </TabList>
        <TabPanel sx={{ p: 0 }} value="devices">
         <TabAdminDevices/>
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value="add-devices">
          <TabAdminAddDevice/>
        </TabPanel>
      </TabContext>
    </Card>
  );
};

AdminDevicesPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout title={"Dispositivos"} pageDescription={"Administración de dispositivos"}>
      {page}
    </MainLayout>
  );
};
export default AdminDevicesPage;
