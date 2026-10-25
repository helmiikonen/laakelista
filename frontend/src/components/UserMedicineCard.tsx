import type { UserMedicine } from "../types"
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box
} from "@mui/material"

type UserMedicineCardProps = {
  userMedicine: UserMedicine
  onDelete: (userMedicine: UserMedicine) => void
  onEdit: (userMedicine: UserMedicine) => void
}

function UserMedicineCard({
  userMedicine,
  onDelete,
  onEdit,
}: UserMedicineCardProps) {
  return (
    <Card
      variant="outlined"
      sx={{
        mt: 2,
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {userMedicine.medicineName}
        </Typography>

        {userMedicine.medicineStrength && (
          <Typography variant="body2" color="text.secondary">
            <strong>Vahvuus:</strong>{" "}
            {userMedicine.medicineStrength}
          </Typography>
        )}

        {userMedicine.activeIngredient && (
          <Typography variant="body2" color="text.secondary">
            <strong>Vaikuttava aine:</strong>{" "}
            {userMedicine.activeIngredient}
          </Typography>
        )}

        {userMedicine.medicineDosageForm && (
          <Typography variant="body2" color="text.secondary">
            <strong>Lääkemuoto:</strong>{" "}
            {userMedicine.medicineDosageForm}
          </Typography>
        )}

        <Box sx={{ mt: 2 }}>
          <Typography variant="body2">
            <strong>Käyttötarkoitus:</strong>{" "}
            {userMedicine.purpose}
          </Typography>

          <Typography variant="body2">
            <strong>Annostus:</strong>{" "}
            {userMedicine.dosage}
          </Typography>

          {userMedicine.notes && (
            <Typography variant="body2">
              <strong>Lisätiedot:</strong>{" "}
              {userMedicine.notes}
            </Typography>
          )}
        </Box>
      </CardContent>

      <CardActions sx={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
        <Button
          size="small"
          variant="outlined"
          onClick={() => onEdit(userMedicine)}
        >
          Muokkaa
        </Button>

        <Button
          size="small"
          color="error"
          onClick={() => onDelete(userMedicine)}
        >
          Poista
        </Button>
      </CardActions>
    </Card>
  )
}

export default UserMedicineCard