import { useState } from "react"
import type { UserMedicine } from "../types"
import {
  Box,
  Button,
  TextField,
  Typography
} from "@mui/material"

type EditUserMedicineFormProps = {
  userMedicine: UserMedicine
  onSave: (purpose: string, dosage: string, notes: string) => void
  onCancel: () => void
}

function EditUserMedicineForm({
  userMedicine,
  onSave,
  onCancel,
}: EditUserMedicineFormProps) {
  const [purpose, setPurpose] = useState(userMedicine.purpose)
  const [dosage, setDosage] = useState(userMedicine.dosage)
  const [notes, setNotes] = useState(userMedicine.notes ?? "")

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    onSave(purpose, dosage, notes)
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
      }}
    >
      <Typography variant="h6">
        {userMedicine.medicineName} {userMedicine.medicineStrength}
      </Typography>

      {userMedicine.medicineDosageForm && (
        <Typography variant="body2" color="text.secondary">
          <strong>Lääkemuoto:</strong>{" "}
          {userMedicine.medicineDosageForm}
        </Typography>
      )}

      {userMedicine.activeIngredient && (
        <Typography variant="body2" color="text.secondary">
          <strong>Vaikuttava aine:</strong>{" "}
          {userMedicine.activeIngredient}
        </Typography>
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
        >
          Tallenna
        </Button>
      </Box>
    </Box>
  )
}

export default EditUserMedicineForm