import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faSpinner,
  faTimes,
  faStepBackward
} from "@fortawesome/free-solid-svg-icons";
import "../../workflows.css";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import sfdcPipelineActions from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-pipeline-actions";

import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import UnitTestClassesTabView from "./tab_views/UnitTestClassesTabView";
import PackageXMLTabView from "./tab_views/PackageXMLTabView";
import {faCode} from "@fortawesome/pro-light-svg-icons";

const SfdcPipelineXMLView = ({ 
  pipelineId, 
  stepId, 
  handleClose, 
  setXML, 
  setDestructiveXml, 
  isProfiles, 
  setView, 
  xml, 
  destructiveXml, 
  createJenkinsJob, 
  unitTestSteps, 
  gitTaskData, 
  gitTaskId, 
  closePanel,
  fromSFDC, 
  fromDestinationSFDC,
}) => {
  const { getAccessToken } = useContext(AuthContext);
  const [save, setSave] = useState(false);
  const toastContext = useContext(DialogToastContext);
  const [loading, setLoading] = useState(false);
  const [rollBack, setRollBack] = useState(false);
  const [activeTab, setActiveTab] = useState("pxml");

  useEffect(() => {
    async function loadInitialData () {
      setLoading(true);
      try {
        let postBody = {
            "pipelineId": gitTaskData ? "N/A" : pipelineId, 
            "stepId": gitTaskData ? "N/A" : stepId, 
            "dataType": gitTaskData ? "sync-sfdc-repo" : "sfdc-packageXml", 
            "gitTaskId": gitTaskData ? gitTaskId : false,
            "fetchAttribute": "packageXml"
           };
        const response = await sfdcPipelineActions.getListFromPipelineStorage(postBody, "", getAccessToken);
        
        if(!response.data.data || !response.data.data.packageXml) {
          toastContext.showInlineErrorMessage("something went wrong while generating XML.");
        }
        setXML(response.data.data.packageXml);
        setDestructiveXml(response.data.data.destructiveXml ? response.data.data.destructiveXml : "");
        setRollBack(response?.data?.data?.selectedFileList  && response?.data?.data?.selectedFileList.length === 0 ? true : false);
      } catch (error) {
        console.error("Error getting API Data: ", error);
        toastContext.showInlineErrorMessage(error);
      }
      setLoading(false);
    }
  
    loadInitialData();
  }, []);

  const handleTabClick = (tabSelection) => e => {    
    e.preventDefault();
    setActiveTab(tabSelection);        
  };

  const handleApproveChanges = () => {
    //this needs to do the ifnal work writing data to the stepID above: checked compontents, other job data

    //trigger the jenkins job to create job
    createJenkinsJob();
  };

  const getView = () => {
    if (activeTab === "pxml") {
      return (
        <PackageXMLTabView 
          loading={loading}
          save={save}
          xml={xml}
          rollBack={rollBack}
          destructiveXml={destructiveXml}
        />
      );
    } else if (activeTab === "utc") {
      return (
        <UnitTestClassesTabView
          pipelineId={pipelineId}
          stepId={stepId}
          unitTestSteps={unitTestSteps}
          fromSFDC={fromSFDC}
          fromDestinationSFDC={fromDestinationSFDC}
        />
      );
    }
  };

  return (
    <div>
      <div className="flex-container">
        { unitTestSteps.length > 0 && <CustomTabContainer>            
          <CustomTab activeTab={activeTab} tabText={"Package XML"} handleTabClick={handleTabClick} tabName={"pxml"}
                    toolTipText={"Package XML"} icon={faCheck} />
          <CustomTab activeTab={activeTab} tabText={"Unit Test Classes"} handleTabClick={handleTabClick} tabName={"utc"}
                    toolTipText={"Unit Test Classes"} icon={faCode} />
        </CustomTabContainer>}
        {getView()}        
        <div className="flex-container-bottom pr-2 mt-3 mb-2 text-right">
          <Button
            variant="secondary"
            size="sm"
            className="mr-2"
            onClick={() => {
              if(isProfiles){
                setView(3);
                return;
              }
              if(unitTestSteps.length > 0) {
                setView(5);
                return;
              } 
              setView(2);
              return;
            }}
          >
            <FontAwesomeIcon icon={faStepBackward} fixedWidth className="mr-1" />
            Back
          </Button>

          <Button
            variant="success"
            size="sm"
            onClick={() => {
              setSave(true);
              handleApproveChanges();
            }}
            disabled={save || (rollBack && destructiveXml.length === 0) }
          >
            {save ? (
              <FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth />
            ) : (
              <FontAwesomeIcon icon={faCheck} fixedWidth className="mr-1" />
            )}
            Proceed
          </Button>

          <Button
            variant="outline-secondary"
            size="sm"
            className="ml-2"
            onClick={() => {
              if(gitTaskData) {
                closePanel();
                return;
              }
              handleClose();
            }}
          >
            <FontAwesomeIcon icon={faTimes} fixedWidth className="mr-1" />
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

SfdcPipelineXMLView.propTypes = {
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  setView: PropTypes.func,
  isProfiles: PropTypes.bool,
  setXML: PropTypes.func,
  setDestructiveXml: PropTypes.func,
  handleClose: PropTypes.func,
  xml: PropTypes.string,
  destructiveXml: PropTypes.string,
  createJenkinsJob: PropTypes.func,
  unitTestSteps: PropTypes.array,
  gitTaskData: PropTypes.object,
  gitTaskId: PropTypes.string,
  closePanel: PropTypes.func,
  fromSFDC: PropTypes.bool,
  fromDestinationSFDC: PropTypes.bool,
};

export default SfdcPipelineXMLView;
