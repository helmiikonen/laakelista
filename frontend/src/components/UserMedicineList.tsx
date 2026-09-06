import { useState } from "react"
import { 
  Grid,
  Typography,
  Button,
  CircularProgress,
  Box, 
  Paper
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
      <Typography variant="h5" sx={{ mb: 2 }}>
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
        <Typography>
          Lääkelistasi on tyhjä.
        </Typography>
      ) : (
        <Paper elevation={1}
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
                <Grid size={8}>
                  <Typography>
                    {userMedicine.medicineName} {userMedicine.medicineStrength}
                  </Typography>
                </Grid>

                <Grid size={4}>
                  <Button
                    variant="outlined"
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