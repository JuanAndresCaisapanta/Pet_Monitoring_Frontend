import { ReactElement, SyntheticEvent, useState } from "react";

import { Box, Card } from "@mui/material";
import MuiTab, { TabProps } from "@mui/material/Tab";
import { styled } from "@mui/material/styles";
import { TabList, TabPanel, TabContext } from "@mui/lab";
import { AddCircleOutline, Pets, Vaccines } from "@mui/icons-material";

import { MainLayout } from "../../../components";

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
const AdminMedicinesPage = () => {
  const [value, setValue] = useState<string>("medicines");

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
            value="medicines"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Vaccines />
                <TabName>Medicinas</TabName>
              </Box>
            }
          />
          <Tab
            value="add-medicines"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <AddCircleOutline />
                <TabName>Agregar</TabName>
              </Box>
            }
          />
        </TabList>
        <TabPanel sx={{ p: 0 }} value="medicines">
          {/* <TabAdminUsers /> */}
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value="add-medicines">
          {/* <TabAdminAddUser /> */}
        </TabPanel>
      </TabContext>
    </Card>
  );
};

AdminMedicinesPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout title={"Medicinas"} pageDescription={"Administración de medicinas"}>
      {page}
    </MainLayout>
  );
};
export default AdminMedicinesPage;
