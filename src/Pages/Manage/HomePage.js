import React from 'react';
import './HomePage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faNetworkWired, faBuilding } from '@fortawesome/free-solid-svg-icons';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import NetworkWifiIcon from '@mui/icons-material/NetworkWifi';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import SpeedIcon from '@mui/icons-material/Speed';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItemIcon from '@mui/material/ListItemIcon';
import Map from '../Components/Map';
// import CssBaseline from '@mui/material/CssBaseline';
// import Box from '@mui/material/Box';
// import Container from '@mui/material/Container';
import { Layout, Menu } from 'antd';



const { Header, Content, Footer, Sider } = Layout;
const HomePage = () => {
    const [open, setOpen] = React.useState(true);
    const [open1, setOpen1] = React.useState(true);
    const [open2, setOpen2] = React.useState(true);
    const [open3, setOpen3] = React.useState(true);
    const [open4, setOpen4] = React.useState(true);
    const [open5, setOpen5] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };
    const handleClick1 = () => {
        setOpen1(!open1)
    };
    const handleClick2 = () => {
        setOpen2(!open2)
    };
    const handleClick3 = () => {
        setOpen3(!open3)
    };
    const handleClick4 = () => {
        setOpen4(!open4)
    };
    const handleClick5 = () => {
        setOpen5(!open5)
    };
    return (
        <>
            <Box sx={{ flexGrow: 1 }} >
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <Typography variant="h6" color="inherit" component="div">
                            <img src="image/logo.png" />
                            <FontAwesomeIcon icon={faGlobe} className="map1" />
                            <span className='map2'>Map</span>
                            <FontAwesomeIcon icon={faBuilding} className="building" />
                            <span className='building2'>Building View</span>
                            <FontAwesomeIcon icon={faNetworkWired} className="network1" />
                            <span className='network2'>Networks</span>
                            <div className="dropdown">
                                <button className="angle-down" >
                                    <img src="image/Profile.png" className='profile' />
                                    <i class="fa fa-angle-down" aria-hidden="true"></i>
                                </button>
                                <div class="dropdown-content">
                                    <a href="">Account Setting</a>
                                    <a href="">Help</a>
                                    <a href="">Logout</a>
                                </div>
                            </div>
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer className='sidebar1'
                    variant="permanent"
                    anchor="left">
                    <List
                        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                        component="nav"
                        aria-labelledby="nested-list-subheader" >

                        <ListItemButton onClick={handleClick}>
                            <ListItemIcon className='sidebar-icon'>
                                <CalendarMonthIcon />
                            </ListItemIcon>

                            <ListItemText primary="Calendar" className='c1' />
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding className='l1'>
                                <ListItemButton sx={{ pl: 4 }}>
                                    <ListItemIcon >
                                        <input type="checkbox"></input>
                                    </ListItemIcon >
                                    <ListItemText />
                                    <input type="datetime-local" id="Test_DatetimeLocal" className='cal1' />
                                </ListItemButton>
                            </List>
                        </Collapse>

                        <ListItemButton onClick={handleClick1}>
                            <ListItemIcon>
                                <PersonIcon />
                            </ListItemIcon>
                            <ListItemText primary="User" />
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open1} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding className='l2'>
                                <ListItemButton sx={{ pl: 4 }}>
                                    <ListItemIcon>
                                        <input type="checkbox"></input>
                                    </ListItemIcon>
                                    <ListItemText primary="Single User" />

                                </ListItemButton>

                                <ListItemButton sx={{ pl: 4 }}>
                                    <ListItemIcon>
                                        <input type="checkbox"></input>
                                    </ListItemIcon>
                                    <ListItemText primary="Multi User" />

                                </ListItemButton>
                            </List>
                        </Collapse>

                        <ListItemButton onClick={handleClick2}>
                            <ListItemIcon>
                                <NetworkWifiIcon />
                            </ListItemIcon>
                            <ListItemText primary="Technology" />
                            {open2 ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>

                        <Collapse in={open2} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding className='l3'>
                                <ListItemButton sx={{ pl: 4 }}>
                                    <ListItemIcon>
                                        <input type="checkbox"></input>
                                    </ListItemIcon>
                                    <ListItemText primary="4G" />

                                </ListItemButton>

                                <ListItemButton sx={{ pl: 4 }}>
                                    <ListItemIcon>
                                        <input type="checkbox"></input>
                                    </ListItemIcon>
                                    <ListItemText primary="5G" />

                                </ListItemButton>
                            </List>
                        </Collapse>
                        <ListItemButton onClick={handleClick3}>
                            <ListItemIcon>
                                <DeviceHubIcon />
                            </ListItemIcon>
                            <ListItemText primary="Device Selection" />
                            {open3 ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>

                        <Collapse in={open3} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding className='l4'>
                                <ListItemButton sx={{ pl: 4 }}>
                                    <ListItemIcon>
                                        <input type="checkbox"></input>
                                    </ListItemIcon>
                                    <ListItemText primary="All" />

                                </ListItemButton>

                                <ListItemButton sx={{ pl: 4 }}>
                                    <ListItemIcon>
                                        <input type="checkbox"></input>
                                    </ListItemIcon>
                                    <ListItemText primary="5G gNB" />

                                </ListItemButton>

                                <ListItemButton sx={{ pl: 4 }}>
                                    <ListItemIcon>
                                        <input type="checkbox"></input>
                                    </ListItemIcon>
                                    <ListItemText primary="4G eNB" />

                                </ListItemButton>
                                <ListItemButton sx={{ pl: 4 }}>
                                    <ListItemIcon>
                                        <input type="checkbox"></input>
                                    </ListItemIcon>
                                    <ListItemText primary="UE" />

                                </ListItemButton>
                                <ListItemButton sx={{ pl: 4 }}>
                                    <ListItemIcon>
                                        <input type="checkbox"></input>
                                    </ListItemIcon>
                                    <ListItemText primary="AMF" />

                                </ListItemButton>
                                <ListItemButton sx={{ pl: 4 }}>
                                    <ListItemIcon>
                                        <input type="checkbox"></input>
                                    </ListItemIcon>
                                    <ListItemText primary="PMF" />

                                </ListItemButton>
                            </List>
                        </Collapse>


                        <ListItemButton onClick={handleClick4}>
                            <ListItemIcon>
                                <SpeedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Speed" />

                            {open4 ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open4} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding className='l5'>
                                <ListItemButton sx={{ pl: 4 }}>
                                    <ListItemIcon>
                                        <input type="checkbox"></input>
                                    </ListItemIcon>

                                    <ListItemText primary="UL" />

                                </ListItemButton>

                                <ListItemButton sx={{ pl: 4 }}>
                                    <ListItemIcon>
                                        <input type="checkbox"></input>
                                    </ListItemIcon>
                                    <ListItemText primary="DL" />

                                </ListItemButton>
                            </List>
                        </Collapse>
                        <ListItemButton onClick={handleClick5}>
                            <ListItemIcon>
                                <AddToQueueIcon />
                            </ListItemIcon>
                            <ListItemText primary="Device Name" />
                            {open5 ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                    </List>
                </Drawer>

                <Content
                    style={{
                        margin: '0',
                        overflow: 'initial',
                        height: '84vh'
                    }}
                >
                    <div
                        className="site-layout-background"
                        style={{
                            textAlign: 'center',
                            width: '100%',
                            height: '100%',
                            paddingLeft: '6%'
                        }}
                    >
                        {<Map />}

                    </div>
                </Content>
            </Box>
        </>
    )
};

export default HomePage;