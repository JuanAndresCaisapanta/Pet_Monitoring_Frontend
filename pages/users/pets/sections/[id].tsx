import { ReactElement, SyntheticEvent, useState } from "react";

import { Box, Card, styled, TabProps } from "@mui/material";
import { TabList, TabPanel, TabContext } from "@mui/lab";
import { SensorsOutlined, ArticleOutlined } from "@mui/icons-material";
import MuiTab from "@mui/material/Tab";

import { MainLayout, TabManagement, TabRealTime } from "../../../../components";

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
  const [value, setValue] = useState<string>("real-time");
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
            value="real-time"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <SensorsOutlined />
                <TabName>Tiempo Real</TabName>
              </Box>
            }
          />
          <Tab
            value="management"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ArticleOutlined />
                <TabName>Adminitración</TabName>
              </Box>
            }
          />
        </TabList>
        <TabPanel sx={{ p: 0 }} value="real-time">
          <TabRealTime />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value="management">
          <TabManagement />
        </TabPanel>
      </TabContext>
    </Card>
  );
};
SectionsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout
      title={"Secciones mascota"}
      pageDescription={
        "En esta sección podras ver las opciones para monitorear a tu mascota"
      }
    >
      {page}
    </MainLayout>
  );
};
export default SectionsPage;
