
import type { Medicine } from "../types"

type MedicineCardProps = {
  medicine: Medicine
  onAdd: (medicine: Medicine) => void 
}

function MedicineCard({ medicine, onAdd }: MedicineCardProps) {

  return (
    <article className="medicine-card">
      <h3>{medicine.name} {medicine.strength} {medicine.dosageForm}</h3>

      {medicine.activeIngredient && (
          <p>Vaikuttava(t) aine(et): {medicine.activeIngredient}</p>
      )}


      <button onClick={() => onAdd(medicine)}>Lisää lääkityslistaan</button>
    </article>
  )
}

export default MedicineCard
