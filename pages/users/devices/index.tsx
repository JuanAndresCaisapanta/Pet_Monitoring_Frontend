import { ReactElement, SyntheticEvent, useState } from "react";

import { Box, Card } from "@mui/material";
import { TabList, TabPanel, TabContext } from "@mui/lab";
import { styled } from "@mui/material/styles";
import MuiTab, { TabProps } from "@mui/material/Tab";
import { OnDeviceTrainingOutlined, AddCircleOutlineOutlined } from "@mui/icons-material";

import { MainLayout, TabListDevices, TabAddDevice } from "../../../components";

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
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label="devices-settings tabs"
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value="devices"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <OnDeviceTrainingOutlined />
                <TabName>Dispositivos</TabName>
              </Box>
            }
          />
          <Tab
            value="add-devices"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <AddCircleOutlineOutlined />
                <TabName>Agregar</TabName>
              </Box>
            }
          />
        </TabList>
        <TabPanel sx={{ p: 0 }} value="devices">
          <TabListDevices />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value="add-devices">
          <TabAddDevice />
        </TabPanel>
      </TabContext>
    </Card>
  );
};

DevicePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout title={"Monitoreo Mascotas"} pageDescription={"Una PWA donde se puede monitorear a tu mascota"}>
      {page}
    </MainLayout>
  );
};

export default DevicePage;
