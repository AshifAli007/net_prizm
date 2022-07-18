import React, { useEffect, useState } from "react";

import "../../Assets/css/ToolBar.css"

const ToolBar = ({ map, google }) => {
  


 
   







    
 
  return (
    <>
     
      <div class="right-sidebar">
        <ul
          style={{
            paddingLeft: "0px",
          }}
        >
          <div class="tooltip">
            <li className="icons" draggable="true">
              <i class="fa-duotone fa-mobile" aria-hidden="true"></i>
            </li>
            <span class="tooltiptext">UE Drag</span>
          </div>

          <div class="tooltip">
            <li className="icon">
             
                <i class="fa fa-search" aria-hidden="true"></i>
             
            </li>
            <span class="tooltiptext">Search</span>
          </div>
          <div class="tooltip">
            <li className="icons">
              <i class="fa fa-search-plus" aria-hidden="true"></i>
            </li>
            <span class="tooltiptext">Max</span>
          </div>
          <div class="tooltip">
            <li className="icons">
              <i class="fa fa-search-minus" aria-hidden="true"></i>
            </li>
            <span class="tooltiptext">Min</span>
          </div>
          <div class="tooltip">
            <li className="icons">
              <i class="fa fa-arrows" aria-hidden="true"></i>
            </li>
            <span class="tooltiptext">Arrow</span>
          </div>
          <div class="tooltip">
            <li className="icons">
              <i class="fa fa-th-large" aria-hidden="true"></i>
            </li>
            <span class="tooltiptext">Tooltip text</span>
          </div>
          <div class="tooltip">
            <li className="icons">
              <i class="fa fa-map-o" aria-hidden="true"></i>
            </li>
            <span class="tooltiptext">Tooltip text</span>
          </div>
          <div class="tooltip">
            <li className="icons">
              <i class="fa fa-cube" aria-hidden="true"></i>
            </li>
            <span class="tooltiptext">Cube</span>
          </div>
          <div class="tooltip">
            <li className="icons">
              <i class="fa fa-question-circle-o" aria-hidden="true"></i>
            </li>
            {/* <span class="tooltiptext">Question Circle</span> */}
          </div>
        </ul>
      </div>

    </>

  );
};

export default ToolBar;
