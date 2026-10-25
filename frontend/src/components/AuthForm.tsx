
import { useState } from "react"
import {
  Alert,
  Box,
  Button,
  InputAdornment,
  IconButton,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { login, register } from "../api"

type AuthFormProps = {
  onLogin: () => Promise<void>
}

export default function AuthForm({ onLogin }: AuthFormProps) {
  const [mode, setMode] = useState<"login" | "register">("login")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (mode === "register") {
        if (password !== confirmPassword) {
          setError("Salasanat eivät täsmää.");
          return;
        }
        await register(username, password)
      }

      await login(username, password)
      await onLogin()
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
        console.log(error.message)
      } else {
        setError("Tapahtui odottamaton virhe. Yritä uudelleen.")
      }
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
            setUsername("")
            setPassword("")
            setConfirmPassword("")
            setShowPassword(false)
            setShowConfirmPassword(false)
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

          {mode === "register" && 
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block" }}
          >
            Käyttäjätunnuksessa tulee olla 3–20 merkkiä. Sallittuja merkkejä ovat pienet ja isot kirjaimet (poislukien ääkköset å, ä, ö) sekä numerot.
          </Typography>}
          
          <TextField
            label="Salasana"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            fullWidth
            margin="normal"
            slotProps={{
              input: {
                endAdornment: 
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
              },
            }}
          />
          {mode === "register" && 
          <div>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{display:"block", marginBottom:2}}
            >
              Salasanassa tulee olla vähintään 8 merkkiä, iso ja pieni kirjain (ei ääkkösiä å, ä, ö),
              numero sekä erikoismerkki.
            </Typography>
            <TextField
              label="Vahvista salasana"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
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
          </div>}
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
