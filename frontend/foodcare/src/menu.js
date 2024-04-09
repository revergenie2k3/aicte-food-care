/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import apple from './assets/pineapple.jpg';
import dash from './assets/threelines.webp';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import AssessmentIcon from '@mui/icons-material/Assessment';
import StarIcon from '@mui/icons-material/Star';
import DashboardIcon from '@mui/icons-material/Dashboard';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

interface Column {
  id: 'name'  | 'bf_Dish_1' | 'bf_Dish_2' | 'bf_Dish_3' | 'lunch_Dish_1' | 'lunch_Dish_2' | 'lunch_Dish_3' | 'dinner_Dish_1' | 'dinner_Dish_2' | 'dinner_Dish_3';
  label: string;
  minWidth?: number;
  format?: (value: number) => string;
}

const columns: Column[] = [
  { 
    id: 'name', 
    label: '', 
    minWidth: 111 
  },
  {
    id: 'bf_Dish_1',
    label: 'Dish 1',
    minWidth: 140,
  },
  {
    id: 'bf_Dish_2',
    label: 'Dish 2',
    minWidth: 140,
  },
  {
    id: 'bf_Dish_3',
    label: 'Dish 3',
    minWidth: 140,
  },
  {
    id: 'lunch_Dish_1',
    label: 'Dish 1',
    minWidth: 140,
  },
  {
    id: 'lunch_Dish_2',
    label: 'Dish 2',
    minWidth: 140,
  },
  {
    id: 'lunch_Dish_3',
    label: 'Dish 3',
    minWidth: 140,
  },
  {
    id: 'dinner_Dish_1',
    label: 'Dish 1',
    minWidth: 140,
  },
  {
    id: 'dinner_Dish_2',
    label: 'Dish 2',
    minWidth: 140,
  },
  {
    id: 'dinner_Dish_3',
    label: 'Dish 3',
    minWidth: 140,
  },
];

interface Data {
  name: string;
  bf_Dish_1: string;
  bf_Dish_2: string;
  bf_Dish_3: string;
  lunch_Dish_1: string;
  lunch_Dish_2: string;
  lunch_Dish_3: string;
  dinner_Dish_1: string;
  dinner_Dish_2: string;
  dinner_Dish_3: number;
  
}

function createData(
  name: string,
  bf_Dish_1: string = '',
  bf_Dish_2: string = '',
  bf_Dish_3: string = '',
  lunch_Dish_1: string = '',
  lunch_Dish_2: string = '',
  lunch_Dish_3: string = '',
  dinner_Dish_1: string = '',
  dinner_Dish_2: string = '',
  dinner_Dish_3: string = '',
): Data {
  return  { name, bf_Dish_1, bf_Dish_2, bf_Dish_3, lunch_Dish_1, lunch_Dish_2, lunch_Dish_3, dinner_Dish_1, dinner_Dish_2, dinner_Dish_3 }; 
}

const rows = [
  createData(
    'Monday', 
    'Pongal', 'Ghee Dosa', 'Appam', 
    'Tomato Rice', 'Chappati & Gravy', 'Ghee Rice',           
    'Maggi', 'Mushroom Roast', 'Fried Vermicilli'                
  ),
  createData(
    'Tuesday', 
    'Pongal', 'Mushroom Roast', 'Appam', 
    'Tomato Rice', 'Poori', 'Ghee Rice',           
    'Maggi', 'Mushroom Roast', 'Chappati & Gravy' 
  ),
  createData(
    'Wednesday', 
    'Ghee Dosa', 'Maggi', 'Egg Whites', 
    'Tomato Rice', 'Parotta & Gravy', 'Ghee Rice',           
    'Idly', 'Mushroom Roast', 'Poori' 
  ),
  createData(
    'Thursday', 
    'Pongal', 'Ghee Dosa', 'Appam', 
    'Tomato Rice', 'Chappati & Gravy', 'Tomato Rice',           
    'Maggi', 'Mushroom Roast', 'Fried Vermicilli' 
  ),
  createData(
    'Friday', 
    'Pongal', 'Ghee Dosa', 'Appam', 
    'Tomato Rice', 'Parotta & Gravy', 'Ghee Rice',           
    'Ghee Rice', 'Mushroom Roast', 'Fried Vermicilli'  
  ),
  createData(
    'Saturday',
    'Pongal', 'Ghee Rice', 'Appam', 
    'Tomato Rice', 'Chappati & Gravy', 'Ghee Rice',           
    'Maggi', 'Mushroom Roast', 'Fried Vermicilli' 
  ),
  createData(
    'Sunday', 
    'Pongal', 'Ghee Dosa', 'Appam', 
    'Tomato Rice', 'Parotta & Gravy', 'Ghee Rice',           
    'Maggi', 'Mushroom Roast', 'Fried Vermicilli' 
  ),
];



const menu = () =>  {


  


  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  
  const handleNavigate = (destination: string) => {
    navigate(destination);
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

  return (
    <div>
      <div >
      <img className="sidea"  src={apple} alt="pineapple" ></img> 
      <h1>Weekly Menu</h1>
      <br></br>
      <img src={dash} alt="dashboard" style={{width:"40px",paddingBottom:"59px",paddingTop:"10px",paddingRight:"10px",marginLeft:"5px",position:"relative",bottom:"30px",right:"5px",cursor:"pointer",backgroundColor:"white"}} onClick={toggleDrawer(true)}></img>
      </div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>

      <Paper sx={{ width: '100%' }} style={{backgroundColor:"#fbf8e6"}} >   
      <TableContainer sx={{ maxHeight: 550 }}   >
        <Table stickyHeader aria-label="sticky table" >
          <TableHead >
            <TableRow >
              <TableCell  colSpan={1} style={{backgroundColor:"#8e844e"}}>
                  name
              </TableCell>

              <TableCell style={{backgroundColor:"#8e844e",textAlign:"center"}}  colSpan={3} >
                Breakfast
              </TableCell>

              <TableCell style={{backgroundColor:"#8e844e",textAlign:"center"}} colSpan={3} >
                Lunch
              </TableCell>

              <TableCell style={{backgroundColor:"#8e844e",textAlign:"center"}} colSpan={3} >
                Dinner
              </TableCell>


            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      
    </Paper>
    </div>
  );
}

export default menu;