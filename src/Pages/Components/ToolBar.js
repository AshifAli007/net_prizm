import React from 'react';
// import "../Assets/css/Toolbar.css";
import './ToolBar.css';
import NotListedLocationOutlinedIcon from '@mui/icons-material/NotListedLocationOutlined';
import MobileScreenShareIcon from '@mui/icons-material/MobileScreenShare';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SearchIcon from '@mui/icons-material/Search';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faNetworkWired, faCaretDown, faGauge, faLaptop, faBuilding, faArrowDownLeftAndArrowUpRightToCenter } from '@fortawesome/free-solid-svg-icons';
import BrowseGalleryOutlinedIcon from '@mui/icons-material/BrowseGalleryOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
const ToolBar = () => {
    return (
        <>
            <div class="right-sidebar">
                <ul
                    style={{
                        paddingLeft: "0px",
                    }}
                >
                    <div class="tooltip">
                        <li className="icons">
                            <SearchIcon />
                        </li>
                        <span class="tooltiptext">Search </span>
                    </div>
                    <div class="tooltip">
                        <li className="icons">
                            <AddBoxIcon />
                        </li>
                        <span class="tooltiptext">Zoom In</span>
                    </div>
                    <div class="tooltip">
                        <li className="icons">
                            <i class="fa fa-search-minus" aria-hidden="true"></i>
                        </li>
                        <span class="tooltiptext">Zoom Out</span>
                    </div>
                    <div class="tooltip">
                        <li className="icons">
                            <i class="fa fa-arrows-alt"></i>
                        </li>
                        <span class="tooltiptext">maximize</span>
                    </div>
                    <div class="tooltip">
                        <li className="icons">
                            <i class="fa fa-th-large" aria-hidden="true"></i>
                        </li>
                        <span class="tooltiptext">Grid</span>
                    </div>
                    <div class="tooltip">
                        <li className="icons">
                            <i class="fa fa-map-o" aria-hidden="true"></i>
                        </li>
                        <span class="tooltiptext">Map Switch</span>
                    </div>
                    <div class="tooltip">
                        <li className="icons">
                            <i class="fa fa-arrows" aria-hidden="true"></i>
                        </li>
                        <span class="tooltiptext">Up Down</span>
                    </div>
                    <div class="tooltip">
                        <li className="icons">
                            <BrowseGalleryOutlinedIcon />
                        </li>
                        <span class="tooltiptext">Opacity </span>
                    </div>
                    <div class="tooltip">
                        <li className="icons">
                            <i class="fa fa-cube" aria-hidden="true"></i>
                        </li>
                        <span class="tooltiptext">Rotate</span>
                    </div>
                    <div class="tooltip">
                        <li className="icons">
                            <CategoryOutlinedIcon />
                        </li>
                        <span class="tooltiptext">Triangle </span>
                    </div>
                    <div class="tooltip">
                        <li className="icons" draggable="true">
                            <MobileScreenShareIcon />
                        </li>
                        <span class="tooltiptext">UE Drag</span>
                    </div>

                    <div class="tooltip">
                        <li className="icons" draggable="true">
                            <FullscreenIcon />
                        </li>
                        <span class="tooltiptext">Full Screen</span>
                    </div>
                    <div class="tooltip">
                        <li className="icons">
                            <NotListedLocationOutlinedIcon />
                        </li>
                        <span class="tooltiptext">Help</span>
                    </div>
                </ul>
            </div>
        </>
    )
}
export default ToolBar;