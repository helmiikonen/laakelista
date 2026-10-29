import {
  Typography,
  TextField,
  Button,
  Box
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
      sx={{
        mt: 2,
        width: "100%",
        maxWidth: 700,
        mx: "auto",
        boxSizing: "border-box"
      }}
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
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 1,
          p: 2,
        }}
      >
        
        <Box
          sx={{
            flex: "1 1 400px",
            minWidth: 0,
          }}
        >
          <TextField
            fullWidth
            id="medicine-search"
            label="Hae nimellä tai vaikuttavalla aineella"
            variant="outlined"
            value={search}
            type="search"
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 1,
            flexShrink: 0,
          }}
        >
          <Button
            sx={{ py: 2 }}
            variant="contained"
            onClick={onSearch}
            type="submit"
          >
            Hae
          </Button>

          <Button
            sx={{ py: 2 }}
            variant="outlined"
            onClick={onReset}
            type="button"
          >
            Tyhjennä
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default SearchMedicine