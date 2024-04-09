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

const reports = () =>  {
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
      <h1>Reports</h1>
      <br></br>
      <img src={dash} alt="dashboard" style={{width:"40px",paddingBottom:"59px",paddingTop:"10px",paddingRight:"10px",marginLeft:"5px",position:"relative",bottom:"30px",right:"5px",cursor:"pointer",backgroundColor:"white"}} onClick={toggleDrawer(true)}></img>
      </div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}

export default reports;