import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import { ReactNode } from "react";

export interface NavigationLink {
  to: string;
  label: string;
  icon?: ReactNode;
}

interface NavigationMenuProps {
  links: NavigationLink[];
  onNavigate?: () => void;
}

const NavigationMenu = ({ links, onNavigate }: NavigationMenuProps) => {
  const location = useLocation();

  return (
    <List sx={{ px: 1.5, pt: 2 }}>
      {links.map((link) => (
        <ListItem key={link.to} disablePadding>
          <ListItemButton
            component={NavLink}
            to={link.to}
            selected={location.pathname === link.to}
            onClick={onNavigate}
            sx={{
              transition: "all 0.2s ease",
              "& .MuiListItemIcon-root": {
                minWidth: 40
              }
            }}
          >
            {link.icon && <ListItemIcon sx={{ color: "inherit" }}>{link.icon}</ListItemIcon>}
            <ListItemText primary={link.label} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default NavigationMenu;
