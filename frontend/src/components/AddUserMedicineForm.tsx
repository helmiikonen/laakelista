import { useState } from "react"
import type { Medicine } from "../types"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

type AddUserMedicineFormProps = {
  medicine: Medicine
  onAdd: (purpose: string, dosage: string, notes: string) => void
  onCancel: () => void
}

function AddUserMedicineForm({
  medicine,
  onAdd,
  onCancel,
}: AddUserMedicineFormProps) {
  const [purpose, setPurpose] = useState("")
  const [dosage, setDosage] = useState("")
  const [notes, setNotes] = useState("")

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    onAdd(purpose, dosage, notes)
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
      <Typography variant="body2" color="text.secondary">
        <strong>Vahvuus:</strong>{" "}
        {medicine.strength ?? "Ei ilmoitettu"}
      </Typography>

      {medicine.activeIngredient && (
        <Typography variant="body2" color="text.secondary">
          <strong>Vaikuttava aine:</strong>{" "}
          {medicine.activeIngredient}
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
          Lisää lääkitys
        </Button>
      </Box>
    </Box>
  )
}

export default AddUserMedicineForm