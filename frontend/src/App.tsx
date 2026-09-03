import "./App.css"
import MedicineCard from "./components/MedicineCard"
import { useState, useEffect } from "react"
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
  const [medicines, setMedicines] = useState<Medicine[]>([])
  const [error, setError] = useState("")
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [userMedicines, setUserMedicines] = useState<UserMedicine[]>([])
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null)
  const [editingUserMedicine, setEditingUserMedicine] = useState<UserMedicine | null>(null)
  const [searchedTerm, setSearchedTerm] = useState("")

  const userId = 1 // tilapäisesti

  useEffect(() => {
    loadUserMedicines()
  },[])

  async function handleAdd(
    purpose: string,
    dosage: string,
    notes: string
  ) {
    if (!selectedMedicine) {
      return
    }

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
    } catch {
      setError("Lääkkeen lisääminen epäonnistui.")
    }
  }

  function handleAddClick(medicine: Medicine) {
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

  async function handleDelete(id: number) {
    try {
      await deleteUserMedicine(id, userId)
      await loadUserMedicines()
    } catch {
      setError("Lääkkeen poistaminen epäonnistui.")
    }
  }

  function handleEdit(userMedicine: UserMedicine) {
    setEditingUserMedicine(userMedicine)
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
        onDelete={handleDelete}
      />

      <div className="search">
        

        <div className="search-row">
          <input
            id="medicine-search"
            type="text"
            placeholder="Lisää uusi lääke"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <button onClick={handleNewSearch}>Hae</button>
          <button onClick={handleReset}>Tyhjennä</button>
        </div>
      </div>

      {selectedMedicine && (
        <AddUserMedicineForm
          medicine={selectedMedicine}
          onAdd={handleAdd}
          onCancel={() => setSelectedMedicine(null)}
        />
      )}

      {editingUserMedicine && (
        <EditUserMedicineForm
          userMedicine={editingUserMedicine}
          onSave={handleEditSave}
          onCancel={() => setEditingUserMedicine(null)}
        />
      )}

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

