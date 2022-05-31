import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    background: {
      default: "#F4F5FA",
    },
    mode: "light",
    primary: {
      main: "#9E69FD",
    },
    secondary: {
      main: "#9C9FA4",
    },
  },
  components: {
    MuiLink: {
      defaultProps: {
        underline: "none",
      },
    },
    MuiAppBar: {
      defaultProps: {
        position: "fixed",
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: "#9E69FD",
        },
      },
    },
    // MuiDivider: {
    //   styleOverrides: {
    //     root: {
    //       backgroundColor: "#F4F5FA",
    //     },
    //   },
    // },
  
    MuiListItem: {
      styleOverrides: {
        root: {
          backgroundColor: "#F4F5FA",
          "&:hover": {
            backgroundColor: "#9E69FD",
            color: "white",
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: 30,
          fontWeight: 600,
        },
        h2: {
          fontSize: 20,
          fontWeight: 400,
        },
        subtitle1: {
          fontSize: 18,
          fontWeight: 600,
        },
      },
    },

    // MuiButton: {
    //   defaultProps: {
    //     variant: "contained",
    //     size: "small",
    //     disableElevation: true,
    //   },
    //   styleOverrides: {
    //     root: {
    //       textTransform: "none",
    //       boxShadow: "none",
    //       borderRadius: 10,
    //       ":hover": {
    //         backgroundColor: "rgba(0,0,0,0.05)",
    //         transition: "all 0.3s ease-in-out",
    //       },
    //     },
    //   },
    // },

    // MuiCard: {
    //   defaultProps: {
    //     elevation: 0,
    //   },
    //   styleOverrides: {
    //     root: {
    //       boxShadow: "0px 5px 5px rgba(0,0,0,0.05)",
    //       borderRadius: "10px",
    //     },
    //   },
    // },
  },
});
