import { AccountBoxOutlined, OnDeviceTraining, Pets, TrendingUp } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { FC, ReactElement, ReactNode } from "react";

interface DataType {
    stats: string
    title: string
    color: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
    icon: ReactElement
  }
  
  const salesData: DataType[] = [
    {
      stats: '245k',
      title: 'Mascotas',
      color: 'primary',
      icon: <Pets sx={{ fontSize: '1.75rem' }} />
    },
    {
      stats: '12.5k',
      title: 'Dispositivos',
      color: 'info',
      icon: <OnDeviceTraining sx={{ fontSize: '1.75rem' }} />
    },
  ]
const renderStats = () => {
    return salesData.map((item: DataType, index: number) => (
      <Grid item xs={6} sm={6} key={index}>
        <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            variant='rounded'
            sx={{
              mr: 3,
              width: 44,
              height: 44,
              boxShadow: 3,
              color: 'common.white',
              backgroundColor: `${item.color}.main`
            }}
          >
            {item.icon}
          </Avatar>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='caption'>{item.title}</Typography>
            <Typography variant='h6'>{item.stats}</Typography>
          </Box>
        </Box>
      </Grid>
    ))
  }
export const HomeCard = () => {
  return (
    <Card>
    <CardHeader
      title='Información'
      titleTypographyProps={{color: 'primary'}}
    />
    <CardContent sx={{ pt: theme => `${theme.spacing(1)} !important` }}>
      <Grid container spacing={1}>
        {renderStats()}
      </Grid>
    </CardContent>
  </Card>
  );
};
