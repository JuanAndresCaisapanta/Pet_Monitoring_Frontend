import { SyntheticEvent, useState, ReactElement } from "react";

import { Box, Card, styled } from "@mui/material";
import { TabList, TabPanel, TabContext } from "@mui/lab";
import MuiTab, { TabProps } from "@mui/material/Tab";

import { ConnectWithoutContactOutlined, Contactless, ContactPage, ContactsOutlined, HailOutlined } from "@mui/icons-material";

import {
  MainLayout,
  TabContactProfessional,
  TabProfileProfessional,
} from "../../../../../../../components";

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

const ProfileProfessionalPage = () => {
  const [value, setValue] = useState<string>("professional");

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
            value="professional"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <HailOutlined />
                <TabName>Profesional</TabName>
              </Box>
            }
          />
           <Tab
            value="contact"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ConnectWithoutContactOutlined />
                <TabName>Contacto</TabName>
              </Box>
            }
          />
        </TabList>
        <TabPanel sx={{ p: 0 }} value="professional">
          <TabProfileProfessional />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value="contact">
          <TabContactProfessional />
        </TabPanel>
      </TabContext>
    </Card>
  );
};

ProfileProfessionalPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout
      title={"Profesional"}
      pageDescription={"Información del profesional"}
    >
      {page}
    </MainLayout>
  );
};

export default ProfileProfessionalPage;
