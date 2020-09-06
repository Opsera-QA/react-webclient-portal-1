import React, { useState, useEffect, useContext, useMemo } from "react";
import { Button } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import TagsTable from "./TagsTable";
import adminTagsActions from "./admin-tags-actions";
import NewTagModal from "./NewTagModal";
import LoadingDialog from "components/common/status_notifications/loading";
import AccessDeniedDialog from "../../common/status_notifications/accessDeniedInfo";
import BreadcrumbTrail from "../../common/navigation/breadcrumbTrail";
import {getLoadingErrorDialog} from "../../common/toasts/toasts";

function TagManagement() {
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [tagList, setTagList] = useState([]);
  const [showTagModal, setShowTagModal] = useState(false);
  const [toast, setToast] = useState({});
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    getRoles();
  };

  const getTags = async () => {
    try {
      const response = await adminTagsActions.getTags(getAccessToken);
      setTagList(response.data);
    } catch (error) {
      let toast = getLoadingErrorDialog(error.message, setShowToast);
      setToast(toast);
      setShowToast(true);
      console.error(error.message);
    }
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
    }

    await getTags();
    setIsLoading(false);
  };

  const createTag = () => {
    setShowTagModal(true);
  };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  } else if (!accessRoleData.PowerUser && !accessRoleData.Administrator && !accessRoleData.OpseraAdministrator) {
    return (<AccessDeniedDialog roleData={accessRoleData}/>);
  } else {

    return (
      <div>
        <BreadcrumbTrail destination={"tagManagement"}/>
        {showToast && toast}
        <div className="justify-content-between mb-1 d-flex">
          <h5>Tag Management</h5>
          <div className="text-right">
            <Button variant="primary" size="sm"
                    onClick={() => {
                      createTag();
                    }}>
              <FontAwesomeIcon icon={faPlus} className="mr-1"/>New Tag
            </Button>
            <br/>
          </div>
        </div>

        <div className="full-height">
          {tagList && <TagsTable isLoading={isLoading} data={tagList}/>}
        </div>
        <NewTagModal showModal={showTagModal} loadData={loadData} setShowModal={setShowTagModal}/>
      </div>
    );
  }

}


export default TagManagement;