import React, { ReactElement } from "react";
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
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { TabMonitoring } from "../../../../components/ui";
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
const SectionsPage = () => {
  const [value, setValue] = useState<string>("sections");

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label="sections-settings tabs"
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value="sections"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <PetsOutlinedIcon />
                <TabName>Secciones</TabName>
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
        <TabPanel sx={{ p: 0 }} value="sections">
          <TabMonitoring/>
        </TabPanel>
        {/* <TabPanel sx={{ p: 0 }} value="add-pets">
          <TabInfoPet />
        </TabPanel> */}
      </TabContext>
    </Card>
  )
}
SectionsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout
      title={"Monitoreo Mascotas"}
      pageDescription={"Una PWA donde se puede monitorear a tu mascota"}
    >
      {page}
    </MainLayout>
  );
};
export default SectionsPage