import {
  Typography,
  TextField,
  Button,
  Box,
  Grid
} from "@mui/material"

type SearchMedicineProps = {
  search: string
  onSearchChange: (value: string) => void
  onSearch: () => void
  onReset: () => void
}

function SearchMedicine({
  search,
  onSearchChange,
  onSearch,
  onReset,
}: SearchMedicineProps) {
  return (
    <Box 
      component="form"
      className="search"
      onSubmit={(event) => {
        event.preventDefault()
        onSearch()
      }}>

      <Typography variant="h6">
        Lisää uusi lääke
      </Typography>

      <Grid container
        id="search-row"
        sx={{
          padding: 2,
          display: "flex",
          flexDirection: "row",
          justifyContent: "left",
        }}
      >
        <Grid 
          size={{xs: 12, sm: 8}}
          sx={{
              paddingBottom: 1
            }}>
          <TextField
            fullWidth
            
            id="medicine-search"
            label="Hae nimellä tai vaikuttavalla aineella"
            variant="outlined"
            value={search}
            type="search"
            onChange={(event) =>
              onSearchChange(event.target.value)
            }
          />
        </Grid>
        
        <Grid 
          size={{xs: 6, sm: 2}}
          sx={{paddingX: 1}}
        >
          <Button
            fullWidth
            sx={{padding: 2}}
            variant="contained"
            onClick={onSearch}
            type="submit"
          >
            Hae
        </Button>
        </Grid>
        <Grid 
          size={{xs: 6, sm: 2}}
          sx={{paddingRight: 1}}
        >
          <Button
            fullWidth
            sx={{padding: 2}}
            variant="outlined"
            onClick={onReset}
            type="button"
          >
            Tyhjennä
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default SearchMedicine