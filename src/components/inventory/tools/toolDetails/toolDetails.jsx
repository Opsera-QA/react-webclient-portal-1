import React, { useContext, useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import { axiosApiService } from "api/apiService";
import Loading from "../../../common/loading";
import ToolSummary from "./toolDetailsSummary";
import ToolConfiguration from "./toolDetailsConfiguration";
import ToolLogs from "./toolDetailsLogs";
import PipelineActions from "../../../workflow/actions";

const INITIAL_FORM = {
  name: "",
  description: "",
  tool_identifier: "", 
  tool_type_identifier: "",  //please make sure this value gets set based on the user's drop down selection for Tool.  The user should not be allowed to directly set this value.
  contacts: [],
  projects: [],
  applications: [],
  location: [], 
  organization: {},
  external_reference: [],
  tags: [],  //["tag1","tag2","tag3"]
  roles: [], //what user or group has access to: read, write, edit, delete
  configuration: {},
  licensing: [], 
  compliance: [],
  active: true,
  status: ""
};


function ToolDetails(props) {
  const { toolId, fnEditTool } = props;  
  const { getAccessToken } = useContext(AuthContext);
  const [toolData, setToolData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const handleClose = () => props.closeModal(false);
  const [activeTab, setActiveTab] = useState("summary");
  

  useEffect(() => {    
    console.log("toolId ", toolId);
    setToolData(INITIAL_FORM);
    if (toolId) {
      getToolRegistryItem(toolId);   
    }    
  }, [toolId]);


  const getToolRegistryItem = async (id) => {
    setIsLoading(true);
    try {
      const accessToken = await getAccessToken();
      let apiUrl =  "/registry/" + id;
      const response = await axiosApiService(accessToken).get(apiUrl, {});
      const tool = response.data && response.data.length > 0 ? response.data[0] : {};
      console.log(tool);
      setToolData(tool);
    }
    catch (err) {
      setErrors(err.message);
      console.log(err.message);
    }
    setIsLoading(false);
  };

  //function shared to all children to save the tool.  children must pass the full tool object back to it
  const updateTool = async (tool) => {
    setIsSaving(true);
    const accessToken = await getAccessToken();
    const apiUrl = `/registry/${tool._id}/update`;   
    try {
      console.log("tool to save: ", tool);
      console.log("apiUrl: ", apiUrl);
      await axiosApiService(accessToken).post(apiUrl, tool);

      //saving successful so revert UI to initial view
      setActiveTab("summary");
    }
    catch (err) {
      console.log(err.message);
      setErrors(err.message);
    }
    setIsSaving(false);    
  };


  const saveToVault = async (postBody) => {
    // console.log("saving to vault: ", postBody);
    const response = await PipelineActions.saveToVault(postBody, getAccessToken);  
    return response;
  };

  return (
    <>
      <Modal size="lg" show={props.showModal} onHide={handleClose} className="tool-details-modal">       
        {Object.keys(toolData).length > 0 && (<Modal.Header closeButton>
          <Modal.Title className="upper-case-first">{toolData.name}</Modal.Title>
        </Modal.Header>)}
        <Modal.Body>

          {errors ? <div className="error-text">Error Reported: {errors}</div> : null}
          {isLoading ? <Loading size="sm" /> : null}

          {Object.keys(toolData).length > 0 && !isLoading && (
            <>
              <Button variant={activeTab === "summary" ? "primary" : "link"} onClick={() => setActiveTab("summary")}>Summary</Button>              
              <Button variant={activeTab === "configuration" ? "primary" : "link"} onClick={() => setActiveTab("configuration")}>Configuration</Button>
              <Button variant={activeTab === "logs" ? "primary" : "link"} onClick={() => setActiveTab("logs")}>Logs</Button>

              {toolData && toolId && !isLoading ? <>
                {activeTab === "summary" ? <ToolSummary toolData={toolData} toolId={toolId} fnSaveChanges={updateTool} fnEditTool={fnEditTool} /> : null}
                {activeTab === "configuration" ? <ToolConfiguration toolData={toolData} toolId={toolId} fnSaveChanges={updateTool} fnSaveToVault={saveToVault} /> : null}
                {activeTab === "logs" ? <ToolLogs toolData={toolData} toolId={toolId} /> : null}
              </> : null }
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

ToolDetails.propTypes = {
  showModal: PropTypes.bool,
  type: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  toolId: PropTypes.string,
  fnEditTool: PropTypes.func
};


export default ToolDetails;
