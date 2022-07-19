import { SyntheticEvent, useState, ReactElement } from "react";

import { Box, Card, styled } from "@mui/material";
import { TabList, TabPanel, TabContext } from "@mui/lab";
import MuiTab, { TabProps } from "@mui/material/Tab";
import { Hail } from "@mui/icons-material";

import { MainLayout } from "../../../../components";

const Tab = styled(MuiTab)<TabProps>(({ theme }: any) => ({
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

const AdminPetPage = () => {
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
                <Hail />
                <TabName>Mascota</TabName>
              </Box>
            }
          />
        </TabList>
        <TabPanel sx={{ p: 0 }} value="pet">
          {/* <TabAdminUpdateUser /> */}
        </TabPanel>
      </TabContext>
    </Card>
  );
};

AdminPetPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout title={"Mascota"} pageDescription={"Datos de la mascota"}>
      {page}
    </MainLayout>
  );
};

export default AdminPetPage;
