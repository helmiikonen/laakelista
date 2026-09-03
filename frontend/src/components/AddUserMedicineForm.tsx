import { useState } from "react"
import type { Medicine } from "../types"

type AddUserMedicineFormProps = {
  medicine: Medicine
  onAdd: (
    purpose: string,
    dosage: string,
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
  const [notes, setNotes] = useState("")

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    onAdd(purpose, dosage, notes)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Lisää lääkelistalle: {medicine.name} {medicine.strength}</h3>

      <div>
        <label htmlFor="purpose">
          Käyttötarkoitus
        </label>
        <input
          id="purpose"
          type="text"
          value={purpose}
          onChange={(event) => setPurpose(event.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="dosage">
          Annostus
        </label>
        <input
          id="dosage"
          type="text"
          value={dosage}
          onChange={(event) => setDosage(event.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="notes">
          Lisätiedot
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
        />
      </div>

      <button type="submit">
        Lisää
      </button>

      <button type="button" onClick={onCancel}>
        Peruuta
      </button>
    </form>
  )
}

export default AddUserMedicineForm