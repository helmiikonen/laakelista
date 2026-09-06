
import type { Medicine } from "../types"
import { Typography, Button, Grid } from "@mui/material"

type MedicineCardProps = {
  medicine: Medicine
  onAdd: (medicine: Medicine) => void 
}

function MedicineCard({ medicine, onAdd }: MedicineCardProps) {

  return (
    <Grid container
      spacing={1} 
      sx={{display: "flex", flexDirection: "row", padding: 1}}>
      <Grid size={8} sx={{display: "flex", flexDirection: "column", justifyContent: "left"}}>
        <Typography variant="subtitle2">
          <strong>{medicine.name} {medicine.strength} {medicine.dosageForm}</strong>
        </Typography>
        {medicine.activeIngredient && (
          <Typography variant="body2">
            Vaikuttava(t) aine(et): {medicine.activeIngredient}
          </Typography>
        )}
      </Grid>
      <Grid size={4}>
        <Button 
          sx={{marginX: 2, marginY: 1}}
          variant="contained" 
          size="small"
          onClick={() => onAdd(medicine)}>
            Lisää lääkityslistaan
        </Button>
      </Grid>
      
    </Grid>
  )
}

export default MedicineCard
