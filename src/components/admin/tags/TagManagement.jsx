import React, { useState, useEffect, useContext, useMemo } from "react";
import { Button } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Loading from "components/common/loading";
import ErrorDialog from "components/common/error";
import { Link } from "react-router-dom";

import TagsTable from "./TagsTable";
import adminTagsActions from "./admin-tags-actions";
import NewTagModal from "./NewTagModal";

function TagManagement() {
  const { getUserRecord, getAccessToken } = useContext(AuthContext);
  const [ isAdminCheck, setAdminStatus] = useState(false);
  const [ pageLoading, setPageLoading ] = useState(true);
  const [ tagList, setTagList ] = useState([]);
  const [showTagModal, setShowTagModal] = useState(false);

  useEffect(() => {  
    isAdmin();
    getTags();
  }, []);

  const getTags = async () => {
    const response = await adminTagsActions.getTags(getAccessToken);
    setTagList(response.data);
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

  const onModalClose = () => {
    getTags();
    setShowTagModal(false);
  };  

  const createTag = () => {
    setShowTagModal(true);
  };

  return (
    <div> 
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb" style={{ backgroundColor: "#fafafb" }}>
          <li className="breadcrumb-item">
            <Link to="/admin">Admin</Link>
          </li>
          <li className="breadcrumb-item active">Tag Management</li> 
        </ol>
      </nav>
      {pageLoading ? <Loading size="sm" /> : null}
      {(!isAdminCheck && !pageLoading) && <ErrorDialog error={"You do not have access to view this page!"} />}
      {isAdminCheck &&
        <>
          <div className="justify-content-between mb-1 d-flex">
            <h5>Tag Management</h5>
            <div className="text-right">
              <Button variant="primary" size="sm"
                onClick={() => { createTag(); }}>
                <FontAwesomeIcon icon={faPlus} className="mr-1"/>New Tag
              </Button>
              <br />
            </div>
          </div>

          <div className="full-height">
            {tagList && <TagsTable data={tagList} />}
          </div>

          {showTagModal ? <NewTagModal
            showModal={showTagModal}
            onModalClose={onModalClose} /> : null }
        </>}
    </div>
  );
  

}


export default TagManagement;