import React, { useState, useEffect, useContext, useMemo } from "react";
import { Button } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext"; 
import { axiosApiService } from "api/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimesCircle, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import Loading from "components/common/loading";
import ErrorDialog from "components/common/error";
import { Link } from "react-router-dom";

import TemplatesTable from "./TemplateTable";
import TemplateModal from "./TemplateModal";

function TemplateEditor() {
  const { getUserInfo, getAccessToken } = useContext(AuthContext);
  const [ isAdminCheck, setAdminStatus] = useState(false);
  const [ pageLoading, setPageLoading ] = useState(true);
  const [ templateList, setTemplateList ] = useState([]);
  const [modalType, setModalType] = useState("View");
  const [templateId, setTemplateId] = useState("");
  const [templateData, setTemplateData] = useState({});

  const [showTemplateModal, toggleTemplateModal] = useState(false);

  useEffect(() => {  
    isAdmin();
    getTemplates();
  }, []);


  //ToolIdentifier
  const getTemplates = async () => {
    try {
      const accessToken = await getAccessToken();
      const templateListResponse  = await axiosApiService(accessToken).get("/pipelines/workflows", {});
      console.log(templateListResponse.data);
      setTemplateList(templateListResponse.data);
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
        Header: "Active",
        accessor: "active",
        Cell: (props) => {
          return props.value ?  <FontAwesomeIcon icon={faCheckCircle} className="green ml-3" /> :  <FontAwesomeIcon icon={faTimesCircle} className="red ml-3" />;
        },
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

  const selectedRow = (rowData, type) => {
    setTemplateData(rowData.original);
    setTemplateId(rowData.original._id);
    setModalType("View");
    toggleTemplateModal(true);
  };

  const isAdmin = async () => {
    const userInfo = await getUserInfo();
    if (!userInfo.Groups.includes("Admin")) {
      //move out
      setAdminStatus(false);
    } else {
      //do nothing
      setAdminStatus(true);
    }
    setPageLoading(false);
  };

  const closeTemplateView = (toggleModal) => {
    getTemplates();
    toggleTemplateModal(toggleModal);
  };  

  const createTemplate = () => {
    setModalType("New");
    toggleTemplateModal(true);
  };

  return (
    <div> 

      <h4>Administration Tools</h4>
      
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb" style={{ backgroundColor: "#fafafb" }}>
          <li className="breadcrumb-item">
            <Link to="/admin">Admin</Link>
          </li>
          <li className="breadcrumb-item active">Template Management</li> 
        </ol>
      </nav> 

      <h5>Template Management</h5>
      <br />     

      {pageLoading ? <Loading size="sm" /> : null} 
      {(!isAdminCheck && !pageLoading)&& <ErrorDialog error={"You do not have access to view this page!"} />}
      {isAdminCheck && <>
      
        {/* <div className="mt-4 mb-4 text-right">
          <Button variant="primary" size="sm"  
            onClick={() => { createTemplate(); }}> 
            <FontAwesomeIcon icon={faPlus} className="mr-1"/> New Template
          </Button>
          <br />
        </div> */}
      
        <TemplatesTable selectedRow={rowData => selectedRow(rowData, "tool_type")} columns={columns} data={templateList} />

        {showTemplateModal && <TemplateModal 
          type={modalType}
          templateId={templateId}
          templateData={templateData}
          showModal={showTemplateModal} 
          closeModal={(toggleModal) => closeTemplateView(toggleModal)}   /> }    
      
      </>}
      
    </div>
  );
  

}


export default TemplateEditor;