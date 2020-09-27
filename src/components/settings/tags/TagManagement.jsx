import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "contexts/AuthContext";

import TagsTable from "./TagsTable";
import adminTagsActions from "./admin-tags-actions";
import LoadingDialog from "components/common/status_notifications/loading";
import AccessDeniedDialog from "../../common/status_notifications/accessDeniedInfo";
import BreadcrumbTrail from "../../common/navigation/breadcrumbTrail";
import {DialogToastContext} from "../../../contexts/DialogToastContext";
import Model from "../../../core/data_model/model";
import tagFilterMetadata from "./tag-filter-metadata";

function TagManagement() {
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [tagList, setTagList] = useState(undefined);
  const toastContext = useContext(DialogToastContext);
  const [tagFilterDto, setTagFilterDto] = useState(new Model({...tagFilterMetadata.newObjectFields}, tagFilterMetadata, false));

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
      const response = await adminTagsActions.getTags(tagFilterDto, getAccessToken);
      setTagList(response.data.data);
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

  // TODO: Determine best way to deal with this-- might be best to put in FilterBar
  const resetFilters = async () => {
    try {
      setIsLoading(true);
      let newFilterDto = new Model({...tagFilterDto.getNewObjectFields()}, tagFilterDto.getMetaData(), false);
      // TODO: Enable this when wiring up pagination
      // Make sure to keep any relevant pagination-- but always reset current page to 1 as the filters have changed
      // let pageSize = filterDto.getData("pageSize");
      // newFilterDto.setData("pageSize", pageSize);
      setTagFilterDto(newFilterDto);
      const response = await adminTagsActions.getTags(newFilterDto, getAccessToken);
      setTagList(response.data.data);
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
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
        <TagsTable loadData={loadData} isLoading={isLoading} data={tagList} resetFilters={resetFilters} tagFilterDto={tagFilterDto} setTagFilterDto={setTagFilterDto}/>
      </div>
    </div>
  );

}


export default TagManagement;