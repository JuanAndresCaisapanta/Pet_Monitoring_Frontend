import { ReactElement, SyntheticEvent, useState } from "react";

import { Box, Card } from "@mui/material";
import MuiTab, { TabProps } from "@mui/material/Tab";
import { styled } from "@mui/material/styles";

import { TabList, TabPanel, TabContext } from "@mui/lab";

import { PetsOutlined, AddCircleOutlineOutlined } from "@mui/icons-material";

import { MainLayout, TabInfoPet, TabListPets } from "../../../components";

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

const PetsPage = () => {
  const [value, setValue] = useState<string>("pets");

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label="pets-settings tabs"
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value="pets"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <PetsOutlined />
                <TabName>Mascotas</TabName>
              </Box>
            }
          />
          <Tab
            value="add-pets"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <AddCircleOutlineOutlined />
                <TabName>Agregar</TabName>
              </Box>
            }
          />
        </TabList>
        <TabPanel sx={{ p: 0 }} value="pets">
          <TabListPets />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value="add-pets">
          <TabInfoPet />
        </TabPanel>
      </TabContext>
    </Card>
  );
};

PetsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout
      title={"Monitoreo Mascotas"}
      pageDescription={"Una PWA donde se puede monitorear a tu mascota"}
    >
      {page}
    </MainLayout>
  );
};

export default PetsPage;
