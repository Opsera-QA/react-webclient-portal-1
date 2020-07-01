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

  const [showTagModal, toggleTagModal] = useState(false);

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

  const columns = useMemo(
    () => [
      {
        Header: "Key",
        accessor: "key",
      },
      {
        Header: "Value",
        accessor: "value",
      },      
      {
        Header: "Owner",
        accessor: "owner",
      },   
      {
        Header: "Account",
        accessor: "account",
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
    setTagData(rowData.original);
    setTagId(rowData.original._id);
    setModalType("View");
    toggleTagModal(true);
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
  

  const closeTagView = (toggleModal) => {
    getTags();
    toggleTagModal(toggleModal);
  };  

  const createTag = () => {
    setModalType("New");
    toggleTagModal(true);
  };

  return (
    <div> 
      <h4>Tag Management</h4>
      <br />

      <nav aria-label="breadcrumb">
        <ol className="breadcrumb" style={{ backgroundColor: "#fafafb" }}>
          <li className="breadcrumb-item">
            <Link to="/admin">Admin</Link>
          </li>
          <li className="breadcrumb-item active">Tag Management</li> 
        </ol>
      </nav>      

      {pageLoading ? <Loading size="sm" /> : null} 
      {(!isAdminCheck && !pageLoading)&& <ErrorDialog error={"You do not have access to view this page!"} />}
      {isAdminCheck && <>
      
        <div className="mt-4 mb-4 text-right">
          <Button variant="primary" size="sm"  
            onClick={() => { createTag(); }}> 
            <FontAwesomeIcon icon={faPlus} className="mr-1"/> New Tag
          </Button>
          <br />
        </div>
      
        <TagsTable selectedRow={rowData => selectedRow(rowData, "tool_type")} columns={columns} data={tagList} />

        {showTagModal && <TagEditorModal 
          type={modalType}
          tagId={tagId}
          tagData={tagData}
          showModal={showTagModal} 
          closeModal={(toggleModal) => closeTagView(toggleModal)}   /> }      
      
      </>}
      
    </div>
  );
  

}


export default TagsEditor;