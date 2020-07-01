import React, { useState, useEffect, useContext, useMemo } from "react";
import { Button, Tabs, Tab } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext"; 
import { axiosApiService } from "api/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import Loading from "components/common/loading";
import ErrorDialog from "components/common/error";
import { Link } from "react-router-dom";

import ToolTypeTable from "./toolType/ToolTypeTable";
import ToolTypeModal from "./toolType/ToolTypeModal";

import ToolIdentifierTable from "./toolIdentifier/ToolIdentifierTable";
import ToolIdentifierModal from "./toolIdentifier/ToolIdentifierModal";

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
      const tool_type = await axiosApiService(accessToken).get("/registry/types", {});
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
      const tool_identifier  = await axiosApiService(accessToken).get("/registry/tools", {});
      setToolIdentifierList(tool_identifier.data);
      setToolIdentifierLoading(false);
    }
    catch (err) {
      console.log(err.message);
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Description",
        accessor: "description",
      },     
      {
        Header: "Created",
        accessor: "createdAt",
        Cell: (props) => {
          return props.value ? format(new Date(props.value), "yyyy-MM-dd") : "";
        },
        class: "no-wrap-inline"
      },
    ],
    []
  );

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

  return (
    <div> 

      <h4>Administration Tools</h4>
      
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

      <Tabs defaultActiveKey="toolType" id="uncontrolled-tab-example">
        <Tab eventKey="toolType" title="Tool Type">

          <div className="mt-4 mb-4 text-right">
            <Button variant="primary" size="sm"  
              onClick={() => { newToolType(); }}> 
              <FontAwesomeIcon icon={faPlus} className="mr-1"/> New Tool Type
            </Button>
            <br />
          </div>

          {isToolTypeLoading ? <Loading size="sm" /> : null} 

          {!isToolTypeLoading ? <ToolTypeTable selectedRow={rowData => selectedRow(rowData, "tool_type")} columns={columns} data={toolTypeList} /> : null}

          {showToolTypeModal && <ToolTypeModal 
            type={modalType}
            toolId={toolId}
            toolData={toolData}
            showModal={showToolTypeModal} 
            closeModal={(toggleModal) => closeToolType(toggleModal)}   /> }

        </Tab>

        <Tab eventKey="toolIdentifier" title="Tool Identifier">

          <div className="mt-4 mb-4 text-right">
            <Button variant="primary" size="sm"  
              onClick={() => { newToolIdentifer(); }}> 
              <FontAwesomeIcon icon={faPlus} className="mr-1"/> New Tool Identifier
            </Button>
            <br />
          </div>

          {isToolIdentifierLoading ? <Loading size="sm" /> : null}

          {!isToolIdentifierLoading ? <ToolIdentifierTable selectedRow={rowData => selectedRow(rowData, "tool_identifier")} columns={columns} data={toolIdentifierList} /> : null}     

          {showToolIdentifierModal && <ToolIdentifierModal 
            type={modalType}
            toolId={toolId}
            toolData={toolData}
            showModal={showToolIdentifierModal} 
            closeModal={(toggleModal) => closeToolIdentifier(toggleModal)}   /> }

        </Tab>
      </Tabs>
      }
    </div>
  );
  

}


export default ToolConfigurationsAdmin;