import { Logout, Menu } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography
} from "@mui/material";
import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@context/AuthContext";
import NavigationMenu, { NavigationLink } from "@components/navigation/NavigationMenu";

interface DashboardLayoutProps {
  title: string;
  navigation: NavigationLink[];
  children: ReactNode;
}

const drawerWidth = 240;

const DashboardLayout = ({ title, navigation, children }: DashboardLayoutProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { signOut, user } = useAuth();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    signOut();
    navigate("/auth/login", { replace: true });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backdropFilter: "blur(18px)",
          backgroundColor: "transparent"
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Typography variant="body1" sx={{ mr: 2 }}>
            {user?.name}
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <Logout />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="navigation">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth }
          }}
        >
          <NavigationMenu links={navigation} onNavigate={() => setMobileOpen(false)} />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth }
          }}
          open
        >
          <Toolbar />
          <Divider />
          <NavigationMenu links={navigation} />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: "100vh",
          position: "relative",
          pt: { xs: 10, sm: 12 },
          pb: { xs: 6, md: 10 },
          px: { xs: 2, sm: 4, md: 6 },
          color: "text.primary",
          background:
            "radial-gradient(circle at 20% 20%, rgba(79,70,229,0.08) 0%, transparent 50%)," +
            "radial-gradient(circle at 80% 0%, rgba(14,165,233,0.12) 0%, transparent 45%)," +
            "linear-gradient(180deg, #f8fafc 0%, #eef2ff 55%, #f8fafc 100%)",
          overflow: "hidden"
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: { xs: 3, md: 4 }
          }}
        >
          {children}
        </Container>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
