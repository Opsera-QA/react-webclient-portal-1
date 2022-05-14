import React, {useState, useEffect, useContext, useRef} from "react";
import { AuthContext } from "contexts/AuthContext";
import Model from "core/data_model/model";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import {DialogToastContext} from "contexts/DialogToastContext";
import tagFilterMetadata from "components/settings/tags/tag-filter-metadata";
import adminTagsActions from "components/settings/tags/admin-tags-actions";
import TagsTable from "components/settings/tags/TagsTable";
import axios from "axios";
import {meetsRequirements, ROLE_LEVELS} from "components/common/helpers/role-helpers";
import TagManagementSubNavigationBar from "components/settings/tags/TagManagementSubNavigationBar";

function TagManagement() {
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [tagList, setTagList] = useState([]);
  const toastContext = useContext(DialogToastContext);
  const [tagFilterDto, setTagFilterDto] = useState(new Model({...tagFilterMetadata.newObjectFields}, tagFilterMetadata, false));
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(tagFilterDto, source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (filterDto = tagFilterDto, cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getRoles(filterDto, cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true ) {
        setIsLoading(false);
      }
    }
  };

  const getTags = async (filterDto = tagFilterDto, cancelSource = cancelTokenSource) => {
    const response = await adminTagsActions.getTags(getAccessToken, cancelSource, filterDto);
    const tagList = response?.data?.data;

    if (isMounted?.current === true && tagList) {
      setTagList(tagList);
      let newFilterDto = filterDto;
      newFilterDto.setData("totalCount", response?.data?.count);
      newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
      setTagFilterDto({...newFilterDto});
    }
  };

  const getRoles = async (filterDto = tagFilterDto, cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (isMounted?.current === true && userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      if (meetsRequirements(ROLE_LEVELS.POWER_USERS_AND_SASS, userRoleAccess)) {
        await getTags(filterDto, cancelSource);
      }
    }
  };

  return (
    <ScreenContainer
      breadcrumbDestination={"tagManagement"}
      isLoading={!accessRoleData}
      accessRoleData={accessRoleData}
      roleRequirement={ROLE_LEVELS.POWER_USERS_AND_SASS}
      navigationTabContainer={<TagManagementSubNavigationBar activeTab={"tags"} />}
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