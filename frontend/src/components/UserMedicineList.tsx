import { 
  Typography,
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

  return (
    <Box 
      sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      boxSizing: "border-box",
    }}>
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
        <Paper
          elevation={2}
          sx={{
            p: 2,
            width: "100%",
            maxWidth: 700,
            boxSizing: "border-box",
          }}
        >
            {userMedicines.map((userMedicine) => (
              <Box 
                key={userMedicine.id}
                sx={{
                  width: "100%",
                  boxSizing: "border-box",
                  mb: 2,
                }}>
                <UserMedicineCard 
                  userMedicine={userMedicine}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              </Box>
              
            ))}
        </Paper>
      )}
    </Box>
  )
}

export default UserMedicineList