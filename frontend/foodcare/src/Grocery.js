/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';
import apple from './assets/pineapple.jpg';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import dash from './assets/threelines.webp';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import AssessmentIcon from '@mui/icons-material/Assessment';
import StarIcon from '@mui/icons-material/Star';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import DashboardIcon from '@mui/icons-material/Dashboard';
import RestaurantIcon from '@mui/icons-material/Restaurant';

function createData(
  name: string,
  Quantity: string,
) {
  return { name,Quantity};
}

const rows = [
  createData('Rice',"50Kg"),
  createData('Mushroom',"30Kg" ),
  createData('Wheat_Flour',"50Kg" ),
  createData('Oil',"30l"),
  createData('Salt',"10Kg"),
  createData('Maggi',"100 packets"),
  createData('Ghee',"25l"),
  createData('Coriander',"10Kg" ),
  createData('Tomato',"40Kg"),
]

const initialRows = [...rows];

const Grocery = () => {

  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [openAddDish, setOpenAddDish] = React.useState(false);
  const [rows, setRows] = React.useState(initialRows);
  const [newDishIngredients, setNewDishIngredients] = React.useState({});
  const navigate = useNavigate();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenDrawer(newOpen);
  };
  const handleNavigate = (destination: string) => {
    navigate(destination);
  };

  const handleAddDish = () => {
    setOpenAddDish(true);
  };
  
  const handleCloseAddDish = () => {
    setOpenAddDish(false);
  };

  const handleSave = () => {
    
    const newDish = {
      name: 'New Dish',
      ...newDishIngredients,
    };

    setRows((prevRows) => [...prevRows, newDish]);
    setNewDishIngredients({}); // Reset newDishIngredients
    setOpenAddDish(false);
  };

  const handleIngredientChange = (ingredient, value) => {
    setNewDishIngredients((prevIngredients) => ({
      ...prevIngredients,
      [ingredient]: value,
    }));
  };

  const DrawerList = (
    <Box style={{paddingTop:"30px"}} sx={{ width: 300 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {[
          { text: 'Dashboard', destination: '/Dashboard'},
          { text: 'Grocery Purchase', destination: '/Grocery' },
          { text: 'Ingredients Management', destination: '/ingredients' },
          { text: 'Menu Planning', destination: '/menu' },
          { text: 'Sales Information', destination: '/sales' },
          { text: 'Waste Management', destination: '/waste' },
          { text: 'Optimization Suggestions', destination: '/optimization' },
          { text: 'Reports', destination: '/reports' }

        ].map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => handleNavigate(item.destination)}>
              <ListItemIcon>
              {
                index === 0 ? <DashboardIcon />:
                index === 1 ? <RestaurantIcon/>:
                index === 2 ? <RestaurantMenuIcon />:
                index === 3 ? <MenuBookIcon /> :
                index === 4 ? <ReceiptIcon /> :
                index === 5 ? <CleaningServicesIcon />:
                index === 6 ? <StarIcon /> :
                index === 7 ? <AssessmentIcon /> :
                null
              }
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {[
          { text: 'Settings', destination: '/Settings' },
          { text: 'Logout', destination: '/Home' }
          ].map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => handleNavigate(item.destination)}>
              <ListItemIcon>
                {index % 2 === 0 ? <SettingsIcon /> : <LogoutIcon />}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return(
    <div>

      <div>
        <img className="sidea" style={{position:"relative",right:"5px"}} src={apple} alt="Pineapple" />
        <img src={dash} alt="dashboard" style={{width:"40px",paddingRight:"10px",marginLeft:"5px",position:"relative",cursor:"pointer",top:"60px",right:"65px"}} onClick={toggleDrawer(true)}></img>
        <h1 id="z" >Grocery Purchase</h1>
        <AddIcon style={{float:"right",position:"relative",bottom:"60px",cursor:"pointer",right:"210px"}} onClick={handleAddDish} />
        <h2 style={{float:"right",position:"relative",bottom:"83px",right:"10px",cursor:"pointer"}} onClick={handleAddDish} >Add Ingredient</h2>
        <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
          {DrawerList}
      </Drawer>
      </div>

      <div className='table' style={{position:"relative",bottom:"50px"}}>
        <TableContainer component={Paper}>
          <Table style={{backgroundColor:"#fbf8e6",width:"800px",position:"relative",left:"450px"}} sx={{ minWidth: 800 }} aria-label="simple table">
            <TableHead>
              <TableRow style={{backgroundColor:"#8e844e"}}>
                <TableCell>Ingredient</TableCell>
                <TableCell align="right">Quantity(Kg/l)</TableCell>
              </TableRow>
            </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
               key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.Quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>

      <Dialog open={openAddDish} onClose={handleCloseAddDish}>
        <DialogTitle>Add New Dish</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Ingredient Name"
            fullWidth
            onChange={(e) => handleIngredientChange('name', e.target.value)}
          />
          <TextField
            margin="dense"
            label="Quantity in Kg/l"
            fullWidth
            onChange={(e) => handleIngredientChange('Quantity', e.target.value)}
          />

        </DialogContent>
        <DialogActions>
          <button onClick={handleCloseAddDish}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </DialogActions>
      </Dialog>

    </div>
  );
};

export default Grocery;