import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material"

type DeleteMedicineDialogProps = {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

function DeleteMedicineDialog({
  open,
  onClose,
  onConfirm,
}: DeleteMedicineDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>
        Olet poistamassa lääkettä
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          Haluatko poistaa lääkkeen listaltasi?
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Peruuta
        </Button>

        <Button
          color="error"
          onClick={onConfirm}
        >
          Poista
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteMedicineDialog
