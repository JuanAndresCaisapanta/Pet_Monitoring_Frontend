import { FC } from "react";

import { Typography } from "@mui/material";

interface Props {
  subtitle: string;
}

export const Subtitle: FC<Props> = ({ subtitle }) => {
  return (
    <>
      <Typography variant="h5" component="h5" color="primary">
        {subtitle}
      </Typography>
      <hr />
    </>
  );
};
