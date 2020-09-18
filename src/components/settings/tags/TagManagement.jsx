import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "contexts/AuthContext";

import TagsTable from "./TagsTable";
import adminTagsActions from "./admin-tags-actions";
import LoadingDialog from "components/common/status_notifications/loading";
import AccessDeniedDialog from "../../common/status_notifications/accessDeniedInfo";
import BreadcrumbTrail from "../../common/navigation/breadcrumbTrail";
import {DialogToastContext} from "../../../contexts/DialogToastContext";

function TagManagement() {
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [tagList, setTagList] = useState([]);
  const toastContext = useContext(DialogToastContext);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getRoles();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const getTags = async () => {
    try {
      const response = await adminTagsActions.getTags(getAccessToken);
      setTagList(response.data);
    } catch (error) {
      toastContext.showLoadingErrorDialog(error.message);
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
  };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  }

  if (!accessRoleData.PowerUser && !accessRoleData.Administrator && !accessRoleData.OpseraAdministrator) {
    return (<AccessDeniedDialog roleData={accessRoleData}/>);
  }

  return (
    <div>
      <BreadcrumbTrail destination={"tagManagement"}/>
      <div className="justify-content-between mb-1 d-flex">
        <h5>Tag Management</h5>
      </div>
      <div className="full-height">
        <TagsTable loadData={loadData} isLoading={isLoading} data={tagList}/>
      </div>
    </div>
  );

}


export default TagManagement;