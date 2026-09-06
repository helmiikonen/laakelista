import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material"

import type { Medicine } from "../types"

type DuplicateMedicineDialogProps = {
  medicine: Medicine | null
  onClose: () => void
  onEdit: () => void
}

function DuplicateMedicineDialog({
  medicine,
  onClose,
  onEdit,
}: DuplicateMedicineDialogProps) {
  return (
    <Dialog
      open={medicine !== null}
      onClose={onClose}
    >
      <DialogTitle>
        Lääke on jo listallasi
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          {medicine?.name} on jo lisättynä lääkityslistallesi.
          Haluatko muokata sen tietoja?
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Peruuta
        </Button>

        <Button
          variant="contained"
          onClick={onEdit}
        >
          Muokkaa lääkettä
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DuplicateMedicineDialog
