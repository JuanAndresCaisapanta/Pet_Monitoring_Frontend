import { SyntheticEvent, useState, ReactElement } from "react";

import { Box, Card, styled } from "@mui/material";
import { TabList, TabPanel, TabContext } from "@mui/lab";
import MuiTab, { TabProps } from "@mui/material/Tab";
import { Pets } from "@mui/icons-material";

import { MainLayout, TabProfilePet } from "../../../../../components";

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

const ProfilePetPage = () => {
  const [value, setValue] = useState<string>("pet");

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
            value="pet"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Pets />
                <TabName>Mascota</TabName>
              </Box>
            }
          />
          {/* <Tab
            value="contact"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Email />
                <TabName>Contacto</TabName>
              </Box>
            }
          /> */}
        </TabList>
        <TabPanel sx={{ p: 0 }} value="pet">
          <TabProfilePet />
        </TabPanel>
        {/* <TabPanel sx={{ p: 0 }} value="contact">
          <TabContactEstablishment />
        </TabPanel> */}
      </TabContext>
    </Card>
  );
};

ProfilePetPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout
      title={"Mascota"}
      pageDescription={"Información de la mascota seleccionada"}
    >
      {page}
    </MainLayout>
  );
};

export default ProfilePetPage;
