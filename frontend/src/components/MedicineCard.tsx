
import type { Medicine } from "../types"
import { Card, Typography, Box, Button, Chip, CardContent, CardActions } from "@mui/material"
import { Add } from "@mui/icons-material"

type MedicineCardProps = {
  medicine: Medicine
  onAdd: (medicine: Medicine) => void 
}

function MedicineCard({ medicine, onAdd }: MedicineCardProps) {

  return (
    <Card sx={{
      width: "100%",
      maxWidth: 600,
      boxSizing: "border-box",
      marginY: 1
    }}>
      
      <CardContent>
        <Typography variant="body1">
          <strong>{medicine.name} {medicine.strength} {medicine.dosageForm}</strong>
        </Typography>
        <Box sx={{display:"flex", flexDirection:"row", justifyContent:"center", marginY: 1}}> 
            {medicine.hasPrescriptionPackages &&
              <Chip
                label="Resepti"
                size="small"
                color="warning"
                sx={{marginLeft: 1}}
              />
            }
            {medicine.hasOverTheCounterPackages &&
              <Chip
                label="Itsehoito"
                size="small"
                color="success"
                sx={{marginLeft: 1}}
              />
            }
          </Box>
          
          {medicine.activeIngredient && (
            <Typography variant="body2">
              Vaikuttava(t) aine(et): {medicine.activeIngredient}
            </Typography>
          )}
        </CardContent>  
        <CardActions sx={{display:"flex", justifyContent: "center"}}>
          <Button 
            variant="contained" 
            size="small"
            onClick={() => onAdd(medicine)}
            startIcon={<Add/>}>
              Lisää lääke
          </Button>
        </CardActions>
          
        
    </Card>
    
  )
}

export default MedicineCard
