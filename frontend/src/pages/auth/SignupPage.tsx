import { Link as RouterLink } from "react-router-dom";
import { Box, Card, CardContent, Link, Stack, Typography } from "@mui/material";
import SignupForm from "@components/forms/auth/SignupForm";

const SignupPage = () => (
  <Box
    sx={{
      minHeight: "100vh",
      display: "grid",
      gridTemplateColumns: { xs: "1fr", md: "0.9fr 1.1fr" },
      background:
        "radial-gradient(circle at 20% 20%, rgba(79,70,229,0.35) 0%, transparent 45%)," +
        "radial-gradient(circle at 80% 15%, rgba(14,165,233,0.3) 0%, transparent 55%)," +
        "linear-gradient(180deg, #0f172a 0%, #111827 100%)",
      color: "#f8fafc"
    }}
  >
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        alignItems: "center",
        justifyContent: "center",
        px: 8,
        py: 10,
        position: "relative"
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at top right, rgba(59,130,246,0.45) 0%, transparent 55%)," +
            "radial-gradient(circle at bottom left, rgba(14,165,233,0.4) 0%, transparent 50%)",
          opacity: 0.9
        }}
      />
      <Box sx={{ position: "relative", maxWidth: 500 }}>
        <Typography variant="overline" sx={{ letterSpacing: 4, opacity: 0.85 }}>
          JOIN THE COMMUNITY
        </Typography>
        <Typography variant="h1" sx={{ mt: 2 }}>
          Transparency for every checkout experience.
        </Typography>
        <Typography variant="body1" sx={{ mt: 3, opacity: 0.85 }}>
          Empower shoppers with honest ratings and help owners celebrate great service.
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
        background: "linear-gradient(180deg, rgba(255,255,255,0.94) 0%, rgba(248,250,252,0.97) 100%)"
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 480,
          borderRadius: 26,
          boxShadow: "0 32px 60px rgba(15,23,42,0.18)",
          backdropFilter: "blur(18px)",
          background: "rgba(255,255,255,0.88)"
        }}
      >
        <CardContent sx={{ p: { xs: 4, sm: 5 } }}>
          <Stack spacing={2.5}>
            <Box>
              <Typography variant="overline" color="primary.main" sx={{ letterSpacing: 3 }}>
                Get started free
              </Typography>
              <Typography variant="h2" sx={{ mt: 1, fontSize: { xs: "1.9rem", sm: "2.2rem" } }}>
                Create your account
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
                Sign up to begin tracking store performance, gather feedback, and boost customer trust.
              </Typography>
            </Box>
            <SignupForm />
            <Typography variant="body2" color="text.secondary" textAlign="center">
              Already have an account?{" "}
              <Link component={RouterLink} to="/auth/login" color="primary.main" fontWeight={600}>
                Log in
              </Link>
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  </Box>
);

export default SignupPage;
