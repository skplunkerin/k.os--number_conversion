import './App.css'
import Grid from '@mui/material/Unstable_Grid2'
import Base8Converter from './components/Base8Converter'

function App() {
  return (
    <Grid container spacing={2}>
      <Grid xs={12}>
        <h1>K.OS Number Converter</h1>
      </Grid>
      <Base8Converter />
    </Grid>
  )
}

export default App
