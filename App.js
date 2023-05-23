import './App.css';
import Main from './components/Main';
import Grid from '@mui/material/Grid';

function App() {
  return (
    <div className="App">
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ margin: '1%' }}
        >
          <Grid style={{ maxWidth: '300px' }}>
            <Main />
          </Grid>
        </Grid>
    </div>
  );
}

export default App;
