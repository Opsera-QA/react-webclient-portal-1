import React, { useContext, useState, useEffect } from "react";
import { Button, ButtonGroup, Modal, ButtonToolbar, Popover, OverlayTrigger } from "react-bootstrap";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "contexts/AuthContext";
import { axiosApiService } from "api/apiService";
import ToolSummary from "./toolDetailsSummary";
import ToolConfiguration from "./toolDetailsConfiguration";
import ToolLogs from "./toolDetailsLogs";
import ToolJobs from "./toolJobs";
import PipelineActions from "../../../workflow/actions";
import ToolPropertiesForm from "../newTool/toolPropertiesForm";
import LoadingDialog from "components/common/loading";

const INITIAL_FORM = {
  name: "",
  description: "",
  tool_identifier: "", 
  tool_type_identifier: "",  //please make sure this value gets set based on the user's drop down selection for Tool.  The user should not be allowed to directly set this value.
  contacts: [],
  projects: [],
  applications: [],
  location: [], 
  organization: [],
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
  const { toolId, fnEditTool, fnDeleteTool, setToolId, closeModal } = props;  
  const { getAccessToken, getUserRecord } = useContext(AuthContext);
  const [toolData, setToolData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [token, setToken] = useState("");
  const handleClose = () => closeModal(false);
  const [activeTab, setActiveTab] = useState("summary");
  

  useEffect(() => {
    setToolData(INITIAL_FORM);
    if (toolId) {      
      getToolRegistryItem(toolId); 
      setActiveTab("summary");
    } else {
      //this is a new entry so load up as nwe
      setActiveTab("new");
    }
    
  }, [toolId]); 

  const getToolRegistryItem = async (id) => {
    setIsLoading(true);
    try {
      const accessToken = await getAccessToken();
      setToken(accessToken);
      let apiUrl =  "/registry/" + id;
      const ssoUsersRecord = await getUserRecord();
      const response = await axiosApiService(accessToken).get(apiUrl, {});
      const tool = response.data && response.data.length > 0 ? response.data[0] : {};
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
    }
  };

  //function shared to all children to save the tool.  children must pass the full tool object back to it
  const updateTool = async (tool) => {
    const accessToken = await getAccessToken();
    const apiUrl = `/registry/${tool._id}/update`;   
    try {
      await axiosApiService(accessToken).post(apiUrl, tool);
      setActiveTab("summary");
    }
    catch (err) {
      console.log(err.message);
      setErrors(err.message);
    }  
  };


  const saveToVault = async (postBody) => {
    const response = await PipelineActions.saveToVault(postBody, getAccessToken);  
    return response;
  };

  const editTool = () => {
    setActiveTab("edit");
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Content>
        All unsaved changes will be lost
      </Popover.Content>
    </Popover>
  );

  return (
    <>
      <Modal size="lg" show={props.showModal} onHide={handleClose} className="tool-details-modal" id="dataManagerModal">       
        {Object.keys(toolData).length > 0 && (<Modal.Header closeButton>
          <Modal.Title className="upper-case-first">{toolData.name} {toolData.name != null && toolData.active ? "(Active)" : "(Disabled)"}</Modal.Title>
        </Modal.Header>)}
        <Modal.Body>

          {isLoading && <LoadingDialog size="sm" />}
          {errors && <div className="error-text ml-3">Error Reported: {errors}</div>}

          {Object.keys(toolData).length > 0 && !isLoading && (
            <>
              <div>
                <ButtonToolbar className="justify-content-between my-2 ml-2 mr-2">
                  <ButtonGroup>
                    
                    {(activeTab !== "edit" && activeTab !== "new") ?
                      <Button size="sm" className="ml-2 mr-2" variant={activeTab === "summary" ? "primary" : "secondary"} onClick={() => setActiveTab("summary")}>Summary</Button> : 
                      <>
                        {activeTab === "edit" && <Button size="sm" className="ml-2 mr-2" variant="success" onClick={() => setActiveTab("edit")}>Edit Tool</Button> }
                        {activeTab === "new" && <Button size="sm" className="ml-2 mr-2" variant="success" onClick={() => setActiveTab("new")}>New Tool</Button> }
                      </>}

                    <Button size="sm" disabled={activeTab === "new" || activeTab === "edit"} className="mr-2" variant={activeTab === "connections" ? "primary" : "secondary"} onClick={() => setActiveTab("connections")}>Connections</Button>
                    <Button size="sm" disabled={activeTab === "new" || activeTab === "edit"} className="mr-2" variant={activeTab === "jobs" ? "primary" : "secondary"} onClick={() => setActiveTab("jobs")}>Jobs</Button>
                    <Button size="sm" disabled={activeTab === "new" || activeTab === "edit"} className="mr-2" variant={activeTab === "logs" ? "primary" : "secondary"} onClick={() => setActiveTab("logs")}>Logs</Button>
                  </ButtonGroup>
                  <ButtonGroup>
                    <Button size="sm" className="float-right mr-1" variant="secondary" 
                      onClick= {() => { editTool(); }} disabled={activeTab !== "summary"}>
                      <FontAwesomeIcon icon={faPen} fixedWidth /> 
                    </Button>
                    <Button size="sm" className="float-right mr-2" variant={canDelete ? "outline-danger" : "outline-secondary"}
                      onClick= {() => { fnDeleteTool(toolId, toolData); }} disabled={(!canDelete || activeTab !== "summary")}>
                      <FontAwesomeIcon icon={faTrash} fixedWidth />
                    </Button>
                  </ButtonGroup>
                </ButtonToolbar>
              </div>
              
              {toolId ? <>
                {activeTab === "summary" && <ToolSummary toolData={toolData} toolId={toolId} fnSaveChanges={updateTool} fnEditTool={fnEditTool} />}
                {activeTab === "edit" && <ToolPropertiesForm type={activeTab} toolData={toolData} toolId={toolId} accessToken={token} setActiveTab={setActiveTab} getToolRegistryItem={getToolRegistryItem} />}
                {activeTab === "connections" && <ToolConfiguration toolData={toolData} toolId={toolId} fnSaveChanges={updateTool} fnSaveToVault={saveToVault} />}
                {activeTab === "jobs" && <ToolJobs toolData={toolData} toolId={toolId} accessToken={token}  />}
                {activeTab === "logs" && <ToolLogs toolData={toolData} toolId={toolId} accessToken={token}  />}
              </> : <>
                {activeTab === "new" && <ToolPropertiesForm type={activeTab} toolId={toolId} accessToken={token} setActiveTab={setActiveTab} getToolRegistryItem={getToolRegistryItem} setToolId={setToolId} closeModal={closeModal} />}
              </>
              }              
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <OverlayTrigger trigger={["hover", "hover"]} placement="top" overlay={popover}>
            <Button size="sm" variant="secondary" onClick={handleClose}>Close</Button>
          </OverlayTrigger>
        </Modal.Footer>
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
  fnDeleteTool: PropTypes.func,
  setToolId: PropTypes.func
};


export default ToolDetails;
