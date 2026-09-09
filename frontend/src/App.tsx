import "./App.css"
import { useState, useEffect } from "react"
import { 
  searchMedicines, 
  addUserMedicine, 
  getUserMedicines, 
  updateUserMedicine,
  deleteUserMedicine 
} from "./api"
import { Box } from "@mui/material"
import type { Medicine, UserMedicine } from "./types"
import SearchMedicine from "./components/SearchMedicine"
import UserMedicineList from "./components/UserMedicineList"
import DuplicateMedicineDialog from "./components/DuplicateMedicineDialog"
import DeleteMedicineDialog from "./components/DeleteMedicineDialog"
import AddMedicineDialog from "./components/AddMedicineDialog"
import EditMedicineDialog from "./components/EditMedicineDialog";
import SearchResults from "./components/SearchResults"

function App() {
  const [search, setSearch] = useState("")
  const [searchedTerm, setSearchedTerm] = useState("")
  const [searching, setSearching] = useState(false)
  const [medicines, setMedicines] = useState<Medicine[]>([])
  const [error, setError] = useState("")
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loadingUserMedicines, setLoadingUserMedicines] = useState(true)
  const [userMedicines, setUserMedicines] = useState<UserMedicine[]>([])
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null)
  const [editingUserMedicine, setEditingUserMedicine] = useState<UserMedicine | null>(null)
  const [deletingUserMedicine, setDeletingUserMedicine] = useState<UserMedicine | null>(null)
  const [duplicateMedicine, setDuplicateMedicine] = useState<Medicine | null>(null)
  
  const userId = 1 // tilapäisesti

  const pageSize = 10

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
        userId: userId,
        medicineId: selectedMedicine.id,
        purpose,
        dosage,
        notes: notes || null,
      })
      setSelectedMedicine(null)
      handleReset()
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
  }

  async function loadUserMedicines() {
    try {
      setLoadingUserMedicines(true)
      const res = await getUserMedicines(userId)
      setUserMedicines(res)
    } catch {
      setError("Lääkityslistan hakeminen epäonnistui.")
    } finally {
      setLoadingUserMedicines(false)
    }
  }

  async function handleSearch(pageNumber: number) {
    if (!search.trim()) {
      return
    }
    try {
      setError("")
      setSearching(true)
      searchMedicines(search, pageNumber, pageSize).then(res => {
        setTotalCount(res.totalCount)
        setMedicines(res.items ?? res)
      })
    } catch {
      setError("Lääkkeiden haku epäonnistui.")
    } finally {
      setSearching(false)
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
      handleReset()
      await loadUserMedicines()
    } catch {
      setError("Lääkkeen muokkaaminen epäonnistui.")
    }
  }

  return (
    <div className="app">
      <Box sx={{
        display: "flex",
        flexDirection: "column"
      }}>

      <h1 id="header">Lääkelista</h1>
      
      <UserMedicineList
        userMedicines={userMedicines}
        loading={loadingUserMedicines}
        onEdit={handleEdit}
        onDelete={handleClickDelete}
      />

      <SearchMedicine
        search={search}
        onSearchChange={setSearch}
        onSearch={handleNewSearch}
        onReset={handleReset}
      />

      <AddMedicineDialog
        medicine={selectedMedicine}
        onAdd={handleAdd}
        onClose={() => setSelectedMedicine(null)}
      />

      <EditMedicineDialog 
        editingUserMedicine={editingUserMedicine}
        onClose={() => setEditingUserMedicine(null)}
        onSave={handleEditSave}        
      />

      <DuplicateMedicineDialog
        medicine={duplicateMedicine}
        onClose={() => setDuplicateMedicine(null)}
        onEdit={handleDuplicateEdit}
      />

      <DeleteMedicineDialog
        open={deletingUserMedicine !== null}
        onClose={() => setDeletingUserMedicine(null)}
        onConfirm={confirmDelete}
      />

      <SearchResults 
        searching={searching}
        medicines={medicines}
        searchedTerm={searchedTerm}
        totalCount={totalCount}
        pageSize={pageSize}
        page={page}
        error={error}
        handleNextPageClick={handleNextPageClick}
        handlePreviousPageClick={handlePreviousPageClick}
        handleAddClick={handleAddClick}
      />
    </Box>
    </div>
  )
}

export default App

