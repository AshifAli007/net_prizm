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