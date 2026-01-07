import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@context/AuthContext";
import { profileQueryKey } from "@hooks/useAuthProfile";
import { isAxiosError } from "axios";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(32, "Password must be at most 32 characters")
  .regex(/[A-Z]/, "Password must include an uppercase letter")
  .regex(/[0-9]/, "Password must include a number");

const schema = z.object({
  name: z.string().trim().min(3, "Name must be at least 3 characters").max(60),
  email: z.string().trim().email(),
  address: z.string().trim().min(5, "Address must be at least 5 characters").max(400),
  password: passwordSchema
});

type FormValues = z.infer<typeof schema>;

const SignupForm = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      password: ""
    }
  });

  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      await signUp(values);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: profileQueryKey });
      navigate("/", { replace: true });
    }
  });

  const signupError = (() => {
    if (!mutation.error) {
      return null;
    }
    if (isAxiosError(mutation.error)) {
      const payload = mutation.error.response?.data as { error?: string } | undefined;
      return payload?.error ?? mutation.error.message;
    }
    if (mutation.error instanceof Error) {
      return mutation.error.message;
    }
    return "Unable to sign up. Try again.";
  })();

  const onSubmit = (values: FormValues) => {
    mutation.reset();
    mutation.mutate(values);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      {signupError && <Alert severity="error">{signupError}</Alert>}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                label="Full Name"
                fullWidth
                error={Boolean(errors.name)}
                helperText={errors.name?.message ?? " "}
                required
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                label="Email"
                type="email"
                fullWidth
                error={Boolean(errors.email)}
                helperText={errors.email?.message ?? " "}
                required
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                label="Address"
                fullWidth
                multiline
                minRows={3}
                error={Boolean(errors.address)}
                helperText={errors.address?.message ?? "Max 400 characters"}
                required
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                error={Boolean(errors.password)}
                helperText={errors.password?.message ?? "Use at least 8 characters with an uppercase letter and a number."}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            )}
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Signing up..." : "Create Account"}
      </Button>
    </Box>
  );
};

export default SignupForm;
