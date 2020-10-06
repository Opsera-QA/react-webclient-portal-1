import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "contexts/AuthContext";

import TagsTable from "./TagsTable";
import adminTagsActions from "./admin-tags-actions";
import LoadingDialog from "components/common/status_notifications/loading";
import AccessDeniedDialog from "../../common/status_notifications/accessDeniedInfo";
import {DialogToastContext} from "../../../contexts/DialogToastContext";
import Model from "../../../core/data_model/model";
import tagFilterMetadata from "./tag-filter-metadata";
import TableScreenContainer from "../../common/panels/table_screen_container/TableScreenContainer";

function TagManagement() {
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [tagList, setTagList] = useState(undefined);
  const toastContext = useContext(DialogToastContext);
  const [tagFilterDto, setTagFilterDto] = useState(new Model({...tagFilterMetadata.newObjectFields}, tagFilterMetadata, false));
  const [activeFilterDto, setActiveFilterDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async (filterDto = tagFilterDto) => {
    try {
      setIsLoading(true);
      await getRoles(filterDto);
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const getTags = async (filterDto = tagFilterDto) => {
    const response = await adminTagsActions.getTags(filterDto, getAccessToken);
    setTagList(response.data.data);
    let newFilterDto = filterDto;
    newFilterDto.setData("totalCount", response.data.count);
    setTagFilterDto({...newFilterDto});
    setActiveFilterDto(newFilterDto.clone());
  };

  const getRoles = async (filterDto = tagFilterDto) => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
    }

    await getTags(filterDto);
  };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  }

  if (!accessRoleData.PowerUser && !accessRoleData.Administrator && !accessRoleData.OpseraAdministrator) {
    return (<AccessDeniedDialog roleData={accessRoleData}/>);
  }

  return (
    <TableScreenContainer
      breadcrumbDestination={"tagManagement"}
      title={"Tag Management"}
      tableComponent={<TagsTable loadData={loadData} isLoading={isLoading} data={tagList} activeTagFilterDto={activeFilterDto} tagFilterDto={tagFilterDto} setTagFilterDto={setTagFilterDto}/>}
    />
  );

}


export default TagManagement;