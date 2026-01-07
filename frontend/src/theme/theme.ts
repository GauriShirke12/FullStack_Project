import { alpha, createTheme } from "@mui/material/styles";

const primaryMain = "#4f46e5";
const secondaryMain = "#0ea5e9";

const theme = createTheme({
  palette: {
    primary: {
      main: primaryMain,
      contrastText: "#ffffff"
    },
    secondary: {
      main: secondaryMain
    },
    background: {
      default: "#f5f7fb",
      paper: "#ffffff"
    },
    text: {
      primary: "#0f172a",
      secondary: "#64748b"
    }
  },
  typography: {
    fontFamily: ["Inter", "Roboto", "Helvetica", "Arial", "sans-serif"].join(","),
    h1: {
      fontFamily: "Clash Display, Inter, sans-serif",
      fontWeight: 600,
      fontSize: "2.75rem",
      letterSpacing: "-0.04em"
    },
    h2: {
      fontWeight: 600,
      fontSize: "2rem",
      letterSpacing: "-0.02em"
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.5rem"
    },
    subtitle1: {
      fontWeight: 500
    },
    button: {
      textTransform: "none",
      fontWeight: 600
    }
  },
  shape: {
    borderRadius: 16
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "::selection": {
          backgroundColor: alpha(primaryMain, 0.2)
        },
        body: {
          backgroundColor: "#f5f7fb"
        }
      }
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true
      },
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingInline: 20,
          paddingBlock: 12
        },
        containedPrimary: {
          backgroundImage: `linear-gradient(120deg, ${primaryMain} 0%, ${secondaryMain} 100%)`,
          boxShadow: `0 18px 35px ${alpha(primaryMain, 0.3)}`
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          border: `1px solid ${alpha("#0f172a", 0.06)}`,
          boxShadow: `0 20px 45px ${alpha("#475569", 0.15)}`
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 20
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: `linear-gradient(120deg, ${primaryMain} 0%, ${secondaryMain} 100%)`,
          boxShadow: `0 24px 40px ${alpha(primaryMain, 0.25)}`
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "rgba(15, 23, 42, 0.92)",
          backgroundImage: "none",
          color: "#e2e8f0",
          borderRight: `1px solid ${alpha("#ffffff", 0.1)}`
        }
      }
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          marginInline: 12,
          marginBlock: 4,
          color: "#cbd5f5",
          "&.Mui-selected": {
            backgroundColor: alpha("#ffffff", 0.1),
            color: "#ffffff"
          },
          "&:hover": {
            backgroundColor: alpha("#ffffff", 0.08)
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 14
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 14
        }
      }
    }
  }
});

export default theme;
