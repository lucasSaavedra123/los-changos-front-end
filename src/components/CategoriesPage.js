import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import "../assets/scss/settings.scss"
import Paper from '@mui/material/Paper';
import "../assets/scss/expenseCard.scss"
import Categories from './Categories';

const mdTheme = createTheme();

const CategoriesPage = () => {
  

  return (

    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Categories/>
              </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>



    // <div className="app-container">
    // <div className='buttonContainer'>
    //   {/* <Link className="backArrow" to="/profile/home" style={{ color: "grey"}}><ArrowBackIcon></ArrowBackIcon> </Link> */}
    //   <div className="addCategoryButton" style={ {borderRadius: 5, border: "1px solid #9CE37D", backgroundColor: "black"}} >
    //       <Button className="add-expense-button" style={{color:"white", textDecoration:"none"}} onClick={()=>setOpen(!open)}>
    //         AGREGAR CATEGORIA
    //       </Button>
    //     </div>
    // </div>
    // <Modal open={open} onClose={handleClose} >
    //   <EditCategoryModal handleCloseModal={handleClose} confirmAction={getCategories}/>
    // </Modal>  
    // <div className="movements">
    //     <TableContainer component={Paper}>
    //         <Table >
    //         <TableHead>
    //         <TableRow style={{borderRadius: 5, border: "1px solid #9CE37D",backgroundColor: "black" ,color:'white'}}>Categorias
    //         </TableRow>
    //     </TableHead>
    //     <TableBody>
    //     {categories.map((category) => {
    //         if(category.static === true) {
    //             return(
    //             <TableRow value={category} style={{borderRadius: 5, border: "1px solid #9CE37D",backgroundColor: "black" }}>
    //             <ExpenseCategory name={category.name} id={category.id} icon={category.material_ui_icon_name} color={'white'}/>
    //             </TableRow>
    //             )}
    //         else{
    //             return(
    //             <TableRow value={category} style={{borderRadius: 5, border: "1px solid #9CE37D",backgroundColor: "black" }}>
    //             <ExpenseDynamicCategory title={category.name} id={category.id} icon={category.material_ui_icon_name} color={'white'} confirmAction={()=>{getCategories();}}/>
    //             </TableRow>
    //             )}
    //         })}   

    //     </TableBody>
    //   </Table>
    // </TableContainer>
    //     </div>
    // </div>




  );

}

export default CategoriesPage