import { Link as RouterLink } from "react-router-dom";
import { Box, Card, CardContent, Link, Stack, Typography } from "@mui/material";
import LoginForm from "@components/forms/auth/LoginForm";

const LoginPage = () => (
  <Box
    sx={{
      minHeight: "100vh",
      display: "grid",
      gridTemplateColumns: { xs: "1fr", md: "1.1fr 0.9fr" },
      background:
        "radial-gradient(circle at 15% 20%, rgba(79,70,229,0.35) 0%, transparent 45%)," +
        "radial-gradient(circle at 85% 10%, rgba(14,165,233,0.25) 0%, transparent 50%)," +
        "linear-gradient(180deg, #0f172a 0%, #1f2937 100%)",
      color: "#f8fafc"
    }}
  >
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        alignItems: "center",
        justifyContent: "center",
        p: 8,
        position: "relative",
        overflow: "hidden"
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at top left, rgba(59,130,246,0.4) 0%, transparent 55%)," +
            "radial-gradient(circle at bottom right, rgba(14,165,233,0.35) 0%, transparent 50%)",
          opacity: 0.9
        }}
      />
      <Box sx={{ position: "relative", maxWidth: 460 }}>
        <Typography variant="overline" sx={{ letterSpacing: 4, opacity: 0.85 }}>
          STORE RATING PLATFORM
        </Typography>
        <Typography variant="h1" sx={{ mt: 2 }}>
          Rate local stores with confidence.
        </Typography>
        <Typography variant="body1" sx={{ mt: 3, maxWidth: 420, opacity: 0.85 }}>
          Share experiences, discover new favorites, and help your community find trusted store owners.
        </Typography>
      </Box>
    </Box>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 3, sm: 6 },
        py: { xs: 6, sm: 8 },
        background: "linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(248,250,252,0.96) 100%)"
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 420,
          borderRadius: 24,
          boxShadow: "0 28px 60px rgba(15,23,42,0.15)",
          backdropFilter: "blur(16px)",
          background: "rgba(255,255,255,0.9)"
        }}
      >
        <CardContent sx={{ p: { xs: 4, sm: 5 } }}>
          <Stack spacing={2.5}>
            <Box>
              <Typography variant="overline" color="primary.main" sx={{ letterSpacing: 3 }}>
                Welcome Back
              </Typography>
              <Typography variant="h2" sx={{ mt: 1, fontSize: { xs: "1.9rem", sm: "2.1rem" } }}>
                Sign in to continue
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
                Access the dashboards, manage stores, and keep an eye on ratings all in one place.
              </Typography>
            </Box>
            <LoginForm />
            <Typography variant="body2" color="text.secondary" textAlign="center">
              Need an account?{" "}
              <Link component={RouterLink} to="/auth/signup" color="primary.main" fontWeight={600}>
                Sign up
              </Link>
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  </Box>
);

export default LoginPage;
