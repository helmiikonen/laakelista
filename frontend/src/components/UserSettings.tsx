import { 
  Alert,
  Box, 
  Button, 
  Card,
  InputAdornment,
  IconButton,
  TextField, 
  Typography 
} from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { useState, useEffect } from "react"
import type { UserMedicine } from "../types"
import ChangeUsernameForm from "./ChangeUsernameForm"
import ChangePasswordForm from "./ChangePasswordForm"

type UserSettingsProps = {
  currentUser: {id: string, userName: string}
  setCurrentUser: React.Dispatch<React.SetStateAction<{
      id: string;
      userName: string;
    } | null>>
  userMedicines: UserMedicine[]
  onDeleteMedicines: (userMedicines: UserMedicine[]) => void
  onDeleteAccount: (password: string) => Promise<void>
}

function UserSettings({
  currentUser, 
  setCurrentUser,
  userMedicines, 
  onDeleteMedicines,
  onDeleteAccount
}: UserSettingsProps) {

  const [openChangeUsernameForm, setOpenChangeUsernameForm] = useState(false)
  const [openChangePasswordForm, setOpenChangePasswordForm] = useState(false)
  const [deletePassword, setDeletePassword] = useState("")
  const [openDeleteMedicinesDialog, setOpenDeleteMedicinesDialog] = useState(false)
  const [openDeleteAccountDialog, setOpenDeleteAccountDialog] = useState(false)
  const [openConfirmationMessage, setOpenConfirmationMessage] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [deleteError, setDeleteError] = useState("")

  const handleClickChangeUsername = () => {
    setOpenChangeUsernameForm(!openChangeUsernameForm)
  }

  const handleClickChangePassword = () => {
    setOpenChangePasswordForm(!openChangePasswordForm)
  }

  const handleClickDeleteMedicines = () => {
    setOpenDeleteMedicinesDialog(!openDeleteMedicinesDialog)
  }

  const handleClickDeleteAccount = () => {
    setOpenDeleteAccountDialog(!openDeleteAccountDialog)
  }

  const deleteMedicines = () => {
    onDeleteMedicines(userMedicines)
    setOpenDeleteMedicinesDialog(false)
    setOpenConfirmationMessage(true)
  }

  const deleteAccount = async () => {
    setDeleteError("");
    try {
      await onDeleteAccount(deletePassword);
      setDeletePassword("");
    } catch (error) {
      setDeletePassword("");

      setDeleteError(
        error instanceof Error
          ? error.message
          : "Käyttäjätilin poistaminen epäonnistui."
      );
    } finally {
      //
    }
  };

  useEffect(() => {
    if (openConfirmationMessage) {
      const timeout = setTimeout(() => {
        setOpenConfirmationMessage(false);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [openConfirmationMessage]);

  return (
    <Box 
      sx={{
        width: "100%",
        maxWidth: 600,
        mx: "auto",
        boxSizing: "border-box",
      }}>
      <Typography 
        variant="h5" 
        sx={{ marginBottom: 2 }}
      >
        Omat tiedot
      </Typography>
        {openChangeUsernameForm ? 
        <ChangeUsernameForm
          currentUsername={currentUser.userName}
          onUsernameChanged={(newUsername) => {
            setCurrentUser((user) =>
              user ? { ...user, userName: newUsername } : user
            );
          }}
          onCancel={() => setOpenChangeUsernameForm(false)}
        />
        
        : openChangePasswordForm ? 
        <ChangePasswordForm 
          onCancel={() => setOpenChangePasswordForm(false)}
        />
        
        :
        <Box sx={{display:"flex", flexDirection:"column", width: "100%", maxWidth: 600}}>
          <Typography variant="body1" sx={{margin:1}}>Käyttäjätunnus: {currentUser?.userName}</Typography>
          <Button 
            variant="outlined" 
            sx={{margin:1}} 
            onClick={handleClickChangeUsername}>
              Vaihda käyttäjätunnus
          </Button>
          <Button 
            variant="outlined" 
            sx={{margin:1}} 
            onClick={handleClickChangePassword}>
              Vaihda salasana
          </Button>
          <Button 
            variant="outlined" 
            sx={{margin:1}} 
            color="error"
            onClick={handleClickDeleteMedicines}>
              Tyhjennä oma lääkelista
          </Button>
          {openDeleteMedicinesDialog && 
          <Card sx={{margin: 1, padding: 2, maxWidth: 600}}>
            <Typography 
              variant="subtitle2">
                Haluatko varmasti poistaa kaikki lääkkeet listaltasi?
                Voit myös poistaa yksittäisiä lääkkeitä etusivun lääkelistanäkymässä.
            </Typography>
            <Box sx={{display:"flex", flexDirection:"row", justifyContent:"center", marginTop:1}}>
              <Button
                variant="contained"
                color="error"
                onClick={deleteMedicines}
              >
                Tyhjennä lista
              </Button>
              <Button 
                variant="outlined"
                onClick={() => setOpenDeleteMedicinesDialog(false)}
                sx={{marginLeft:1}}
              >
                Peruuta
              </Button>
            </Box>
          </Card>}
          {openConfirmationMessage && 
            <Typography variant="subtitle2">
              Lääkelista tyhjennetty onnistuneesti!
            </Typography>}
          <Button 
            variant="outlined" 
            sx={{margin:1}} 
            color="error"
            onClick={handleClickDeleteAccount}>
              Poista käyttäjätili
          </Button>
          {openDeleteAccountDialog && 
          <Card sx={{margin: 1, padding: 2, maxWidth: 600}}>
            <Typography variant="subtitle2">
              Haluatko varmasti poistaa käyttäjätilisi? Tätä toimintoa ei voi peruuttaa.
            </Typography>
            <TextField 
              type={showPassword ? "text" : "password"}
              sx={{marginY: 1}}
              label="Syötä salasana jatkaaksesi"
              value={deletePassword}
              onChange={(event) => setDeletePassword(event.target.value)}
              fullWidth
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
            {deleteError && <Alert severity="error">{deleteError}</Alert>}
            <Box sx={{display:"flex", flexDirection:"row", justifyContent:"center", marginTop:1}}>
              <Button
                disabled={!deletePassword}
                variant="contained"
                color="error"
                onClick={deleteAccount}
              >
                Poista käyttäjätili
              </Button>
              <Button 
                sx={{marginLeft:1}}
                variant="outlined"
                onClick={() => setOpenDeleteAccountDialog(false)}
              >
                Peruuta
              </Button>
            </Box>
          </Card>
          }
        </Box>
        }
      
    </Box>
  )
}

export default UserSettings