import React, {useState, useEffect, useContext, useRef} from "react";
import { AuthContext } from "contexts/AuthContext";
import Model from "core/data_model/model";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import {DialogToastContext} from "contexts/DialogToastContext";
import tagFilterMetadata from "components/settings/tags/tag-filter-metadata";
import adminTagsActions from "components/settings/tags/admin-tags-actions";
import TagsTable from "components/settings/tags/TagsTable";
import {meetsRequirements, ROLE_LEVELS} from "components/common/helpers/role-helpers";
import TagManagementSubNavigationBar from "components/settings/tags/TagManagementSubNavigationBar";
import useComponentStateReference from "hooks/useComponentStateReference";
import { TagListModel } from "components/settings/tags/tag.list.model";

function TagManagement() {
  const authContext = useContext(AuthContext);
  const { getUserRecord, getAccessToken, setAccessRoles } = authContext;
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [tagListModel, setTagListModel] = useState(undefined);
  const toastContext = useContext(DialogToastContext);
  const [tagFilterDto, setTagFilterDto] = useState(new Model({...tagFilterMetadata.newObjectFields}, tagFilterMetadata, false));
  const componentStateReference = useComponentStateReference();
  const {isMounted, cancelTokenSource} = componentStateReference;

  useEffect(() => {
    const newTagListModel = new TagListModel(authContext, setTagListModel);
    loadData(tagFilterDto, newTagListModel).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      tagListModel?.unsubscribe();
    };
  }, []);

  const loadData = async (filterDto = tagFilterDto, newTagListModel = tagListModel) => {
    try {
      setIsLoading(true);
      await getRoles(filterDto, newTagListModel);
    }
    catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true ) {
        setIsLoading(false);
      }
    }
  };

  const getTags = async (filterDto = tagFilterDto, newTagListModel = tagListModel) => {
    const response = await adminTagsActions.getTags(
      getAccessToken,
      cancelTokenSource,
      filterDto,
    );
    const tagList = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(tagList)) {
      newTagListModel.setDataArray(tagList);
      filterDto.setData("totalCount", response?.data?.count);
      filterDto.setData("activeFilters", filterDto?.getActiveFilters());
      setTagFilterDto({...filterDto});
      setTagListModel({...newTagListModel});
      newTagListModel.subscribe();
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
        tagListModel={tagListModel}
        tagFilterDto={tagFilterDto}
        setTagFilterDto={setTagFilterDto}
      />
    </ScreenContainer>
  );
}

export default TagManagement;