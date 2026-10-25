
import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  InputAdornment,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { changePassword } from "../api";

type ChangePasswordFormProps = {
  onCancel: () => void
}

export default function ChangePasswordForm({onCancel}: ChangePasswordFormProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("Uudet salasanat eivät täsmää.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Salasanan tulee olla vähintään 8 merkkiä pitkä.");
      return;
    }

    setLoading(true);

    try {
      const result = await changePassword(currentPassword, newPassword);
      setSuccess(result.message ?? "Salasana vaihdettu onnistuneesti.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Salasanan vaihtaminen epäonnistui."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit}
      spacing={2}
      sx={{ maxWidth: 400 }}
    >
      <Typography variant="h6">Vaihda salasana</Typography>

      <TextField
        label="Nykyinen salasana"
        type={showCurrentPassword ? "text" : "password"}
        value={currentPassword}
        onChange={(event) => setCurrentPassword(event.target.value)}
        autoComplete="off"
        required
        fullWidth
        slotProps={{
          input: {
            endAdornment: 
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  edge="end"
                >
                  {showCurrentPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
          },
        }}        
      />

      <TextField
        label="Uusi salasana"
        type={showNewPassword ? "text" : "password"}
        value={newPassword}
        onChange={(event) => setNewPassword(event.target.value)}
        autoComplete="off"
        helperText="Vähintään 8 merkkiä, vähintään yksi numero, pieni ja iso kirjain sekä erikoismerkki."
        required
        fullWidth
        slotProps={{
          input: {
            endAdornment: 
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  edge="end"
                >
                  {showNewPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
          },
        }}
      />

      <TextField
        label="Vahvista uusi salasana"
        type={showConfirmPassword ? "text" : "password"}
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
        autoComplete="off"
        required
        fullWidth
        slotProps={{
          input: {
            endAdornment: 
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                >
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
          },
        }}
      />

      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <Box sx={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? "Vaihdetaan..." : "Vaihda salasana"}
        </Button>
        <Button type="button" variant="outlined" onClick={onCancel} sx={{marginX:1}}>
          Peruuta
        </Button>
      </Box>
      
    </Stack>
  );
}
