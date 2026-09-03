import type { UserMedicine } from "../types"

type UserMedicineCardProps = {
  userMedicine: UserMedicine
  onEdit: (userMedicine: UserMedicine) => void
  onDelete: (id: number) => void
}

function UserMedicineCard({
  userMedicine,
  onEdit,
  onDelete,
}: UserMedicineCardProps) {
  return (
    <article>
      <h3>
        {userMedicine.medicineName} {userMedicine.medicineStrength}
      </h3>
      
      <p>
        <strong>Käyttötarkoitus:</strong>{" "}
        {userMedicine.purpose}
      </p>

      <p>
        <strong>Annostus:</strong>{" "}
        {userMedicine.dosage}
      </p>

      {userMedicine.notes && (
        <p>
          <strong>Lisätiedot:</strong>{" "}
          {userMedicine.notes}
        </p>
      )}
      <button onClick={() => onEdit(userMedicine)}>
        Muokkaa
      </button>
      <button onClick={() => onDelete(userMedicine.id)}>
        Poista
      </button>
    </article>
  )
}

export default UserMedicineCard