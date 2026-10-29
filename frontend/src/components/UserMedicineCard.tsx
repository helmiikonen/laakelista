import type { UserMedicine } from "../types"
import { useState } from "react"
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box
} from "@mui/material"
import { 
  Medication, 
  Schedule, 
  Receipt, 
  ShoppingCart, 
  ExpandMore,
  ExpandLess
} from "@mui/icons-material"

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

  const [viewMore, setViewMore] = useState(false)

  return (
    <Card
      sx={{
        width: "100%",
        boxSizing: "border-box",
      }}>
      <Box>
        <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <CardContent>
            <Typography>
              {userMedicine.medicineName} {userMedicine.medicineStrength}
            </Typography>
          </CardContent>
          <CardActions>
            <Button 
              onClick={() => setViewMore(!viewMore)}
              startIcon={viewMore ? <ExpandLess/> : <ExpandMore/>}>
                {viewMore ? "Piilota" : "Näytä"}
            </Button>
          </CardActions>
        </Box>
        {viewMore && (
        <>
        <CardContent>
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
          <Typography variant="body2">
            <strong>Käyttötarkoitus:</strong>{" "}
            {userMedicine.purpose}
          </Typography>
          <Typography variant="body2">
            <strong>Annostus:</strong>{" "}
            {userMedicine.dosage}
          </Typography>
          <Box 
            sx={{
              mt: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              width: "100%",
            }}
          >
            {userMedicine.regularMedicine ? 
            <>
              <Schedule/>
              <Typography variant="body2">
                  Säännöllinen lääke
              </Typography>
            </> :
            <>
              <Medication/>
              <Typography variant="body2">
                  Tarvittaessa otettava
              </Typography>
            </>}
          </Box>
          
          {userMedicine.prescriptionStatus && (
          <Box
            sx={{
              mt: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              width: "100%",
            }}
          >
            {userMedicine.prescriptionStatus === "R" ? (
              <>
                <Receipt />
                <Typography variant="body2">
                  Reseptilääke
                </Typography>
              </>
            ) : userMedicine.prescriptionStatus === "K" ? (
              <>
                <ShoppingCart />
                <Typography variant="body2">
                  Itsehoitolääke
                </Typography>
              </>
            ) : null}
          </Box>
        )}

          {userMedicine.notes && (
            <Typography variant="body2" sx={{marginTop: 2}}>
              <strong>Lisätiedot:</strong>{" "}
              {userMedicine.notes}
            </Typography>
          )}
          
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
            variant="outlined"
            onClick={() => onDelete(userMedicine)}
          >
            Poista
          </Button>
        </CardActions>
        </>
      )}
      </Box>
    </Card>
  )
}

export default UserMedicineCard