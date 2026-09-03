import { useState } from "react"
import type { UserMedicine } from "../types"

type EditUserMedicineFormProps = {
  userMedicine: UserMedicine
  onSave: (
    purpose: string,
    dosage: string,
    notes: string
  ) => void
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
    <form onSubmit={handleSubmit}>
      <h3>Muokkaa lääkettä: {userMedicine.medicineName}</h3>

      {userMedicine.medicineStrength && (
        <p>
          <strong>Vahvuus:</strong>{" "}
          {userMedicine.medicineStrength}
        </p>
      )}

      <div>
        <label htmlFor="edit-purpose">
          Käyttötarkoitus
        </label>

        <input
          id="edit-purpose"
          type="text"
          value={purpose}
          onChange={(event) => setPurpose(event.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="edit-dosage">
          Annostus
        </label>

        <input
          id="edit-dosage"
          type="text"
          value={dosage}
          onChange={(event) => setDosage(event.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="edit-notes">
          Lisätiedot
        </label>

        <textarea
          id="edit-notes"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
        />
      </div>

      <button type="submit">
        Tallenna
      </button>

      <button type="button" onClick={onCancel}>
        Peruuta
      </button>
    </form>
  )
}

export default EditUserMedicineForm