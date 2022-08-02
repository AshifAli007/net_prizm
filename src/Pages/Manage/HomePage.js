import React from 'react';
import './HomePage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faNetworkWired, faBuilding } from '@fortawesome/free-solid-svg-icons';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
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
import { styled, useTheme } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import GlobalVariable from '../Components/GlobalVariable';


import { Layout, Menu } from 'antd';
import IconButton from '@mui/material/IconButton';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';



const { Header, Content, Footer, Sider } = Layout;


const HomePage = () => {
    const [mainData, setMainData] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const [open4, setOpen4] = React.useState(false);
    const [open5, setOpen5] = React.useState(false);
    function handleClick() {
        setOpen(!open);
    }
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
    const Toggle11 = () => {
        setMainData(!mainData);
        console.log('fgfghgh');
    }
    function buildingView(){
        global.mapBox.setZoom(15);
    };
    function loadMap(){
        global.mapBox.setZoom(8);
    };

    return (
        <>
            <Box sx={{ flexGrow: 1 }} >
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <Typography variant="h6" color="inherit" component="div">
                            <img src="image/logo.png" />
                            <i class="fa fa-bars" aria-hidden="true" onClick={Toggle11} id='hamber1'></i>
                            {/* <button class="buttonTest" onClick={Toggle11}>Toggle</button> */}
                            <FontAwesomeIcon icon={faGlobe} className="map1" onClick={loadMap} />
                            <span className='map2'>Map</span>
                            <FontAwesomeIcon icon={faBuilding} className="building" onClick={buildingView} />
                            <span className='building2'>Building View</span>
                            <FontAwesomeIcon icon={faNetworkWired} className="network1" />
                            <span className='network2'>Networks</span>
                            <div className="dropdown">
                                <button className="angle-down" >
                                    <img src="image/Profile.png" className='profile' />
                                    <i class="fa fa-angle-down" aria-hidden="true" id='down1'></i>
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

                <div className='sidebarr'>
                    <ul className={`menuNav ${mainData ? " showMenu" : ""}`}>

                        <div className='listAll'>
                            <ListItemButton onClick={handleClick} >
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
                                {open1 ? <ExpandLess /> : <ExpandMore />}
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

                            <ListItemButton>
                                <ListItemIcon>
                                    <AddToQueueIcon />
                                </ListItemIcon>
                                <ListItemText primary="Device Name" />
                                {open5 ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>

                        </div>
                    </ul>
                </div>
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
                            marginRight: 2,
                            // paddingRight:'2%',
                            // paddingLeft: '6%'
                        }}
                    >
                        {<Map />}
                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: "center",
                        height: "8vh",
                        // backgroundColor: "RGB(0, 33, 64)",
                        backgroundColor: 'white',
                        color: "Black",
                        fontSize: 16
                    }}
                >
                    Net Prizm UI @2022
                </Footer>
            </Box>
        </>
    )
};

export default HomePage;