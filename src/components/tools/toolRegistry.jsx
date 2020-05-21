import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import ToolList from "./toolList";
import NewTool from "./newTool";


function ToolRegistry () {
  const [selection, setSelection] = useState("tools");
 

  const handleActionClick = action => {
    setSelection(action);     
  };

  return (
    <div className="mt-1 max-content-width">
    
      
      <div className="mt-2 mb-2 max-content-module-width-50 text-right">
        { selection !== "add" ? 
          <Button variant="primary" size="sm" type="button"  
            onClick={() => { handleActionClick("add"); }}> 
            <FontAwesomeIcon icon={faPlus} className="mr-1"/> New Entry
          </Button>  : null }

        { selection === "add" ? 
          <Button variant="secondary" size="sm" type="button" className="ml-2"
            onClick={() => { handleActionClick("tools"); }}> 
            <FontAwesomeIcon icon={faTimes} className="mr-1"/> Cancel
          </Button> : null }
      </div>

      { selection === "tools" ? 
        <div className="mt-1">
          <ToolList />
        </div> : null }

      { selection === "add" ? 
        <div className="mt-1">
          <NewTool />
        </div> : null }


      <div className="mt-5 max-content-module-width-50">
        Developing PP55's Tool configurations interface here as well as an open ended UI form to register tools outside of the OpsERA Platform managed tools. 
        This will provide one place to track and configure any tools users will want to leverage for Pipeline or Analytics or simply have awareness of for future use.
      </div>


    </div >
  );  
}


export default ToolRegistry;
