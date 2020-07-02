import React, { useContext, useState, useEffect } from "react";
import { Button, ButtonGroup, Modal, ButtonToolbar } from "react-bootstrap";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "contexts/AuthContext";
import { axiosApiService } from "api/apiService";
import Loading from "../../../common/loading";
import ToolSummary from "./toolDetailsSummary";
import ToolConfiguration from "./toolDetailsConfiguration";
import ToolLogs from "./toolDetailsLogs";
import PipelineActions from "../../../workflow/actions";
import NewTool from "../newTool/newTool";

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
  const { toolId, fnEditTool, fnDeleteTool } = props;  
  const { getAccessToken, getUserRecord } = useContext(AuthContext);
  const [toolData, setToolData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const handleClose = () => props.closeModal(false);
  const [activeTab, setActiveTab] = useState("summary");
  

  useEffect(() => {
    if (toolId) {
      console.log("toolId ", toolId);
      setToolData(INITIAL_FORM);
      getToolRegistryItem(toolId); 
    } 
  }, [toolId]); 

  const getToolRegistryItem = async (id) => {
    setIsLoading(true);
    try {
      const accessToken = await getAccessToken();
      let apiUrl =  "/registry/" + id;
      const ssoUsersRecord = await getUserRecord();
      const response = await axiosApiService(accessToken).get(apiUrl, {});
      const tool = response.data && response.data.length > 0 ? response.data[0] : {};
      console.log(tool);
      setToolAttributes(tool, ssoUsersRecord);
      setToolData(tool);
    }
    catch (err) {
      setErrors(err.message);
      console.log(err.message);
    }
    setIsLoading(false);
  };

  const setToolAttributes = (tool, ssoUsersRecord) => {
    setToolData(tool);

    if ((tool && tool.owner == ssoUsersRecord._id) || ssoUsersRecord.email.endsWith("@opsera.io")) {
      setCanDelete(true);
      // setCanEdit(true);
    }
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
      <Modal size="lg" show={props.showModal && toolId} onHide={handleClose} className="tool-details-modal">       
        {Object.keys(toolData).length > 0 && (<Modal.Header closeButton>
          <Modal.Title className="upper-case-first">{toolData.name} {toolData.name != null && toolData.active ? "(Active)" : "(Disabled)"}</Modal.Title>
        </Modal.Header>)}
        <Modal.Body>

          {/* {errors ? <div className="error-text">Error Reported: {errors}</div> : null} */}
          {/* {isLoading ? <Loading size="sm" /> : null} */}

          {Object.keys(toolData).length > 0 && !isLoading && (
            <>
              <div>
                <ButtonToolbar className="justify-content-between my-2 ml-2 mr-2">
                  <ButtonGroup>
                    <Button size="sm" className="ml-2 mr-2" variant={activeTab === "summary" ? "primary" : "secondary"} onClick={() => setActiveTab("summary")}>Summary</Button>        
                    {/* <Button className="mr-2" variant={activeTab === "edit" ? "primary" : "secondary"} onClick={() => setActiveTab("edit")}>Edit Tool</Button>       */}
                    <Button size="sm" className="mr-2" variant={activeTab === "connections" ? "primary" : "secondary"} onClick={() => setActiveTab("connections")}>Connections</Button>
                    <Button size="sm" className="mr-2" variant={activeTab === "logs" ? "primary" : "secondary"} onClick={() => setActiveTab("logs")}>Logs</Button>
                  </ButtonGroup>
                  <ButtonGroup>
                    <Button size="sm" style={{ float: "right" }} className="pull-right mr-2" variant="info" onClick= {() => { fnEditTool(toolId, toolData); }} >
                      <FontAwesomeIcon icon={faPen} fixedWidth style={{ cursor: "pointer" }} /> Edit Tool
                    </Button>
                    <Button size="sm" disabled={!canDelete} className="pull-right mr-2" variant={canDelete ? "danger" : "secondary"} onClick= {() => { fnDeleteTool(toolId, toolData); }} >
                      <FontAwesomeIcon icon={faTrash} fixedWidth style={{ cursor: "pointer" }} /> Delete Tool
                    </Button>
                  </ButtonGroup>
                </ButtonToolbar>
              </div>
              {errors ? <div className="error-text ml-3">Error Reported: {errors}</div> : null}
              {toolData && toolId && !isLoading ? <>
                {activeTab === "summary" ? <ToolSummary toolData={toolData} toolId={toolId} fnSaveChanges={updateTool} fnEditTool={fnEditTool} /> : null}
                {/* TODO: make edit tab */}
                {/* {activeTab === "edit" ? <ToolEdit toolData={toolData} toolId={toolId} fnSaveChanges={updateTool} /> : null} */}
                {activeTab === "connections" ? <ToolConfiguration toolData={toolData} toolId={toolId} fnSaveChanges={updateTool} fnSaveToVault={saveToVault} /> : null}
                {activeTab === "logs" ? <ToolLogs toolData={toolData} toolId={toolId} /> : null}
              </> : null }              
            </>
          )}
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}

ToolDetails.propTypes = {
  showModal: PropTypes.bool,
  type: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  toolId: PropTypes.string,
  fnEditTool: PropTypes.func,
  fnDeleteTool: PropTypes.func
};


export default ToolDetails;
