import "./App.css"
import MedicineCard from "./components/MedicineCard"
import { useState, useEffect } from "react"
import { 
  Typography, 
  TextField, 
  Button, 
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import { 
  searchMedicines, 
  addUserMedicine, 
  getUserMedicines, 
  updateUserMedicine,
  deleteUserMedicine 
} from "./api"
import type { Medicine, UserMedicine } from "./types"
import UserMedicineList from "./components/UserMedicineList"
import AddUserMedicineForm from "./components/AddUserMedicineForm"
import EditUserMedicineForm from "./components/EditUserMedicineForm"

function App() {
  const [search, setSearch] = useState("")
  const [searchedTerm, setSearchedTerm] = useState("")
  const [medicines, setMedicines] = useState<Medicine[]>([])
  const [error, setError] = useState("")
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [userMedicines, setUserMedicines] = useState<UserMedicine[]>([])
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null)
  const [editingUserMedicine, setEditingUserMedicine] = useState<UserMedicine | null>(null)
  const [deletingUserMedicine, setDeletingUserMedicine] = useState<UserMedicine | null>(null)
  const [duplicateMedicine, setDuplicateMedicine] = useState<Medicine | null>(null)
  
  const userId = 1 // tilapäisesti

  useEffect(() => {
    loadUserMedicines()
  },[])

  async function handleAdd(
    purpose: string,
    dosage: string,
    notes: string
  ) {
    if (!selectedMedicine) return

    try {
      await addUserMedicine({
        userId: 1,
        medicineId: selectedMedicine.id,
        purpose,
        dosage,
        notes: notes || null,
      })

      setSelectedMedicine(null)
      await loadUserMedicines()
    } catch (error) {
      if (
        error instanceof Error &&
        "status" in error &&
        error.status === 409
      ) {
        setDuplicateMedicine(selectedMedicine)
        return
      }

      setError("Lääkkeen lisääminen epäonnistui.")
    }
  }

  function handleAddClick(medicine: Medicine) {
    const alreadyExists = userMedicines.some(
      userMedicine => userMedicine.medicineId === medicine.id
    )

    if (alreadyExists) {
      setDuplicateMedicine(medicine)
      return
    }

    setSelectedMedicine(medicine)
    handleReset()
  }

  async function loadUserMedicines() {
    try {
      const res = await getUserMedicines(userId)
      setUserMedicines(res)
    } catch {
      setError("Lääkityslistan hakeminen epäonnistui.")
    }
  }

  async function handleSearch(pageNumber: number) {
    if (!search.trim()) {
      return
    }

    try {
      setError("")

      searchMedicines(search, pageNumber).then(res => {
        setTotalCount(res.totalCount)
        setMedicines(res.items ?? res)
      })
      
    } catch {
      setError("Lääkkeiden haku epäonnistui.")
    }
    
  }

  const handleNewSearch = () => {
    setPage(1)
    handleSearch(1)
    setSearchedTerm(search)
  }

  const handleReset = () => {
    setSearch("")
    setSearchedTerm("")
    setMedicines([])
    setTotalCount(0)
    setPage(1)
  }

  const handleNextPageClick = () => {
    const nextPage = page + 1
    setPage(nextPage)
    handleSearch(nextPage)
  }

  const handlePreviousPageClick = () => {
    const previousPage = page - 1
    setPage(previousPage)
    handleSearch(previousPage)
  }

  const handleClickDelete = (userMedicine: UserMedicine) => {
    setDeletingUserMedicine(userMedicine)
  }

  const confirmDelete = () => {
    if (deletingUserMedicine != null) {
      handleDelete(deletingUserMedicine)
      setDeletingUserMedicine(null)
    }
  }

  async function handleDelete(userMedicine: UserMedicine) {
    try {
      await deleteUserMedicine(userMedicine.id, userId)
      await loadUserMedicines()
    } catch {
      setError("Lääkkeen poistaminen epäonnistui.")
    }
  }

  function handleEdit(userMedicine: UserMedicine) {
    setEditingUserMedicine(userMedicine)
  }

  function handleDuplicateEdit() {
    if (!duplicateMedicine) return

    const existingUserMedicine = userMedicines.find(
      userMedicine =>
        userMedicine.medicineId === duplicateMedicine.id
    )

    if (existingUserMedicine) {
      setDuplicateMedicine(null)
      setEditingUserMedicine(existingUserMedicine)
    }
  }

  async function handleEditSave(
    purpose: string,
    dosage: string,
    notes: string
  ) {
    if (!editingUserMedicine) {
      return
    }

    try {
      await updateUserMedicine(
        editingUserMedicine.id,
        {
          userId,
          medicineId: editingUserMedicine.medicineId,
          purpose,
          dosage,
          notes: notes || null,
        }
      )

      setEditingUserMedicine(null)
      await loadUserMedicines()
    } catch {
      setError("Lääkkeen muokkaaminen epäonnistui.")
    }
  }

  return (
    <div className="app">
      <h1>Lääkelista</h1>
      
      <UserMedicineList
        userMedicines={userMedicines}
        onEdit={handleEdit}
        onDelete={handleClickDelete}
      />

      <div className="search">
        

        <Typography variant="body1">Lisää uusi lääke</Typography>
        <Box 
          id="search-row"
          sx={{
            padding: 2, 
            margin: 1, 
            display: "flex", 
            flexDirection: "row", 
            justifyContent: "left",
          }}
        >
          
          <TextField 
            sx={{marginX: 1, minWidth: 400}}
            id="medicine-search" 
            label="Hae nimellä tai vaikuttavalla aineella" 
            variant="outlined"
            value={search}
            type="search"
            onChange={(event) => setSearch(event.target.value)} 
          />
          <Button 
            sx={{marginX: 1}}
            variant="outlined" 
            onClick={handleNewSearch}>
              Hae
            </Button>
          <Button 
            sx={{marginX: 1}}
            variant="outlined"
            onClick={handleReset}>
              Tyhjennä
            </Button>
        </Box>
      </div>

      <Dialog
        open={selectedMedicine !== null}
        onClose={() => setSelectedMedicine(null)}
        fullWidth
        maxWidth="sm"
      >
        {selectedMedicine && (
          <>
            <DialogTitle>
              Lisää: {selectedMedicine.name}
            </DialogTitle>

            <DialogContent>
              <AddUserMedicineForm
                medicine={selectedMedicine}
                onAdd={handleAdd}
                onCancel={() => setSelectedMedicine(null)}
              />
            </DialogContent>
          </>
        )}
      </Dialog>

      <Dialog
        open={editingUserMedicine !== null}
        onClose={() => setEditingUserMedicine(null)}
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
              onSave={handleEditSave}
              onCancel={() => setEditingUserMedicine(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={duplicateMedicine !== null}
        onClose={() => setDuplicateMedicine(null)}
      >
        <DialogTitle>Lääke on jo listallasi</DialogTitle>

        <DialogContent>
          <DialogContentText>
            {duplicateMedicine?.name} on jo lisättynä lääkityslistallesi.
            Haluatko muokata sen tietoja?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => setDuplicateMedicine(null)}
          >
            Peruuta
          </Button>

          <Button
            variant="contained"
            onClick={handleDuplicateEdit}
          >
            Muokkaa lääkettä
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog 
        open={deletingUserMedicine != null}
        onClose={() => setDeletingUserMedicine(null)}
      >
        <DialogTitle>Olet poistamassa lääkettä</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Haluatko poistaa lääkkeen listaltasi?
          </DialogContentText>
          <DialogActions>
            <Button
              onClick={() => setDeletingUserMedicine(null)}
            >
            Peruuta
            </Button>
            <Button
              onClick={confirmDelete}
            >
            Poista
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>

      <section className="results">
        {medicines.length == 0 && searchedTerm != "" ? 
        <p>Ei tuloksia haulla "{searchedTerm}"</p> : <></>}
        {medicines.length > 0 ?
        <>
          <h2>Haulla löytyi {totalCount} tulosta</h2>
          {totalCount < 20 ? <p>Näytetään tulokset 1-{totalCount}</p> 
          : 
          <div>
            <p>Näytetään tulokset {((page-1)*20)+1}-{Math.min(page*20, totalCount)}</p> 
            {<button onClick={handlePreviousPageClick} disabled={page == 1}>Edellinen sivu</button>}
            {<button onClick={handleNextPageClick} disabled={page >= Math.floor(totalCount/20)+1}>Seuraava sivu</button>}
            
          </div>}
          
        </> : <></>
        }

        {error && <p>{error}</p>}

        {medicines.map((medicine) => (
          <MedicineCard 
            key={medicine.id}
            medicine={medicine}
            onAdd={handleAddClick}
          />
        ))}

        {totalCount > 20 ?
        <div>
          <button onClick={handlePreviousPageClick} disabled={page == 1}>Edellinen sivu</button>
          <button onClick={handleNextPageClick} disabled={page >= Math.floor(totalCount/20)+1}>Seuraava sivu</button>
        </div> 
        : <></>}
      </section>
    </div>
  )
}

export default App

