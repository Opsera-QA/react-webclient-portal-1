import React from "react";
import OPBlueprint from "./blueprintMain";
import "./logs.css";


function OPBlueprintMain() {
 
  return (
    <div className="mb-3 max-charting-width">
      <div className="mt-2 mb-3"></div>
      <div className="max-content-width">
        <div className="h4 mt-3 mb-4">Pipeline Blueprint</div>
        <p>The Pipeline Blueprint offers an end to end picture of the pipeline run combining logs from all stages under a single pane of glass for clear visibility and effortless debugging.</p>
      </div>
      
      <div className="pr-2 mt-1">
        <OPBlueprint />
      </div>         
    </div>
          
  );
}


export default OPBlueprintMain;
