import {
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material"

import type { Medicine } from "../types"
import AddUserMedicineForm from "./AddUserMedicineForm"

type AddMedicineDialogProps = {
  medicine: Medicine | null
  onAdd: (
    purpose: string,
    dosage: string,
    notes: string
  ) => void
  onClose: () => void
}

function AddMedicineDialog({
  medicine,
  onAdd,
  onClose,
}: AddMedicineDialogProps) {
  return (
    <Dialog
      open={medicine !== null}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      {medicine && (
        <>
          <DialogTitle>
            Lisää lääkityslistaan
          </DialogTitle>

          <DialogContent>
            <AddUserMedicineForm
              medicine={medicine}
              onAdd={onAdd}
              onCancel={onClose}
            />
          </DialogContent>
        </>
      )}
    </Dialog>
  )
}

export default AddMedicineDialog

