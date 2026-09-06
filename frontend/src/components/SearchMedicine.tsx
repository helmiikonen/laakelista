import {
  Typography,
  TextField,
  Button,
  Box,
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

      <Box
        id="search-row"
        sx={{
          padding: 2,
          display: "flex",
          flexDirection: "row",
          justifyContent: "left",
        }}
      >
        <TextField
          sx={{
            marginX: 1,
            minWidth: 400,
          }}
          id="medicine-search"
          label="Hae nimellä tai vaikuttavalla aineella"
          variant="outlined"
          value={search}
          type="search"
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
        />

        <Button
          sx={{ marginX: 1 }}
          variant="contained"
          onClick={onSearch}
          type="submit"
        >
          Hae
        </Button>

        <Button
          sx={{ marginX: 1 }}
          variant="outlined"
          onClick={onReset}
          type="button"
        >
          Tyhjennä
        </Button>
      </Box>
    </Box>
  )
}

export default SearchMedicine