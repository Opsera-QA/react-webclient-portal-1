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
  account: "",
  status: "",
};


function ToolDetails(props) {
  const { toolId, fnEditTool, fnDeleteTool, setToolId, closeModal } = props;
  const { getAccessToken, getUserRecord, featureFlagItemInProd, authState } = useContext(AuthContext);
  const [toolData, setToolData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState("");
  const handleClose = () => closeModal(false);
  const [activeTab, setActiveTab] = useState("summary");

/* Role based Access Controls */
  const [opseraAdministrator, setOpseraAdministrator] = useState(false);
  const [customerAccessRules, setCustomerAccessRules] = useState({});

  async function checkAuthentication() {
    const ssoUsersRecord = await getUserRecord();
    if (ssoUsersRecord && authState.isAuthenticated) {
      const { ldap, groups } = ssoUsersRecord;
      if (groups) {
        setCustomerAccessRules({
          ...customerAccessRules,
          Administrator: groups.includes("Admin"),
          PowerUser: groups.includes("Power User"),
          UserId: ssoUsersRecord._id,
        });
      }
      if (ldap && ldap.domain === "opsera.io") { //checking for OpsERA account domain
        setOpseraAdministrator(groups.includes("Admin"));
      }
    }
  }

  const authorizedAction = (action, owner) => {
    if (customerAccessRules.Administrator) {
      return true; //all actions are authorized to administrrator
    } else if (owner && customerAccessRules.UserId === owner) {
      return true; //owner can do all actions
    } else if (customerAccessRules.PowerUser) {
      switch (action) {
      case "connections_tab":
        return true;
      case "jobs_tab":
        return true;
      default:
        return false; //all other options are disabled
      }
    } else {
      return false;
    }
  };
  /* End Role based Access Controls */


  useEffect(() => {
    initComponent();
  }, [toolId]);


  const initComponent = async () => {
    await checkAuthentication();
    setToolData(INITIAL_FORM);
    if (toolId) {
      await getToolRegistryItem(toolId);
      setActiveTab("summary");
    } else {
      setActiveTab("new");
    }
  };


  const getToolRegistryItem = async (id) => {
    setIsLoading(true);
    try {
      const accessToken = await getAccessToken();
      setToken(accessToken);
      let apiUrl = "/registry/" + id;

      const response = await axiosApiService(accessToken).get(apiUrl, {});
      const tool = response.data && response.data.length > 0 ? response.data[0] : {};
      setToolData(tool);
    } catch (err) {
      setErrors(err.message);
      console.log(err.message);
    }
    setIsLoading(false);
  };


  //function shared to all children to save the tool.  children must pass the full tool object back to it
  const updateTool = async (tool) => {
    const accessToken = await getAccessToken();
    const apiUrl = `/registry/${tool._id}/update`;
    try {
      await axiosApiService(accessToken).post(apiUrl, tool);
      setActiveTab("summary");
    } catch (err) {
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
          <Modal.Title
            className="upper-case-first">{toolData.name} {toolData.name != null && toolData.active ? "(Active)" : "(Disabled)"}</Modal.Title>
        </Modal.Header>)}
        <Modal.Body>

          {isLoading && <LoadingDialog size="sm"/>}
          {errors && <div className="error-text ml-3">Error Reported: {errors}</div>}

          {Object.keys(toolData).length > 0 && !isLoading && (
            <>
              <div>
                <ButtonToolbar className="justify-content-between my-2 ml-2 mr-2">
                  <ButtonGroup>

                    {(activeTab !== "edit" && activeTab !== "new") ?
                      <Button size="sm" className="ml-2 mr-2"
                              variant={activeTab === "summary" ? "primary" : "secondary"}
                              onClick={() => setActiveTab("summary")}>Summary</Button> :
                      <>
                        {activeTab === "edit" &&
                        <Button size="sm" className="ml-2 mr-2" variant="success" onClick={() => setActiveTab("edit")}>Edit
                          Tool</Button>}
                        {activeTab === "new" &&
                        <Button size="sm" className="ml-2 mr-2" variant="success" onClick={() => setActiveTab("new")}>New
                          Tool</Button>}
                      </>}

                    <Button size="sm"
                            disabled={(activeTab === "new" || activeTab === "edit" || !authorizedAction("connections_tab", toolData.owner))}
                            className="mr-2"
                            variant={activeTab === "connections" ? "primary" : "secondary"}
                            onClick={() => setActiveTab("connections")}>Connections</Button>
                    <Button size="sm"
                            disabled={(activeTab === "new" || activeTab === "edit" || !authorizedAction("jobs_tab", toolData.owner))}
                            className="mr-2" variant={activeTab === "jobs" ? "primary" : "secondary"}
                            onClick={() => setActiveTab("jobs")}>Jobs & Accounts</Button>
                    <Button size="sm" disabled={activeTab === "new" || activeTab === "edit"}
                            className="mr-2" variant={activeTab === "logs" ? "primary" : "secondary"}
                            onClick={() => setActiveTab("logs")}>Logs</Button>
                  </ButtonGroup>
                  <ButtonGroup>
                    <Button size="sm" className="float-right mr-1" variant="secondary"
                            onClick={() => {
                              editTool();
                            }}
                            disabled={(activeTab !== "summary" || !authorizedAction("edit_tool_btn", toolData.owner))}>
                      <FontAwesomeIcon icon={faPen} fixedWidth/>
                    </Button>
                    <Button size="sm" className="float-right mr-2"
                            variant="outline-danger"
                            onClick={() => {
                              fnDeleteTool(toolId, toolData);
                            }}
                            disabled={(activeTab !== "summary" || !authorizedAction("delete_tool_btn", toolData.owner))}>
                      <FontAwesomeIcon icon={faTrash} fixedWidth/>
                    </Button>
                  </ButtonGroup>
                </ButtonToolbar>
              </div>

              {toolId ? <>
                {activeTab === "summary" &&
                <ToolSummary toolData={toolData} toolId={toolId} fnSaveChanges={updateTool} fnEditTool={fnEditTool}/>}
                {activeTab === "edit" &&
                <ToolPropertiesForm type={activeTab} toolData={toolData} toolId={toolId} accessToken={token}
                                    setActiveTab={setActiveTab} getToolRegistryItem={getToolRegistryItem}/>}
                {activeTab === "connections" &&
                <ToolConfiguration toolData={toolData} toolId={toolId} fnSaveChanges={updateTool}
                                   fnSaveToVault={saveToVault}/>}
                {activeTab === "jobs" && <ToolJobs toolData={toolData} toolId={toolId} accessToken={token}/>}
                {activeTab === "logs" && <ToolLogs toolData={toolData} toolId={toolId} accessToken={token}/>}
              </> : <>
                {activeTab === "new" &&
                <ToolPropertiesForm type={activeTab} toolId={toolId} accessToken={token} setActiveTab={setActiveTab}
                                    getToolRegistryItem={getToolRegistryItem} setToolId={setToolId}
                                    closeModal={closeModal}/>}
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
  setToolId: PropTypes.func,
};


export default ToolDetails;
