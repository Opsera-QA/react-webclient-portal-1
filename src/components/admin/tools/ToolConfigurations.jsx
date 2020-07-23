import React, { useState, useEffect, useContext, useMemo } from "react";
import { Button, Tabs, Tab } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext"; 
import { axiosApiService } from "api/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Loading from "components/common/loading";
import ErrorDialog from "components/common/error";
import { Link } from "react-router-dom";

import ToolTypeTable from "./toolType/ToolTypeTable";
import ToolTypeModal from "./toolType/ToolTypeModal";

import ToolIdentifierTable from "./toolIdentifier/ToolIdentifierTable";
import ToolIdentifierModal from "./toolIdentifier/ToolIdentifierModal";
import Modal from "../../common/modal";

function ToolConfigurationsAdmin() {
  const { getUserRecord, getAccessToken } = useContext(AuthContext);
  const [ isAdminCheck, setAdminStatus] = useState(false);
  const [ pageLoading, setPageLoading ] = useState(true);

  const [isToolTypeLoading, setToolTypeLoading] = useState(true);
  const [isToolIdentifierLoading, setToolIdentifierLoading] = useState(true);

  const [toolTypeList, setToolTypeList] = useState([]);
  const [toolIdentifierList, setToolIdentifierList] = useState([]);

  const [showToolTypeModal, toggleToolTypeModal] = useState(false);
  const [showToolIdentifierModal, toggleToolIdentiferModal] = useState(false);
  const [showToolTypeDeleteModal, setShowToolTypeDeleteModal] = useState(false);
  const [showToolIdentifierDeleteModal, setShowToolIdentifierDeleteModal] = useState(false);

  const [modalType, setModalType] = useState("View");
  const [toolId, setToolId] = useState("");
  const [toolData, setToolData] = useState({});

  useEffect(() => {  
    isAdmin();
    getToolType();
    getToolIdentifier();
  }, []);

  //ToolType
  const getToolType = async () => {
    try {
      const accessToken = await getAccessToken();
      const tool_type = await axiosApiService(accessToken).get("/registry/types?hidden=true", {});
      setToolTypeList(tool_type.data);
      setToolTypeLoading(false);
    }
    catch (err) {
      console.log(err.message);
    }
  };

  //ToolIdentifier
  const getToolIdentifier = async () => {
    try {
      const accessToken = await getAccessToken();
      const tool_identifier  = await axiosApiService(accessToken).get("/registry/tools?hidden=true", {});
      setToolIdentifierList(tool_identifier.data);
      setToolIdentifierLoading(false);
    }
    catch (err) {
      console.log(err.message);
    }
  };

  const newToolType = () => {
    setModalType("New");
    toggleToolTypeModal(true);
  };

  const newToolIdentifer = () => {
    setModalType("New");
    toggleToolIdentiferModal(true);
  };

  const selectedRow = (rowData, type) => {
    setToolData(rowData.original);
    setToolId(rowData.original._id);
    setModalType("View");
    if(type == "tool_type") {
      toggleToolTypeModal(true);
    }else {
      toggleToolIdentiferModal(true);
    }
  };

  const closeToolType = (toggleModal) => {
    getToolType();
    toggleToolTypeModal(toggleModal);
  };

  const closeToolIdentifier = (toggleModal) => {
    getToolIdentifier();
    toggleToolIdentiferModal(toggleModal);
  };

  const isAdmin = async () => {
    const userInfo = await getUserRecord();
    if (!userInfo.groups.includes("Admin")) {
      //move out
      setAdminStatus(false);
    } else {
      //do nothing
      setAdminStatus(true);
    }
    setPageLoading(false);
  };

  const handleDeleteClick = (location, toolData) => {
    
    //If we create and immediately edit, we need to get toolData from the respective Modal
    if(toolData !== undefined) setToolData(toolData);
    
    if (location === "toolType") {
      setShowToolTypeDeleteModal(true);
    }
    else {
      setShowToolIdentifierDeleteModal(true);
    }
  };


  const deleteToolIdentifier = async () => {
    try {
      const accessToken = await getAccessToken();
      const response = await axiosApiService(accessToken).delete("/registry/tool/"+ toolData._id, { });
      console.log(response.data);
      toggleToolIdentiferModal(false);
    }
    catch (err) {
      console.log(err.message);
    }
  };

  const deleteToolType = async () => {
    try {
      const accessToken = await getAccessToken();
      const response = await axiosApiService(accessToken).delete("/registry/type/"+ toolData._id, { });
      console.log(response.data);
      toggleToolTypeModal(false);
    }
    catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div> 

      {/* <h4>Administration Tools</h4> */}
      
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb" style={{ backgroundColor: "#fafafb" }}>
          <li className="breadcrumb-item">
            <Link to="/admin">Admin</Link>
          </li>
          <li className="breadcrumb-item active">Tool Management</li> 
        </ol>
      </nav>  
      
      <h5>Tool Management</h5>
      <br />

      {pageLoading ? <Loading size="sm" /> : null} 
      {(!isAdminCheck && !pageLoading)&& <ErrorDialog error={"You do not have access to view this page!"} />}
      {isAdminCheck && 

          <div className="default-custom-tabs">
            <Tabs defaultActiveKey="toolType" className="default-custom-tabs" id="uncontrolled-tab-example">
              <Tab eventKey="toolType" title="Tool Type">
                <div className="tabbed-content-block">
                  <div className="my-1 text-right">
                    <Button variant="primary" size="sm"  
                      onClick={() => { newToolType(); }}> 
                      <FontAwesomeIcon icon={faPlus} className="mr-1"/> New Tool Type
                    </Button>
                    <br />
                  </div>

                  {isToolTypeLoading ? <Loading size="sm" /> : null}

                  {!isToolTypeLoading ? <ToolTypeTable selectedRow={rowData => selectedRow(rowData, "tool_type")} data={toolTypeList} /> : null}

                  {showToolTypeModal && <ToolTypeModal 
                    type={modalType}
                    toolId={toolId}
                    toolData={toolData}
                    showModal={showToolTypeModal}
                    handleDeleteClick={handleDeleteClick}
                    closeModal={(toggleModal) => closeToolType(toggleModal)}   /> }

                </div>
              </Tab>

              <Tab eventKey="toolIdentifier" title="Tool Identifier">
                <div className="tabbed-content-block">

                  <div className="my-1 text-right">
                    <Button variant="primary" size="sm"  
                      onClick={() => { newToolIdentifer(); }}> 
                      <FontAwesomeIcon icon={faPlus} className="mr-1"/> New Tool Identifier
                    </Button>
                    <br />
                  </div>

                  {isToolIdentifierLoading ? <Loading size="sm" /> : null}

                  {!isToolIdentifierLoading ? <ToolIdentifierTable selectedRow={rowData => selectedRow(rowData, "tool_identifier")} data={toolIdentifierList} /> : null}     

                  {showToolIdentifierModal && <ToolIdentifierModal 
                    type={modalType}
                    toolId={toolId}
                    toolData={toolData}
                    showModal={showToolIdentifierModal}
                    handleDeleteClick={handleDeleteClick}
                    closeModal={(toggleModal) => closeToolIdentifier(toggleModal)}   /> }

                  {showToolTypeDeleteModal ? <Modal header="Confirm Tool Type Delete"
                    message="Warning! Data cannot be recovered once this tool is deleted. Do you still want to proceed?"
                    button="Confirm"
                    handleCancelModal={() => setShowToolTypeDeleteModal(false)}
                    handleConfirmModal={() => deleteToolType()} /> : null}

                  {showToolIdentifierDeleteModal ? <Modal header="Confirm Tool Idenfitier Delete"
                    message="Warning! Data cannot be recovered once this tool is deleted. Do you still want to proceed?"
                    button="Confirm"
                    handleCancelModal={() => setShowToolIdentifierDeleteModal(false)}
                    handleConfirmModal={() => deleteToolIdentifier()} /> : null}
                </div>
              </Tab>
            </Tabs>
          </div>
      }
    </div>
  );
  

}


export default ToolConfigurationsAdmin;