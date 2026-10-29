import { useState } from "react"
import type { Medicine } from "../types"
import {
  Box,
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  TextField,
  Typography
} from "@mui/material"

type AddUserMedicineFormProps = {
  medicine: Medicine
  onAdd: (
    purpose: string, 
    dosage: string, 
    regularMedicine: boolean, 
    prescriptionStatus: string | null,
    notes: string
  ) => void
  onCancel: () => void
}

function AddUserMedicineForm({
  medicine,
  onAdd,
  onCancel,
}: AddUserMedicineFormProps) {
  const [purpose, setPurpose] = useState("")
  const [dosage, setDosage] = useState("")
  const [regularMedicine, setRegularMedicine] = useState(true);
  const [prescriptionStatus, setPrescriptionStatus] = useState<string | null>(
    medicine.hasPrescriptionPackages &&
    !medicine.hasOverTheCounterPackages
      ? "R"
      : medicine.hasOverTheCounterPackages &&
          !medicine.hasPrescriptionPackages
        ? "K"
        : null
  )
  const [notes, setNotes] = useState("")

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    onAdd(purpose, dosage, regularMedicine, prescriptionStatus, notes)
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mt: 1,
        alignItems: "center"
      }}
    >
      <Typography variant="body2" color="text.secondary">
        <strong>Lääkkeen nimi:</strong>{" "}
        {medicine.name}
      </Typography>
      
      <Typography variant="body2" color="text.secondary">
        <strong>Vahvuus:</strong>{" "}
        {medicine.strength ?? "-"}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        <strong>Lääkemuoto:</strong>{" "}
        {medicine.dosageForm ?? "-"}
      </Typography>

      {medicine.activeIngredient && (
        <Typography variant="body2" color="text.secondary">
          <strong>Vaikuttava aine:</strong>{" "}
          {medicine.activeIngredient}
        </Typography>
      )}

      <Box sx={{maxWidth: 100, display:"flex", flexDirection:"row", justifyContent:"center"}}>
        {medicine.hasPrescriptionPackages && (
          <Chip
            label="Resepti"
            size="small"
            color={prescriptionStatus == "R" ? "warning" : "secondary"}
            sx={{marginLeft: 1}}
          />
        )}

        {medicine.hasOverTheCounterPackages && (
          <Chip
            label="Itsehoito"
            size="small"
            color={prescriptionStatus == "K" ? "success" : "secondary"}
            sx={{marginLeft: 1}}
          />
        )}
      </Box>
      
      {medicine.hasPrescriptionPackages &&
        medicine.hasOverTheCounterPackages && (
          <FormControl required>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Valitse lääkityksen tyyppi:
            </Typography>

            <RadioGroup
              value={prescriptionStatus ?? ""}
              onChange={(event) =>
                setPrescriptionStatus(event.target.value)
              }
            >
              <FormControlLabel
                value="R"
                control={<Radio />}
                label="Reseptilääke"
              />
              <FormControlLabel
                value="K"
                control={<Radio />}
                label="Itsehoitolääke"
              />
            </RadioGroup>
          </FormControl>
        )}

      <TextField
        label="Käyttötarkoitus"
        value={purpose}
        onChange={(event) => setPurpose(event.target.value)}
        required
        fullWidth
      />

      <TextField
        label="Annostus"
        value={dosage}
        onChange={(event) => setDosage(event.target.value)}
        required
        fullWidth
      />

      <FormControl>
        <RadioGroup
          value={String(regularMedicine)}
          onChange={(event) => {
            setRegularMedicine(event.target.value === "true");
          }}
        >
          <FormControlLabel
            value="true"
            control={<Radio />}
            label="Säännöllinen lääke"
          />
          <FormControlLabel
            value="false"
            control={<Radio />}
            label="Tarvittaessa otettava"
          />
        </RadioGroup>
      </FormControl>

      <TextField
        label="Lisätiedot"
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
        multiline
        rows={3}
        fullWidth
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 1,
          mt: 1,
        }}
      >
        <Button
          type="button"
          variant="outlined"
          onClick={onCancel}
        >
          Peruuta
        </Button>

        <Button
          type="submit"
          variant="contained"
          disabled={
            (medicine.hasPrescriptionPackages &&
            medicine.hasOverTheCounterPackages &&
            prescriptionStatus === null) ||
            purpose == "" || dosage == ""
          }
        >
          Lisää lääkitys
        </Button>
      </Box>
    </Box>
  )
}

export default AddUserMedicineForm