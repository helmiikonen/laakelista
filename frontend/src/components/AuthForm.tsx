
import { useState } from "react"
import {
  Alert,
  Box,
  Button,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material"
import { login, register } from "../api"

type AuthFormProps = {
  onLogin: () => Promise<void>
}

export default function AuthForm({ onLogin }: AuthFormProps) {
  const [mode, setMode] = useState<"login" | "register">("login")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (mode === "register") {
        await register(username, password)
      }

      await login(username, password)
      await onLogin()
    } catch {
      setError(
        mode === "register"
          ? "Rekisteröityminen tai kirjautuminen epäonnistui. Tarkista tiedot ja salasanan vaatimukset."
          : "Kirjautuminen epäonnistui. Tarkista käyttäjätunnus ja salasana."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper elevation={3} sx={{ width: "100%", maxWidth: 420, p: 3 }}>
        <Typography
          variant="h4"
          >
          Lääkelista
        </Typography>

        <Typography sx={{ mb: 2 }}>
          Kirjaudu sisään tai luo uusi käyttäjätili.
        </Typography>

        <Tabs
          value={mode}
          onChange={(_, value: "login" | "register") => {
            setMode(value)
            setError("")
          }}
          variant="fullWidth"
          sx={{ mb: 3 }}
        >
          <Tab label="Kirjaudu" value="login" />
          <Tab label="Rekisteröidy" value="register" />
        </Tabs>

        <Box component="form" onSubmit={handleSubmit}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            label="Käyttäjätunnus"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            autoComplete="username"
            required
            fullWidth
            margin="normal"
          />

          <TextField
            label="Salasana"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete={
              mode === "login" ? "current-password" : "new-password"
            }
            required
            fullWidth
            margin="normal"
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{ mt: 3 }}
          >
            {loading
              ? "Odota..."
              : mode === "login"
                ? "Kirjaudu sisään"
                : "Luo käyttäjätili"}
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}
