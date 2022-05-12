// ** React Imports
import { SyntheticEvent, useState, ReactElement } from "react";

// ** MUI Imports
import { Box, Card, styled } from "@mui/material";
import { TabList, TabPanel, TabContext } from "@mui/lab";
import MuiTab, { TabProps } from "@mui/material/Tab";

// ** Icons Imports
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { TabLocation } from "../../../../components/ui";
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

const LocationPage = () => {
  const [value, setValue] = useState<string>("location");

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label="location-settings tabs"
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value="location"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <LocationOnOutlinedIcon />
                <TabName>Ubicación</TabName>
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
        <TabPanel sx={{ p: 0 }} value="location">
          <TabLocation />
        </TabPanel>
        {/* <TabPanel sx={{ p: 0 }} value="add-pets">
        <TabInfoPet />
      </TabPanel> */}
      </TabContext>
    </Card>
  );
};

LocationPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout
      title={"Monitoreo Mascotas"}
      pageDescription={"Una PWA donde se puede monitorear a tu mascota"}
    >
      {page}
    </MainLayout>
  );
};

export default LocationPage;
