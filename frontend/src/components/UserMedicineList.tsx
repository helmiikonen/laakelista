import { useState } from "react"
import { 
  Grid,
  Typography,
  Button,
  CircularProgress,
  Box, 
  Paper,
  Divider
} from "@mui/material"

import type { UserMedicine } from "../types"
import UserMedicineCard from "./UserMedicineCard"

type UserMedicineListProps = {
  userMedicines: UserMedicine[]
  loading: boolean
  onEdit: (userMedicine: UserMedicine) => void
  onDelete: (userMedicine: UserMedicine) => void
}

function UserMedicineList({
  userMedicines,
  loading,
  onEdit,
  onDelete,
}: UserMedicineListProps) {
  const [open, setOpen] = useState(0)

  const handleOpenMedicine = (id: number) => {
    if (id !== open) {
      setOpen(id)
    } else {
      setOpen(0)
    }
  }

  return (
    <div>
      <Typography 
        variant="h5" 
        sx={{ marginBottom: 2 }}
      >
        Omat lääkkeet
      </Typography>
      {loading ? 
        
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <CircularProgress size={24} />
          <p>Ladataan lääkkeitä...</p>
        </Box>
    : 
      
      userMedicines.length === 0 ? (
        <Typography sx={{margin:2}}>
          Lääkelistasi on tyhjä.
        </Typography>
      ) : (
        <Paper elevation={2}
          sx={{padding:2, margin: 2}}>
        <Grid container spacing={1}>
          {userMedicines.map((userMedicine) => (
            <Grid
              key={userMedicine.id}
              size={12}
              
            >
              <Grid
                container
                sx={{display: "flex", justifyContent: "left"}}
                spacing={2}
              >
                <Grid size={9}>
                  <Typography className="user-medicine-list" sx={{marginLeft: 2, marginBottom: 1}}>
                    <strong>{userMedicine.medicineName}</strong> {userMedicine.medicineStrength}
                  </Typography>
                  <Divider />
                </Grid>

                <Grid size={3} sx={{display: "flex", justifyContent: "right"}}>
                  <Button
                    variant="text"
                    sx={{textTransform: "none"}}
                    onClick={() => handleOpenMedicine(userMedicine.id)}
                  >
                    {open === userMedicine.id
                      ? "Sulje"
                      : "Näytä lisätiedot"}
                  </Button>
                </Grid>
              </Grid>

              {open === userMedicine.id && (
                <UserMedicineCard
                  userMedicine={userMedicine}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              )}
            </Grid>
          ))}
        </Grid>
        </Paper>
      )}
    </div>
  )
}

export default UserMedicineList