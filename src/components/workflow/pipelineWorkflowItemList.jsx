import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { SteppedLineTo } from "react-lineto";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faCaretSquareDown, faCaretSquareUp } from "@fortawesome/free-solid-svg-icons";
import PipelineWorkflowItem from "./pipelineWorkflowItem";
import "./workflows.css";


function PipelineWorkflowItemList({ items, lastStep, editWorkflow, pipelineId, accessToken, parentCallbackEditItem, parentHandleViewSourceActivityLog, setStateItems, quietSavePlan, fetchPlan, role }) {
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {    
  }, [items]);
  

  const handleAddStep = async (itemId, index) => {
    console.log("Prior Step ID: ", itemId);
    console.log("Prior Step index: ", index);
    setIsSaving(true);
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
    await quietSavePlan(); 
    await fetchPlan();
    setIsSaving(false);
  };

  const deleteStep = async (index) => {
    setIsSaving(true);
    items.splice(index, 1);
    if (items.length === 0) {
      handleAddStep("", 0);
    } else {
      await quietSavePlan();  
      await fetchPlan();
    }
    setStateItems({ items: items });
    setIsSaving(false);
  };


  const handleMoveStep = async (itemId, index, direction) => {
    console.log("Prior Step ID: ", itemId);
    console.log("Prior Step index: ", index);
        
    if (direction === "up" && index > 0) {
      console.log("Direction: ", direction);
      setIsSaving(true);
      let cutOut = items.splice(index, 1) [0]; 
      items.splice(index-1, 0, cutOut); 
      await quietSavePlan();  
      await fetchPlan();
      setIsSaving(false);
    
    } else if (direction === "down" && index < items.length - 1) {
      console.log("Direction: ", direction);
      setIsSaving(true);
      let cutOut = items.splice(index, 1) [0];
      items.splice(index+1, 0, cutOut); 
      await quietSavePlan();  
      await fetchPlan();
      setIsSaving(false);
    }    
  };

  const setStepStatusClass = (last_step, item) => {
    const item_id = item._id;
    let classString = "step-"+item_id;
    
    if (item.tool === undefined || item.tool.configuration === undefined) {
      //set to warning state
      classString += " workflow-step-warning";
    } else if (!item.active) {
      classString += " workflow-step-disabled";
    } else if (typeof(last_step) !== "undefined") {
      if(typeof(last_step.success) !== "undefined" && last_step.success.step_id === item_id) {
        classString += " workflow-step-success";
      }
      else if(typeof(last_step.running) !== "undefined" && last_step.running.step_id === item_id) {
        if (last_step.running.paused) {
          classString += " workflow-step-warning";
        } else {
          classString += " workflow-step-running";
        }        
      }
      else if(typeof(last_step.failed) !== "undefined" && last_step.failed.step_id === item_id) {
        classString += " workflow-step-failure";
      }
    }

    return classString;
  }; 


  return items.map((item, index) => (
    <div key={index} className={isSaving ? "fa-disabled" : ""}>
      <div className={"mb-1 p-1 workflow-module-container workflow-module-container-width mx-auto " + setStepStatusClass(lastStep, item)}>
        <PipelineWorkflowItem 
          plan={items}
          item={item} 
          index={index}          
          lastStep={lastStep} 
          editWorkflow={editWorkflow} 
          pipelineId={pipelineId} 
          role={role}
          accessToken={accessToken}
          parentCallbackEditItem={parentCallbackEditItem} 
          deleteStep={deleteStep}
          parentHandleViewSourceActivityLog={parentHandleViewSourceActivityLog} />
      </div>

      {editWorkflow ? <>
        <div className={"text-center pb-1 step-plus-"+ index}>    
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip({ message: "Move step" })} >
            <FontAwesomeIcon icon={faCaretSquareUp} size="lg" 
              fixedWidth 
              className={index === 0 ? "fa-disabled" : "pointer dark-grey"} 
              onClick= {() => { handleMoveStep(item._id, index, "up"); }} />
          </OverlayTrigger> 
          
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip({ message: "Add new step" })} >
            <FontAwesomeIcon icon={faPlusSquare} 
              size="lg" 
              fixedWidth 
              className="dark-grey pointer mx-1"
              onClick= {() => { handleAddStep(item._id, index); }} />
          </OverlayTrigger>
          
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip({ message: "Move step" })} >
            <FontAwesomeIcon icon={faCaretSquareDown}  size="lg" 
              fixedWidth 
              className={index === items.length - 1 ? "fa-disabled" : "pointer dark-grey"} 
              onClick= {() => { handleMoveStep(item._id, index, "down"); }} />
          </OverlayTrigger>
        </div>
        <SteppedLineTo from={"step-plus-"+index}to={"step-"+ index} delay={100} orientation="v" borderColor="#0f3e84" borderWidth={2} fromAnchor="bottom" toAnchor="bottom" />
        <div style={{ height: "25px" }} className={"step-"+ index}>&nbsp;</div>
      </>:       
        <>
          <SteppedLineTo from={"step-"+item._id}to={"step-"+ index} delay={100} orientation="v" borderColor="#0f3e84" borderWidth={2} fromAnchor="bottom" toAnchor="bottom" />
          <div style={{ height: "40px" }} className={"step-"+ index}>&nbsp;</div>
        </>
      }
     
    </div>
  ));
}

function renderTooltip(props) {
  const { message } = props;
  return (
    <Tooltip id="button-tooltip" {...props}>
      {message}
    </Tooltip>
  );
}


PipelineWorkflowItemList.propTypes = {
  items: PropTypes.array,
  lastStep: PropTypes.object,
  editWorkflow: PropTypes.bool,
  pipelineId: PropTypes.string,
  accessToken: PropTypes.string,
  parentCallbackEditItem: PropTypes.func,
  parentHandleViewSourceActivityLog: PropTypes.func,
  setStateItems: PropTypes.func,
  quietSavePlan: PropTypes.func,
  fetchPlan: PropTypes.func,
  role: PropTypes.string
};



export default PipelineWorkflowItemList;