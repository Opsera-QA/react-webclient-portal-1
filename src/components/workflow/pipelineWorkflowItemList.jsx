import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { SteppedLineTo } from "react-lineto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import PipelineWorkflowItem from "./pipelineWorkflowItem";
import "./workflows.css";


function PipelineWorkflowItemList({ items, lastStep, nextStep, editWorkflow, pipelineId, parentCallbackEditItem, parentCallbackRefreshItems, parentHandleViewSourceActivityLog, setStateItems }) {
  
  useEffect(() => {    
  }, [items]);
  
  const callbackFunction = (param) => {
    parentCallbackEditItem(param);
  };

  const handleAddStep = (itemId, index) => {
    console.log("Prior Step ID: ", itemId);
    console.log("Prior Step index: ", index);
    //TODO: based on index value, add blank step template to the next index value (index+1)

    const newStep = {
      "trigger": [],
      "type": [],
      "notification": [],
      "name": "",
      "description": "",
      "active": true
    };
    items.splice(index + 1, 0, newStep);
    setStateItems({ items: items });

    console.log("items: ", items);
  };

  const handleDeleteStep = (itemId, index) => {
    console.log("Step ID: ", itemId);
    console.log("Step index: ", index);
    
    items.splice(index, 1);
    setStateItems({ items: items });

    console.log("items: ", items);
  };

  const setStepStatusClass = (last_step, item_id) => {
    let classString = "step-"+item_id;
    
    if (typeof(last_step) !== "undefined") {
      if(typeof(last_step.success) !== "undefined" && last_step.success.step_id === item_id) {
        classString += " workflow-step-success";
      }
      else if(typeof(last_step.running) !== "undefined" && last_step.running.step_id === item_id) {
        classString += " workflow-step-running";
      }
      else if(typeof(last_step.failed) !== "undefined" && last_step.failed.step_id === item_id) {
        classString += " workflow-step-failure";
      }
    }

    return classString;
  }; 


  return items.map((item, index) => (
    <div key={index}>
      <div className={"workflow-module-container workflow-module-container-width mx-auto " + setStepStatusClass(lastStep, item._id)}>
        <PipelineWorkflowItem 
          item={item} 
          index={index}          
          lastStep={lastStep} 
          editWorkflow={editWorkflow} 
          pipelineId={pipelineId} 
          nextStep={nextStep} 
          parentCallbackEditItem={callbackFunction} 
          parentCallbackDeleteStep={handleDeleteStep}
          parentHandleViewSourceActivityLog={parentHandleViewSourceActivityLog} />
      </div>

      {editWorkflow ? <>
        <div className={"text-center step-plus-"+ index}>        
          <FontAwesomeIcon icon={faPlusSquare} 
            size="lg" 
            fixedWidth 
            className="dark-grey"
            style={{ cursor: "pointer", paddingBottom: "2px" }}
            onClick= {() => { handleAddStep(item._id, index); }} />
        </div>
        <SteppedLineTo from={"step-plus-"+index}to={"step-"+ index} delay={100} orientation="v" borderColor="#226196" borderWidth={2} fromAnchor="bottom" toAnchor="bottom" />
        <div style={{ height: "25px" }} className={"step-"+ index}>&nbsp;</div>
      </>:       
        <>
          <SteppedLineTo from={"step-"+item._id}to={"step-"+ index} delay={100} orientation="v" borderColor="#226196" borderWidth={2} fromAnchor="bottom" toAnchor="bottom" />
          <div style={{ height: "40px" }} className={"step-"+ index}>&nbsp;</div>
        </>
      }
    </div>
  ));
}


PipelineWorkflowItemList.propTypes = {
  items: PropTypes.array,
  lastStep: PropTypes.object,
  nextStep: PropTypes.object,
  editWorkflow: PropTypes.bool,
  pipelineId: PropTypes.string,
  parentCallbackEditItem: PropTypes.func,
  parentCallbackRefreshItems: PropTypes.func,
  parentHandleViewSourceActivityLog: PropTypes.func,
  setStateItems: PropTypes.func
};



export default PipelineWorkflowItemList;