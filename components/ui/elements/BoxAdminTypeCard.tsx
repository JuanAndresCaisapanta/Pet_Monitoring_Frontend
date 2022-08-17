import { Avatar, Box, Typography } from "@mui/material";
import { FC, ReactNode } from "react";

interface Props {
  avatar: ReactNode;
  title: string;
  number: number | undefined;
}
export const BoxAdminTypeCard: FC<Props> = ({ avatar, title, number }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Avatar
        variant="rounded"
        sx={{
          mr: 3,
          width: 44,
          height: 44,
          color: "common.white",
          backgroundColor: `${"info"}.main`,
        }}
      >
        {avatar}
      </Avatar>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="caption">{title}</Typography>
        <Typography variant="h6">{number}</Typography>
      </Box>
    </Box>
  );
};
