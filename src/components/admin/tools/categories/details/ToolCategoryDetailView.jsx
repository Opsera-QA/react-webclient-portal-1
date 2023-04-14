import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import Model from "core/data_model/model";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import ToolCategoryDetailPanel from "components/admin/tools/categories/details/ToolCategoryDetailPanel";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import ActionBarDeleteButton2 from "components/common/actions/buttons/ActionBarDeleteButton2";
import ToolManagementSubNavigationBar from "components/admin/tools/ToolManagementSubNavigationBar";
import {toolCategoryActions} from "components/admin/tools/categories/toolCategory.actions";
import {toolCategoryMetadata} from "components/admin/tools/categories/toolCategory.metadata";
import useComponentStateReference from "hooks/useComponentStateReference";

function ToolCategoryDetailView() {
  const {toolTypeId} = useParams();
  const [toolCategoryData, setToolCategoryData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const {
    getAccessToken,
    isOpseraAdministrator,
    toastContext,
    isMounted,
    cancelTokenSource,
  } = useComponentStateReference();

  useEffect(() => {
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);

  const loadData = async () => {
    try {
      setToolCategoryData(undefined);

      if (isOpseraAdministrator !== true) {
        return;
      }

      setIsLoading(true);
      await getToolType();
    }
    catch (error) {
      if (isMounted?.current === true && !error?.error?.message?.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getToolType = async () => {
    const response = await toolCategoryActions.getToolTypeByIdV2(getAccessToken, cancelTokenSource, toolTypeId);
    const toolType = response?.data?.data;

    if (isMounted?.current === true && toolType) {
      setToolCategoryData(new Model(toolType, toolCategoryMetadata, false));
    }
  };

  const deleteToolCategory = async () => {
    return await toolCategoryActions.deleteToolTypeV2(
      getAccessToken,
      cancelTokenSource,
      toolTypeId,
      );
  };

  const getActionBar = () => {
    return (
      <ActionBarContainer>
        <div>
          <ActionBarBackButton path={"/admin/tools/categories"} />
        </div>
        <div>
        <ActionBarDeleteButton2 dataObject={toolCategoryData} handleDelete={deleteToolCategory} relocationPath={"/admin/tools/categories"} />
        </div>
      </ActionBarContainer>
    );
  };

  const getDetailPanel = () => {
    return (
      <ToolCategoryDetailPanel
        toolCategoryData={toolCategoryData}
        setToolCategoryData={setToolCategoryData}
      />
    );
  };

  if (isOpseraAdministrator !== true) {
    return null;
  }

  return (
    <DetailScreenContainer
      breadcrumbDestination={"toolCategoryDetailView"}
      metadata={toolCategoryMetadata}
      dataObject={toolCategoryData}
      navigationTabContainer={<ToolManagementSubNavigationBar activeTab={"toolCategoryViewer"} />}
      isLoading={isLoading}
      actionBar={getActionBar()}
      detailPanel={getDetailPanel()}
      />
  );
}

export default ToolCategoryDetailView;