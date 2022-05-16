import React, { ReactElement } from "react";
import { MainLayout } from "../../../components/layout";
import { TabAccount, TabSecurity } from "../../../components/ui";
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
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";

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
const ProfilePage = () => {
  // ** State
  const [value, setValue] = useState<string>("account");

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
            value="account"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <AccountCircleOutlinedIcon />
                <TabName>Perfil</TabName>
              </Box>
            }
          />
          <Tab
            value="security"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <LockOpenOutlinedIcon />
                <TabName>Seguridad</TabName>
              </Box>
            }
          />
        </TabList>
        <TabPanel sx={{ p: 0 }} value="account">
          <TabAccount />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value="security">
          <TabSecurity />
        </TabPanel>
      </TabContext>
    </Card>
  );
};
ProfilePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout
      title={"Monitoreo Mascotas"}
      pageDescription={"Una PWA donde se puede monitorear a tu mascota"}
    >
      {page}
    </MainLayout>
  );
};
export default ProfilePage;
