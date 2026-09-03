import type { UserMedicine } from "../types"
import UserMedicineCard from "./UserMedicineCard"
import { useState } from "react"

type UserMedicineListProps = {
  userMedicines: UserMedicine[]
  onEdit: (userMedicine: UserMedicine) => void
  onDelete: (id: number) => void
}

function UserMedicineList({
  userMedicines,
  onEdit,
  onDelete,
}: UserMedicineListProps) {

  const [open, setOpen] = useState(0)

  const handleOpenMedicine = (id: number) => {
    if (id != open) {
      setOpen(id)
    } else {
      setOpen(0)
    }
  }

  return (
    <div>
      <h2>Omat lääkkeet</h2>

      {userMedicines.length === 0 ? (
        <p>Lääkelistasi on tyhjä.</p>
      ) : (
        userMedicines.map((userMedicine) => (
          <div>
            <p>
              {userMedicine.medicineName} {userMedicine.medicineStrength}
            </p>
            <button onClick={() => handleOpenMedicine(userMedicine.id)}>{open == userMedicine.id ? "Sulje" : "Näytä lisätiedot"}</button>
            {open == userMedicine.id ? 
              <UserMedicineCard
                key={userMedicine.id}
                userMedicine={userMedicine}
                onEdit={onEdit}
                onDelete={onDelete}
              />
              : <></>
            }
            
          </div>
          
        ))
      )}
    </div>
  )
}

export default UserMedicineList