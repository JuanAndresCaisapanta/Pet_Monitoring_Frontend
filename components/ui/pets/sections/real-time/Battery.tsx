import {
  Battery0BarOutlined,
  Battery2BarOutlined,
  Battery4BarOutlined,
  BatteryStdOutlined,
} from "@mui/icons-material";
import { FC } from "react";

interface Props {
  value: number;
}

export const Battery: FC<Props> = ({ value }) => {
  if (value > 3300) {
    return <BatteryStdOutlined color="success" />;
  } else if (value > 2500 && value <= 3300) {
    return <Battery4BarOutlined color="warning" />;
  } else if (value > 1500 && value <= 2500) {
    return <Battery2BarOutlined color="warning" />;
  } else if (value == 0 && value <= 1500) {
    return <Battery0BarOutlined color="error" />;
  }
  return <></>;
};
