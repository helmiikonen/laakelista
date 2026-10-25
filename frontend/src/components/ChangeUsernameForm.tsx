
import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { changeUsername } from "../api";

type ChangeUsernameFormProps = {
  currentUsername: string;
  onUsernameChanged: (newUsername: string) => void;
  onCancel: () => void
}

export default function ChangeUsernameForm({
  currentUsername,
  onUsernameChanged,
  onCancel
}: ChangeUsernameFormProps) {
  const [newUsername, setNewUsername] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const trimmedUsername = newUsername.trim();

    if (!trimmedUsername) {
      setError("Anna uusi käyttäjätunnus.");
      setSuccess("");
      return;
    }

    if (trimmedUsername === currentUsername) {
      setError("Uusi käyttäjätunnus on sama kuin nykyinen.");
      setSuccess("");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await changeUsername(trimmedUsername);
      onUsernameChanged(trimmedUsername);
      setNewUsername("");
      setSuccess("Käyttäjätunnus vaihdettu onnistuneesti.");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Käyttäjätunnuksen vaihto epäonnistui."
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
      <Typography variant="h6">
        Vaihda käyttäjätunnus
      </Typography>

      <Typography variant="body2">
        Nykyinen käyttäjätunnus: {currentUsername}
      </Typography>

      <TextField
        label="Uusi käyttäjätunnus"
        value={newUsername}
        onChange={(event) => setNewUsername(event.target.value)}
        required
        autoComplete="username"
      />
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ display: "block" }}
      >
        Käyttäjätunnuksessa tulee olla 3–20 merkkiä. Sallittuja merkkejä ovat pienet ja isot kirjaimet (poislukien ääkköset å, ä, ö) sekä numerot.
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}

      <Box sx={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
        >
          {loading ? "Tallennetaan..." : "Vaihda käyttäjätunnus"}
        </Button>
        <Button
          type="button"
          sx={{marginX: 1}}
          variant="outlined"
          onClick={onCancel}
        >
          Peruuta
        </Button>
      </Box>
      
    </Stack>
  );
}
