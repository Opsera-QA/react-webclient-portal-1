import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Model from "core/data_model/model";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import toolManagementActions from "components/admin/tools/tool-management-actions";
import toolCategoryMetadata from "components/admin/tools/tool_category/tool-category-metadata";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import ToolCategoryDetailPanel from "components/admin/tools/tool_category/tool_category_detail_view/ToolCategoryDetailPanel";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";

function ToolCategoryDetailView() {
  const {toolTypeId} = useParams();
  const toastContext = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const { getUserRecord, setAccessRoles, getAccessToken } = useContext(AuthContext);
  const [toolCategoryData, setToolCategoryData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getRoles();
    }
    catch (error) {
      if (!error?.error?.message?.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      setIsLoading(false);
    }
  };

  const getToolType = async (toolTypeId) => {
    const response = await toolManagementActions.getToolTypeById(toolTypeId, getAccessToken);
    if (response?.data?.length > 0) {
      setToolCategoryData(new Model(response.data[0], toolCategoryMetadata, false));
    }
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      if (userRoleAccess?.OpseraAdministrator === true) {
        await getToolType(toolTypeId);
      }
    }
  };

  const getActionBar = () => {
    return (
      <ActionBarContainer>
        <div>
          <ActionBarBackButton path={"/admin/tools"} />
        </div>
      </ActionBarContainer>
    );
  };

  return (
    <DetailScreenContainer
      breadcrumbDestination={"toolCategoryDetailView"}
      title={toolCategoryData != null ? `Tool Category Details [${toolCategoryData.getData("name")}]` : undefined}
      metadata={toolCategoryMetadata}
      accessDenied={!accessRoleData?.OpseraAdministrator}
      dataObject={toolCategoryData}
      isLoading={isLoading}
      actionBar={getActionBar()}
      detailPanel={<ToolCategoryDetailPanel toolCategoryData={toolCategoryData} setToolCategoryData={setToolCategoryData}/>}
      />
  );
}

export default ToolCategoryDetailView;