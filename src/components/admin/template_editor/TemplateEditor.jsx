import React, { useState, useEffect, useContext, useMemo } from "react";
import Modal from "components/common/modal";
import { Button } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext";
import { axiosApiService } from "api/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimesCircle, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Loading from "components/common/loading";
import ErrorDialog from "components/common/error";
import { Link } from "react-router-dom";

import TemplatesTable from "./TemplateTable";
import TemplateModal from "./TemplateModal";

function TemplateEditor() {
  const { getUserRecord, getAccessToken } = useContext(AuthContext);
  const [isAdminCheck, setAdminStatus] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [templateList, setTemplateList] = useState([]);
  const [modalType, setModalType] = useState("View");
  const [templateId, setTemplateId] = useState("");
  const [templateData, setTemplateData] = useState({});
  const [showTemplateModal, toggleTemplateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [canDelete, setCanDelete] = useState(true);

  useEffect(() => {
    isAdmin();
    getTemplates();
  }, []);


  //ToolIdentifier
  const getTemplates = async () => {
    try {
      const accessToken = await getAccessToken();
      const templateListResponse = await axiosApiService(accessToken).get("/pipelines/workflows?hidden=true", {});
      console.log(templateListResponse.data);
      setTemplateList(templateListResponse.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const selectedRow = (rowData, type) => {
    setTemplateData(rowData.original);
    setTemplateId(rowData.original._id);
    setModalType("View");
    toggleTemplateModal(true);
  };

  const isAdmin = async () => {
    const userInfo = await getUserRecord();
    console.log(userInfo);
    if (!userInfo.groups.includes("Admin")) {
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

  const deleteTemplate = async () => {
    try {
      const accessToken = await getAccessToken();
      const response = await axiosApiService(accessToken).delete("/pipelines/workflows/" + templateId, {});
      toggleTemplateModal(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDeleteClick = () => {
    // TODO: implement
    // setTemplateId(templateId);
    console.log("in handle delete click");
    setShowDeleteModal(true);
  };

  return (
    <div>
      {/* <h4>Administration Tools</h4> */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb" style={{ backgroundColor: "#fafafb" }}>
          <li className="breadcrumb-item">
            <Link to="/admin">Admin</Link>
          </li>
          <li className="breadcrumb-item active">Template Management</li>
        </ol>
      </nav>

      {pageLoading ? <Loading size="sm"/> : null}
      {(!isAdminCheck && !pageLoading) && <ErrorDialog error={"You do not have access to view this page!"}/>}
      {isAdminCheck &&
      <>
        <div className="justify-content-between mb-1 d-flex">
          <h5>Template Management</h5>
          <div className="text-right">
            <Button variant="primary" size="sm"
              onClick={() => {
                createTemplate();
              }}>
              <FontAwesomeIcon icon={faPlus} className="mr-1"/> New Template
            </Button>
            <br/>
          </div>
        </div>

        <TemplatesTable selectedRow={rowData => selectedRow(rowData, "tool_type")} data={templateList}/>

        {showTemplateModal && <TemplateModal
          type={modalType}
          templateId={templateId}
          data={templateData}
          showModal={showTemplateModal}
          handleDelete={handleDeleteClick}
          closeModal={(toggleModal) => closeTemplateView(toggleModal)}/>}

        {showDeleteModal && <Modal
          showModal={showDeleteModal}
          header="Confirm Template Delete"
          message="Warning! Data cannot be recovered once the template is deleted. Do you still want to proceed?"
          button="Confirm"
          handleCancelModal={() => {
            setShowDeleteModal(false);
          }}
          handleConfirmModal={() => deleteTemplate()}/>}
      </>
      }
    </div>
  );
}

export default TemplateEditor;