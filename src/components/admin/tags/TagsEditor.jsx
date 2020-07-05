import React, { useState, useEffect, useContext, useMemo } from "react";
import { Button } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext"; 
import { axiosApiService } from "api/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "components/common/modal";
import Loading from "components/common/loading";
import ErrorDialog from "components/common/error";
import { Link } from "react-router-dom";

import TagsTable from "./TagsTable";
import TagEditorModal from "./TagEditorModal";

function TagsEditor() {
  const { getUserRecord, getAccessToken } = useContext(AuthContext);
  const [ isAdminCheck, setAdminStatus] = useState(false);
  const [ pageLoading, setPageLoading ] = useState(true);
  const [ tagList, setTagList ] = useState([]);
  const [modalType, setModalType] = useState("View");
  const [tagId, setTagId] = useState("");
  const [tagData, setTagData] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showTagModal, setShowTagModal] = useState(false);
  const [canDelete, setCanDelete] = useState(false);

  useEffect(() => {  
    isAdmin();
    getTags();
  }, []);


  //ToolIdentifier
  const getTags = async () => {
    try {
      const accessToken = await getAccessToken();
      const tagListResponse  = await axiosApiService(accessToken).get("/tags?hidden=true", {});
      console.log(tagListResponse.data);
      setTagList(tagListResponse.data);
    }
    catch (err) {
      console.log(err.message);
    }
  };

  const selectedRow = (rowData, type) => {
    setTagData(rowData.original);
    setTagId(rowData.original._id);
    setModalType("View");
    setShowTagModal(true);
  };

  const isAdmin = async () => {
    const userInfo = await getUserRecord();

    if ((tagData && tagData.owner == userInfo._id) || userInfo.email.endsWith("@opsera.io")) {
      setCanDelete(true);
      // setCanEdit(true);
    }

    if (!userInfo.groups.includes("Admin")) {
      //move out
      setAdminStatus(false);
    } else {
      //do nothing
      setAdminStatus(true);
    }
    setPageLoading(false);
  };

  const handleDeleteClick = (tagId, tagData) => {
    setModalType("delete");
    setTagId(tagId);
    setShowDeleteModal(true);
  };

  const deleteTag = async () => {
    try {
      const accessToken = await getAccessToken();
      const response = await axiosApiService(accessToken).delete("/tags/"+ tagData._id, { });
      console.log(response.data);
      setShowTagModal(false);
    }
    catch (err) {
      console.log(err.message);
    }
  };  

  const closeTagView = (toggleModal) => {
    getTags();
    setShowTagModal(toggleModal);
  };  

  const createTag = () => {
    setModalType("New");
    setShowTagModal(true);
  };

  return (
    <div> 
      <h4>Administration Tools</h4>

      <nav aria-label="breadcrumb">
        <ol className="breadcrumb" style={{ backgroundColor: "#fafafb" }}>
          <li className="breadcrumb-item">
            <Link to="/admin">Admin</Link>
          </li>
          <li className="breadcrumb-item active">Tag Management</li> 
        </ol>
      </nav>     

      <h5>Tag Management</h5>     

      {pageLoading ? <Loading size="sm" /> : null} 
      {(!isAdminCheck && !pageLoading)&& <ErrorDialog error={"You do not have access to view this page!"} />}
      {isAdminCheck && <>
      
        <div className="mt-4 mb-4 text-right">
          <Button variant="primary" size="sm"  
            onClick={() => { createTag(); }}> 
            <FontAwesomeIcon icon={faPlus} className="mr-1"/>New Tag
          </Button>
          <br />
        </div>
      
        <TagsTable selectedRow={rowData => selectedRow(rowData, "tool_type")} data={tagList} />

        {showTagModal && !showDeleteModal && <TagEditorModal 
          type={modalType}
          tagId={tagId}
          tagData={tagData}
          showModal={showTagModal}
          fnDeleteTool={handleDeleteClick} 
          closeModal={(toggleModal) => closeTagView(toggleModal)}   /> }

        {showDeleteModal ? <Modal showModal={showDeleteModal} header="Confirm Tag Delete"
          message="Warning! Data cannot be recovered once the tag is deleted. Do you still want to proceed?"
          button="Confirm"
          handleCancelModal={() => 
          {
            setShowDeleteModal(false);
            setShowTagModal(false);
          }}
          handleConfirmModal={() => deleteTag()} /> : null}       
      
      </>}
      
    </div>
  );
  

}


export default TagsEditor;