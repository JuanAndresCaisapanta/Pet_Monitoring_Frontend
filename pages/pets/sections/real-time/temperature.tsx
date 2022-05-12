// ** React Imports
import { SyntheticEvent, useState, ReactElement } from "react";

// ** MUI Imports
import { Box, Card, styled } from "@mui/material";
import { TabList, TabPanel, TabContext } from "@mui/lab";
import MuiTab, { TabProps } from "@mui/material/Tab";

// ** Icons Imports
import DeviceThermostatOutlinedIcon from "@mui/icons-material/DeviceThermostatOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { TabTemperature } from "../../../../components/ui";
import { MainLayout } from "../../../../components/layout";

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
const TemperaturePage = () => {
  const [value, setValue] = useState<string>("temperature");

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label="temperature-settings tabs"
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value="temperature"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <DeviceThermostatOutlinedIcon />
                <TabName>Temperatura</TabName>
              </Box>
            }
          />
          {/* <Tab
          value="add-pets"
          label={
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <AddCircleOutlineOutlinedIcon />
              <TabName>Agregar</TabName>
            </Box>
          }
        /> */}
        </TabList>
        <TabPanel sx={{ p: 0 }} value="temperature">
          <TabTemperature />
        </TabPanel>
        {/* <TabPanel sx={{ p: 0 }} value="add-pets">
        <TabInfoPet />
      </TabPanel> */}
      </TabContext>
    </Card>
  );
};

TemperaturePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout
      title={"Monitoreo Mascotas"}
      pageDescription={"Una PWA donde se puede monitorear a tu mascota"}
    >
      {page}
    </MainLayout>
  );
};

export default TemperaturePage;
