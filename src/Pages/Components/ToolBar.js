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
                        <img src="image/search-normal.svg" />
                        </li>
                        <span class="tooltiptext">Search </span>
                    </div>
                    <div class="tooltip">
                        <li className="icons">
                        <img src="image/search-zoom-in.svg" />
                        </li>
                        <span class="tooltiptext">Zoom In</span>
                    </div>
                    <div class="tooltip">
                        <li className="icons">
                        <img src="image/search-zoom-out.svg" />
                        </li>
                        <span class="tooltiptext">Zoom Out</span>
                    </div>
                    <div class="tooltip">
                        <li className="icons">
                        <img src="image/maximize.svg" />
                        </li>
                        <span class="tooltiptext">maximize</span>
                    </div>
                    <div class="tooltip">
                        <li className="icons">
                        <img src="image1/grid.svg" />
                        </li>
                        <span class="tooltiptext">Grid</span>
                    </div>
                    {/* <div class="tooltip">
                        <li >
                            <i class="fa fa-map-o" aria-hidden="true"></i>
                        </li>
                        <span class="tooltiptext">Map Switch</span>
                    </div>  */}
                     <div class="tooltip">
                        <li className="icons">
                        <img src="image1/arrow-3.svg" />
                        </li>
                        <span class="tooltiptext">Up Down</span>
                    </div>
                    <div class="tooltip">
                        <li className="icons">
                        <img src="image/Opacity.svg" />
                        </li>
                        <span class="tooltiptext">Opacity </span>
                    </div>
                    <div class="tooltip">
                        <li className="icons">
                        <img src="image/3d-rotate.svg" />
                        </li>
                        <span class="tooltiptext">Rotate</span>
                    </div>
                    <div class="tooltip">
                        <li className="icons">
                        <img src="image/shape.svg" />
                        </li>
                        <span class="tooltiptext">Triangle </span>
                    </div>
                    <div class="tooltip">
                        <li className="icons" draggable="true">
                        <img src="image/mobile.svg" />
                        </li>
                        <span class="tooltiptext">UE Drag</span>
                    </div>

                    <div class="tooltip">
                        <li className="icons" draggable="true">
                        <img src="image1/mail.svg" />   
                        </li>
                        <span class="tooltiptext">Mail</span>
                    </div>
                    <div class="tooltip">
                        <li className="icons">
                        <img src="image/help-icon.svg" />   
                        </li>
                        <span class="tooltiptext">Help</span>
                    </div>
                </ul>
            </div>
        </>
    )
}
export default ToolBar;
