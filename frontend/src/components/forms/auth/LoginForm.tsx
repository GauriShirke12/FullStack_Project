import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@context/AuthContext";
import { profileQueryKey } from "@hooks/useAuthProfile";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required")
});

type FormValues = z.infer<typeof schema>;

const LoginForm = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      await signIn(values.email, values.password);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: profileQueryKey });
      navigate("/", { replace: true });
    }
  });

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      {mutation.isError && <Alert severity="error">Unable to login. Check your credentials.</Alert>}
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
            helperText={errors.email?.message}
            required
          />
        )}
      />
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
            helperText={errors.password?.message}
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
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Signing in..." : "Sign In"}
      </Button>
    </Box>
  );
};

export default LoginForm;
