/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';
import { useState,useEffect } from 'react';
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
import Axios from 'axios';









const ingredients = () => {

  const [data,setData]=useState([]);
  const [name,setName]=useState("");
  const [rice,setRice]=useState("");
  const [wheat,setWheat]=useState("");
  const [mushroom,setMushroom]=useState("");
  const [oil,setOil]=useState("");
  const [maggi,setMaggi]=useState("");
  const [salt,setSalt]=useState("");
  const [ghee,setGhee]=useState("");
  const [corriander,setCorriander]=useState("");
  const [tomato,setTomato]=useState("");

  async function getData()
  {
    try{
      const result=await Axios.get('http://localhost:5038/api/foodcare/displayDish');
      console.log(result);
      setData(result.data);
    }
    catch(e)
    {
      console.log(e);
    }
  }

useEffect(()=>{
  getData();
},[])

  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [openAddDish, setOpenAddDish] = React.useState(false);
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

  const handleSave = async () => {
    // Save the new dish with its ingredients
    const formData=new FormData();
    formData.append('name',name);
    formData.append('tomato',tomato);
    formData.append('mushroom',mushroom);
    formData.append('rice',rice);
    formData.append('wheat',wheat);
    formData.append('oil',oil);
    formData.append('salt',salt);
    formData.append('corriander',corriander);
    formData.append('maggi',maggi);
    formData.append('ghee',ghee);
    
    try{
      const result=await Axios.post('http://localhost:5038/api/foodcare/addDish',formData,{headers: {
        'Content-Type': 'application/json',
    }});
    console.log(result);
    }
    catch(e)
    {
      console.log(e);
    }

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
        <h1 id="z" >Ingredients</h1>
        <AddIcon style={{float:"right",position:"relative",bottom:"60px",cursor:"pointer",right:"150px"}} onClick={handleAddDish} />
        <h2 style={{float:"right",position:"relative",bottom:"83px",right:"10px",cursor:"pointer"}} onClick={handleAddDish} >Add Dish</h2>
        <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
          {DrawerList}
      </Drawer>
      </div>

      <div className='table' style={{position:"relative",bottom:"50px"}}>
        <TableContainer component={Paper}>
          <Table style={{backgroundColor:"#fbf8e6",width:"1600px"}} sx={{ minWidth: 1500 }} aria-label="simple table">
            <TableHead>
              <TableRow style={{backgroundColor:"#8e844e"}}>
                <TableCell>Food</TableCell>
                <TableCell align="right">Rice(gram)</TableCell>
                <TableCell align="right">Mushroom(gram)</TableCell>
                <TableCell align="right">Wheat Flour(gram)</TableCell>
                <TableCell align="right">Oil(ml)</TableCell>
                <TableCell align="right">Salt(gram)</TableCell>
                <TableCell align="right">Maggi(packet)</TableCell>
                <TableCell align="right">Ghee(ml)</TableCell>
                <TableCell align="right">Coriander(gram)</TableCell>
                <TableCell align="right">Tomato(gram)</TableCell>
              </TableRow>
            </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
               key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.food}
                </TableCell>
                
                <TableCell align="right">{row.rice}</TableCell>
                <TableCell align="right">{row.mushroom}</TableCell>
                <TableCell align="right">{row.wheat}</TableCell>
                <TableCell align="right">{row.Oil}</TableCell>
                <TableCell align="right">{row.salt}</TableCell>
                <TableCell align="right">{row.maggi}</TableCell>
                <TableCell align="right">{row.ghee}</TableCell>
                <TableCell align="right">{row.coriander}</TableCell>
                <TableCell align="right">{row.tomato}</TableCell>
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
            label="Dish Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Rice in grams"
            fullWidth
            value={rice}
            onChange={(e) => setRice(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Mushroom in grams"
            fullWidth
            value={mushroom}
            onChange={(e) => setMushroom(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Wheat Flour in grams"
            fullWidth
            value={wheat}
            onChange={(e) => setWheat(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Oil in ml"
            fullWidth
            value={oil}
            onChange={(e) => setOil(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Salt in grams"
            fullWidth
            value={salt}
            onChange={(e) => setSalt(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Maggi packets"
            fullWidth
            value={maggi}
            onChange={(e) => setMaggi(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Ghee in ml"
            fullWidth
            value={ghee}
            onChange={(e) => setGhee(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Coriander in grams"
            fullWidth
            value={corriander}
            onChange={(e) => setCorriander(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Tomato grams"
            fullWidth
            value={tomato}
            onChange={(e) => setTomato(e.target.value)}
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

export default ingredients;