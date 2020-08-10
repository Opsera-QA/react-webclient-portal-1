import React, { useState, useEffect, useContext } from "react";
import { Tabs, Tab, Button, ButtonToolbar, ButtonGroup } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext";
import { Link, useParams, useHistory } from "react-router-dom";
import { axiosApiService } from "api/apiService";
import ToolSummary from "./toolDetailsSummary";
import ToolConfiguration from "./toolDetailsConfiguration";
import ToolLogs from "./toolDetailsLogs";
import ToolJobs from "./toolJobs";
import ToolPropertiesForm from "../newTool/newToolForm";
import PipelineActions from "components/workflow/actions";
import LoadingDialog from "components/common/loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Modal from "components/common/modal/modal";

function ToolDetailsNew(props) {
  const { id } = useParams();
  let history = useHistory();
  const { toolId, fnEditTool, fnDeleteTool, setToolId, closeModal } = props;
  const [toolData, setToolData] = useState({});
  const [token, setToken] = useState("");
  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [ showDeleteModal, toggeleDeleteModel] = useState(false);

  /* Role based Access Controls */
  const { getAccessToken, getUserRecord, setAccessRoles } = useContext(AuthContext);
  const [customerAccessRules, setCustomerAccessRules] = useState({});

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

  useEffect(() => {
    getToolRegistryItem();
  }, []);

  const getToolRegistryItem = async () => {
    setIsLoading(true);
    try {
      const accessToken = await getAccessToken();
      setToken(accessToken);
      let apiUrl = "/registry/" + id;
      console.log(apiUrl);
      const response = await axiosApiService(accessToken).get(apiUrl, {});
      const tool = response.data && response.data.length > 0 ? response.data[0] : {};
      setToolData(tool);
      setIsLoading(false);
    } catch (err) {
      console.log(err.message);
      setErrors(err.message);
      setIsLoading(false);
    }
  };

  const deleteTool = async () => {
    try {
      const accessToken = await getAccessToken();
      let apiUrl = "/registry/" + id;
      await axiosApiService(accessToken).delete(apiUrl, {});
      history.push(`/inventory/tools`);
    }
    catch (err) {
      console.log(err.message);
    }
  };

  //function shared to all children to save the tool.  children must pass the full tool object back to it
  const updateTool = async (tool) => {
    const accessToken = await getAccessToken();
    const apiUrl = `/registry/${tool._id}/update`;
    try {
      await axiosApiService(accessToken).post(apiUrl, tool);
    } catch (err) {
      console.log(err.message);
    }
  };

  const saveToVault = async (postBody) => {
    const response = await PipelineActions.saveToVault(postBody, getAccessToken);
    return response;
  };

  return (
    <>
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb" style={{ backgroundColor: "#fafafb" }}>
            <li className="breadcrumb-item">
              <Link to="/inventory/tools">Tools</Link>
            </li>
            <li className="breadcrumb-item active">Tool Detail</li>
          </ol>
        </nav>

         {showDeleteModal ? <Modal header="Confirm Delete"
          message="Warning! Data cannot be recovered once a tool is deleted. Do you still want to proceed?"
          button="Confirm"
          handleCancelModal={() => toggeleDeleteModel(false)}
          handleConfirmModal={deleteTool} /> : null}

        <h4>Tool Registry</h4>
        <p>
          The OpsERA Tool Registry allows you to register, track and configure all of the tools in your organization in
          one centralized inventory.
        </p>

        {isLoading && <LoadingDialog size="sm" />}
        {errors && <div className="error-text ml-3">Error Reported: {errors}</div>}

        {!isLoading && (
          <div className="content-container content-card-1 max-content-width ml-2">
            <div className="pt-2 pl-2 content-block-header">
              <h5>Tool Details for {toolData.name}</h5>
            </div>

            <div>
              <div>
                <div>
                  <div className="p-2 d-flex bd-highlight justify-content-end mr-2">
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => {
                        toggeleDeleteModel(true);
                      }}
                      // disabled={!authorizedAction("delete_tool_btn", toolData.owner)}
                    >
                      <FontAwesomeIcon icon={faTrash} fixedWidth />
                    </Button>
                  </div>

                  <ToolSummary toolData={toolData} toolId={id} fnSaveChanges={updateTool} fnEditTool={fnEditTool} />
                </div>
                <div className="default-custom-tabs p-3">
                  <Tabs defaultActiveKey="summary" className="default-custom-tabs" id="uncontrolled-tab-example">
                    <Tab eventKey="summary" title="Summary">
                      <div className="tabbed-content-block">
                        {Object.keys(toolData).length > 0 && (
                          <ToolPropertiesForm
                            type="edit"
                            toolData={toolData}
                            toolId={id}
                            accessToken={token}
                            getToolRegistryItem={getToolRegistryItem}
                          />
                        )}
                      </div>
                    </Tab>
                    <Tab eventKey="connections" title="Connections">
                      <div className="tabbed-content-block">
                        {Object.keys(toolData).length > 0 && (
                          <ToolConfiguration
                            toolData={toolData}
                            toolId={id}
                            fnSaveChanges={updateTool}
                            fnSaveToVault={saveToVault}
                          />
                        )}
                      </div>
                    </Tab>
                    <Tab eventKey="jobs" title="Jobs & Accounts">
                      <div className="tabbed-content-block">
                        {Object.keys(toolData).length > 0 && (
                          <ToolJobs toolData={toolData} toolId={id} accessToken={token} />
                        )}
                      </div>
                    </Tab>
                    <Tab eventKey="logs" title="logs">
                      <div className="tabbed-content-block">
                        {Object.keys(toolData).length > 0 && (
                          <ToolLogs toolData={toolData} toolId={id} accessToken={token} />
                        )}
                      </div>
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </div>
            <div className="content-block-footer" />
          </div>
        )}
      </div>
    </>
  );
}

export default ToolDetailsNew;
