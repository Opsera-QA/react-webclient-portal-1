import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "contexts/AuthContext";

import LoadingDialog from "components/common/status_notifications/loading";
import Model from "core/data_model/model";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import {DialogToastContext} from "contexts/DialogToastContext";
import tagFilterMetadata from "components/settings/tags/tag-filter-metadata";
import adminTagsActions from "components/settings/tags/admin-tags-actions";
import TagsTable from "components/settings/tags/TagsTable";

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
    setTagList(response?.data?.data);
    let newFilterDto = filterDto;
    newFilterDto.setData("totalCount", response.data.count);
    newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
    setTagFilterDto({...newFilterDto});
  };

  const getRoles = async (filterDto = tagFilterDto) => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      if (userRoleAccess?.PowerUser || userRoleAccess?.Administrator || userRoleAccess?.OpseraAdministrator) {
        await getTags(filterDto);
      }
    }
  };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"tagManagement"}
      isLoading={isLoading}
      accessDenied={!accessRoleData.PowerUser && !accessRoleData.Administrator && !accessRoleData.OpseraAdministrator}
    >
      <TagsTable
        loadData={loadData}
        isLoading={isLoading}
        data={tagList}
        tagFilterDto={tagFilterDto}
        setTagFilterDto={setTagFilterDto}
      />
    </ScreenContainer>
  );

}


export default TagManagement;