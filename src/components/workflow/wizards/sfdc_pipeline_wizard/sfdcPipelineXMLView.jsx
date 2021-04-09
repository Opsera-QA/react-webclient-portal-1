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
import LoadingDialog from "components/common/status_notifications/loading";
import sfdcPipelineActions from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-pipeline-actions";

// syntax highlightner
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import xml from "react-syntax-highlighter/dist/esm/languages/hljs/xml";
import docco from "react-syntax-highlighter/dist/esm/styles/hljs/docco";

SyntaxHighlighter.registerLanguage("xml", xml);

const SfdcPipelineXMLView = ({ pipelineId, stepId, handleClose, setXML, setDestructiveXml, isProfiles, setView, xml, destructiveXml, createJenkinsJob, unitTestSteps, gitTaskData, gitTaskId, closePanel }) => {
  const { getAccessToken } = useContext(AuthContext);
  const [save, setSave] = useState(false);
  const toastContext = useContext(DialogToastContext);
  const [loading, setLoading] = useState(false);

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
          toastContext.showInlineErrorMessage("something went wrong! not a valid object");
        }
        setXML(response.data.data.packageXml);
        setDestructiveXml(response.data.data.destructiveXml ? response.data.data.destructiveXml : "");
      } catch (error) {
        console.error("Error getting API Data: ", error);
        toastContext.showInlineErrorMessage(error);
      }
      setLoading(false);
    }
  
    loadInitialData();
  }, []);

  const handleApproveChanges = () => {
    //this needs to do the ifnal work writing data to the stepID above: checked compontents, other job data

    //trigger the jenkins job to create job
    createJenkinsJob();
  };

  return (
    <div>
      <div className="flex-container">
        <div className="flex-container-content">
          <div className="h5">SalesForce Pipeline Run: XML Viewer</div>
          <div className="text-muted mb-2">Please confirm that you want to proceed with this operation.</div>
          <div className="px-2"></div>

          {save && <LoadingDialog />}
          
          {loading ? (
            <LoadingDialog size="sm" />
          ) : (
            <>
            <div className="d-flex w-30 pr-2">
            {loading ? (
              <LoadingDialog size="sm" />
            ) : (
              <>
              {xml && (
                <div className="col-7 mr-1">
                <div className="h6 opsera-secondary">Package XML</div>
                  {/* xml display goes here */}
                  <SyntaxHighlighter language="xml" style={docco}>
                    {xml}
                  </SyntaxHighlighter>
                </div>
                )}
              </>
            )}
            {loading ? (
              <LoadingDialog size="sm" />
            ) : (
              <>
              {destructiveXml && destructiveXml.length > 0 && (
                <div className="col-5 mr-1">
                <div className="h6 opsera-secondary">Destructive Package XML</div>
                  {/* xml display goes here */}
                  <SyntaxHighlighter language="xml" style={docco}>
                    {destructiveXml}
                  </SyntaxHighlighter>
                </div>
                )}
              </>
            )}
            </div>
          </>)}
        </div>
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
            disabled={save}
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
  closePanel: PropTypes.func
};

export default SfdcPipelineXMLView;
