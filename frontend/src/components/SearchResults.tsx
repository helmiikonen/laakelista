import {
  Typography,
  Button,
  Box,
  CircularProgress
} from "@mui/material"
import {
  ArrowBack,
  ArrowForward
} from "@mui/icons-material"
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
    <Box sx={{display:"flex", flexDirection:"column", justifyContent: "center"}}>
      {searching ? <div><CircularProgress size={24}/><p>Haetaan...</p></div> : 
        medicines.length == 0 && searchedTerm != "" ? 
        <Typography variant="body1">Ei tuloksia haulla "{searchedTerm}"</Typography> : <></>
      }
      {medicines.length > 0 ?
      <>
        <Typography variant="h5">Haulla löytyi {totalCount} tulosta</Typography>
        {totalCount < pageSize ? 
          <Typography variant="body1">Näytetään tulokset 1-{totalCount}</Typography> 
        : 
        <div>
          <Typography 
            variant="body1">
              Näytetään tulokset {((page-1)*pageSize)+1}-{Math.min(page*pageSize, totalCount)}
          </Typography> 
          <Button 
            onClick={handlePreviousPageClick} 
            disabled={page == 1}
            startIcon={<ArrowBack/>}>
              Edellinen sivu
          </Button>
          <Button 
            onClick={handleNextPageClick} 
            disabled={page >= Math.floor(totalCount/pageSize)+1}
            endIcon={<ArrowForward/>}>
              Seuraava sivu
          </Button>
          
        </div>}
        
      </> : <></>
      }
    </Box>
    

    {error && <p>{error}</p>}

    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        maxWidth: 700,
        mx: "auto"
      }}
    >
      {medicines.map((medicine) => (
        <MedicineCard
          key={medicine.id}
          medicine={medicine}
          onAdd={handleAddClick}
        />
      ))}
    </Box>

    {totalCount > pageSize ?
    <div>
      <Button 
        onClick={handlePreviousPageClick} 
        disabled={page == 1}
        startIcon={<ArrowBack/>}>
          Edellinen sivu
      </Button>
      <Button 
        onClick={handleNextPageClick} 
        disabled={page >= Math.floor(totalCount/pageSize)+1}
        endIcon={<ArrowForward/>}>
          Seuraava sivu
      </Button>
    </div> 
    : <></>}
  </div>
)

}

export default SearchResults