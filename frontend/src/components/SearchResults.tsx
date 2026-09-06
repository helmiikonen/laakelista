import {
  Typography,
  Button
} from "@mui/material"
import type { Medicine } from "../types"
import MedicineCard from "./MedicineCard"

type SearchResultsProps = {
  searching: boolean, 
  medicines: Medicine[],
  searchedTerm: string,
  totalCount: number,
  pageSize: number,
  page: number,
  error: string,
  handlePreviousPageClick: () => void,
  handleNextPageClick: () => void,
  handleAddClick: (medicine: Medicine) => void
}

function SearchResults({
  searching,
  medicines,
  searchedTerm,
  totalCount,
  pageSize,
  page,
  error,
  handleNextPageClick,
  handlePreviousPageClick,
  handleAddClick
}: SearchResultsProps)
{
return(

  <div className="results">
    {searching ? <p>Haetaan...</p> : 
    medicines.length == 0 && searchedTerm != "" ? 
    <Typography variant="body1">Ei tuloksia haulla "{searchedTerm}"</Typography> : <></>}
    {medicines.length > 0 ?
    <>
      <Typography variant="h5">Haulla löytyi {totalCount} tulosta</Typography>
      {totalCount < pageSize ? 
        <Typography variant="body1">Näytetään tulokset 1-{totalCount}</Typography> 
      : 
      <div>
        <Typography variant="body1">Näytetään tulokset {((page-1)*pageSize)+1}-{Math.min(page*pageSize, totalCount)}</Typography> 
        {<Button onClick={handlePreviousPageClick} disabled={page == 1}>Edellinen sivu</Button>}
        {<Button onClick={handleNextPageClick} disabled={page >= Math.floor(totalCount/pageSize)+1}>Seuraava sivu</Button>}
        
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

    {totalCount > pageSize ?
    <div>
      <Button onClick={handlePreviousPageClick} disabled={page == 1}>Edellinen sivu</Button>
      <Button onClick={handleNextPageClick} disabled={page >= Math.floor(totalCount/pageSize)+1}>Seuraava sivu</Button>
    </div> 
    : <></>}
  </div>
)

}

export default SearchResults