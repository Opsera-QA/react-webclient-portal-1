import React from "react";
import { useParams } from "react-router-dom";
import tagMetadata from "components/settings/tags/tag.metadata";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import TagDetailPanel from "components/settings/tags/details/TagDetailPanel";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import TagSubscriptionIcon from "components/common/icons/subscription/TagSubscriptionIcon";
import TagManagementSubNavigationBar from "components/settings/tags/TagManagementSubNavigationBar";
import useGetTagModelById from "hooks/settings/tags/id/useGetTagModelById";
import useComponentStateReference from "hooks/useComponentStateReference";
import DeleteTagActionBarButton from "components/settings/tags/actions/DeleteTagActionBarButton";

function TagDetailView() {
  const { id } = useParams();
  const {
    accessRoleData,
  } = useComponentStateReference();
  const {
    tagModel,
    setTagModel,
    error,
    isLoading,
    loadData,
  } = useGetTagModelById(id);

  const getActionBar = () => {
    return (
      <ActionBarContainer>
        <div>
          <ActionBarBackButton path={"/settings/tags"}/>
        </div>
        <div className="d-flex">
          <TagSubscriptionIcon
            tagModel={tagModel}
            className={"ml-3"}
          />
          <DeleteTagActionBarButton
            tagModel={tagModel}
            className={"ml-3"}
          />
        </div>
      </ActionBarContainer>
    );
  };

  return (
    <DetailScreenContainer
      breadcrumbDestination={"tagDetailView"}
      metadata={tagMetadata}
      roleRequirement={ROLE_LEVELS.POWER_USERS_AND_SASS}
      accessRoleData={accessRoleData}
      navigationTabContainer={<TagManagementSubNavigationBar activeTab={"tagViewer"} />}
      dataObject={tagModel}
      isLoading={isLoading}
      actionBar={getActionBar()}
      detailPanel={<TagDetailPanel setTagData={setTagModel} tagData={tagModel} accessRoleData={accessRoleData} />}
    />
  );
}

export default TagDetailView;