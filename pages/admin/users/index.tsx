import { ReactElement, SyntheticEvent, useState } from "react";

import { Box, Card } from "@mui/material";
import MuiTab, { TabProps } from "@mui/material/Tab";
import { styled } from "@mui/material/styles";
import { TabList, TabPanel, TabContext } from "@mui/lab";
import { AccountCircleOutlined, AddCircleOutline, Group, LockOpenOutlined } from "@mui/icons-material";

import { MainLayout, TabAdminAddUser, TabAdminUsers, TabProfileUser, TabSecurity } from "../../../components";

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
const AdminUsersPage = () => {
  const [value, setValue] = useState<string>("users");

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
            value="users"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Group/>
                <TabName>Usuarios</TabName>
              </Box>
            }
          />
          <Tab
            value="add-users"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <AddCircleOutline />
                <TabName>Agregar</TabName>
              </Box>
            }
          />
        </TabList>
        <TabPanel sx={{ p: 0 }} value="users">
          <TabAdminUsers />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value="add-users">
          <TabAdminAddUser />
        </TabPanel>
      </TabContext>
    </Card>
  );
}

AdminUsersPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout
      title={"Usuarios"}
      pageDescription={"Administración de usuarios"}
    >
      {page}
    </MainLayout>
  );
};
export default AdminUsersPage;