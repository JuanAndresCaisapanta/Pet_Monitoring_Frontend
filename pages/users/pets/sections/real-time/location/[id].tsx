import { SyntheticEvent, useState, ReactElement } from "react";

import { Box, Card, styled } from "@mui/material";
import { TabList, TabPanel, TabContext } from "@mui/lab";
import MuiTab, { TabProps } from "@mui/material/Tab";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

import { MainLayout, TabLocation } from "../../../../../../components";

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
        </TabList>
        <TabPanel sx={{ p: 0 }} value="location">
          <TabLocation />
        </TabPanel>
      </TabContext>
    </Card>
  );
};

LocationPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout
      title={"Ubicación de tu mascota"}
      pageDescription={"Aqui podras ver la ubicacion de tu mascota"}
    >
      {page}
    </MainLayout>
  );
};

export default LocationPage;
