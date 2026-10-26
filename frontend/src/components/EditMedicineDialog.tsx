import {
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material"

import type { UserMedicine } from "../types"
import EditUserMedicineForm from "./EditUserMedicineForm"

type EditMedicineDialogProps = {
  editingUserMedicine: UserMedicine | null,
  onClose: () => void,
  onSave: (
    purpose: string, 
    dosage: string, 
    regularMedicine: boolean,
    notes: string
  ) => void
}

function EditMedicineDialog({
  editingUserMedicine,
  onClose,
  onSave
}: EditMedicineDialogProps)
{
  return (
    <Dialog
      open={editingUserMedicine !== null}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        Muokkaa lääkettä
      </DialogTitle>

      <DialogContent>
        {editingUserMedicine && (
          <EditUserMedicineForm
            userMedicine={editingUserMedicine}
            onSave={onSave}
            onCancel={onClose}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

export default EditMedicineDialog
