import { ReactElement, SyntheticEvent, useState } from "react";

import { Box, Card } from "@mui/material";
import MuiTab, { TabProps } from "@mui/material/Tab";
import { styled } from "@mui/material/styles";
import { TabList, TabPanel, TabContext } from "@mui/lab";
import { AddCircleOutline, Pets } from "@mui/icons-material";

import { MainLayout, TabAdminAddPet, TabAdminPets } from "../../../components";

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
const AdminPetsPage = () => {
  const [value, setValue] = useState<string>("pets");

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
            value="pets"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Pets />
                <TabName>Mascotas</TabName>
              </Box>
            }
          />
          <Tab
            value="add-pets"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <AddCircleOutline />
                <TabName>Agregar</TabName>
              </Box>
            }
          />
        </TabList>
        <TabPanel sx={{ p: 0 }} value="pets">
         <TabAdminPets/>
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value="add-pets">
          <TabAdminAddPet />
        </TabPanel>
      </TabContext>
    </Card>
  );
};

AdminPetsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout title={"Mascotas"} pageDescription={"Administración de mascotas"}>
      {page}
    </MainLayout>
  );
};
export default AdminPetsPage;
