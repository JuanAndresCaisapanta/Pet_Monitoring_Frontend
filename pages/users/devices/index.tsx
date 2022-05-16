import React, { ReactElement } from "react";
import { MainLayout } from "../../../components/layout";
import { TabAccount, TabSecurity } from "../../../components/ui";
// ** React Imports
import { SyntheticEvent, useState } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import { styled } from "@mui/material/styles";
import MuiTab, { TabProps } from "@mui/material/Tab";

// ** Icons Imports
import OnDeviceTrainingOutlinedIcon from "@mui/icons-material/OnDeviceTrainingOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { TabListDevices } from '../../../components/ui';

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
const DevicePage = () => {
  const [value, setValue] = useState<string>("devices");

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Card >
      <TabContext value={value} >
        <TabList
          onChange={handleChange}
          aria-label="devices-settings tabs"
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value="devices"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <OnDeviceTrainingOutlinedIcon />
                <TabName>Dispositivos</TabName>
              </Box>
            }
          />
          <Tab
            value="add-devices"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <AddCircleOutlineOutlinedIcon />
                <TabName>Agregar</TabName>
              </Box>
            }
          />
        </TabList>
        <TabPanel sx={{ p: 0 }} value="devices">
          <TabListDevices />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value="add-devices">
          
        </TabPanel>
      </TabContext>
    </Card>
  );
};

DevicePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout
      title={"Monitoreo Mascotas"}
      pageDescription={"Una PWA donde se puede monitorear a tu mascota"}
    >
      {page}
    </MainLayout>
  );
};

export default DevicePage;
