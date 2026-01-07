import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
}

const StatCard = ({ title, value, icon }: StatCardProps) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        position: "relative",
        overflow: "hidden",
        color: theme.palette.common.white,
        backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        boxShadow: `0 32px 54px ${theme.palette.mode === "light" ? "rgba(79,70,229,0.25)" : "rgba(14,116,144,0.45)"}`,
        border: "none"
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at top left, rgba(255,255,255,0.35) 0%, transparent 60%)"
        }}
      />
      <CardContent sx={{ position: "relative", display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar
          sx={{
            bgcolor: "rgba(255,255,255,0.18)",
            color: theme.palette.common.white,
            width: 48,
            height: 48
          }}
        >
          {icon}
        </Avatar>
        <Box>
          <Typography variant="subtitle2" sx={{ opacity: 0.85 }}>
            {title}
          </Typography>
          <Typography variant="h4" fontWeight={700} sx={{ letterSpacing: "-0.04em" }}>
            {value}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatCard;
