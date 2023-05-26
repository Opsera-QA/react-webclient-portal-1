import React, {useState, useEffect} from "react";
import Model from "core/data_model/model";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import tagFilterMetadata from "components/settings/tags/tag-filter-metadata";
import adminTagsActions from "components/settings/tags/admin-tags-actions";
import TagsTable from "components/settings/tags/TagsTable";
import TagManagementSubNavigationBar from "components/settings/tags/TagManagementSubNavigationBar";
import useComponentStateReference from "hooks/useComponentStateReference";
import TagRoleHelper from "@opsera/know-your-role/roles/settings/tags/tagRole.helper";

function TagManagement() {
  const [isLoading, setIsLoading] = useState(true);
  const [tagList, setTagList] = useState([]);
  const [tagFilterDto, setTagFilterDto] = useState(new Model({...tagFilterMetadata.newObjectFields}, tagFilterMetadata, false));
  const {
    userData,
    accessRoleData,
    getAccessToken,
    cancelTokenSource,
    isMounted,
    toastContext,
  } = useComponentStateReference();

  useEffect(() => {
    toastContext.showInformationToast("Test", undefined, undefined, "/workflow?activeFilters=&sortOption=last-updated&pageSize=25&currentPage=1&viewType=card");
    loadData(tagFilterDto).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);

  const loadData = async (filterDto = tagFilterDto) => {
    try {
      setTagList([]);

      if (TagRoleHelper.canGetTags(userData) === true) {
        setIsLoading(true);
        await getTags(filterDto);
      }
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

  const getTags = async (filterDto = tagFilterDto) => {
    const response = await adminTagsActions.getTags(
      getAccessToken,
      cancelTokenSource,
      filterDto,
    );
    const tagList = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(tagList)) {
      setTagList(tagList);
      filterDto.setData("totalCount", response?.data?.count);
      filterDto.setData("activeFilters", filterDto?.getActiveFilters());
      setTagFilterDto({...filterDto});
    }
  };

  return (
    <ScreenContainer
      breadcrumbDestination={"tagManagement"}
      isLoading={!accessRoleData}
      accessRoleData={accessRoleData}
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