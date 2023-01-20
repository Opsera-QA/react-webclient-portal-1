import React from "react";
import { useParams } from "react-router-dom";
import ToolDetailPanel from "components/inventory/tools/details/panel/ToolDetailPanel";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import InventorySubNavigationBar from "components/inventory/InventorySubNavigationBar";
import ToolDetailHelpDocumentation from "../../../common/help/documentation/tool_registry/ToolDetailHelpDocumentation";
import registryToolMetadata from "@opsera/definitions/constants/registry/tools/registryTool.metadata";
import useGetRegistryToolModelById from "components/inventory/tools/hooks/useGetRegistryToolModelById";
import RegistryToolViewJsonActionBarButton
  from "components/inventory/tools/details/json/RegistryToolViewJsonActionBarButton";
import ActionBarDeleteToolButton from "components/inventory/tools/action_bar/ActionBarDeleteToolButton";
import ActionBarTransferToolButton from "components/inventory/tools/action_bar/ActionBarTransferToolButton";
import ActionBarViewToolAuditLogsButton from "components/inventory/tools/action_bar/ActionBarViewToolAuditLogsButton";

function ToolDetailView() {
  const { id, tab } = useParams();
  const {
    toolModel,
    setToolModel,
    loadData,
    isLoading,
  } = useGetRegistryToolModelById(id);

  const getActionBar = () => {
    return (
      <ActionBarContainer>
        <div>
          <ActionBarBackButton path={"/inventory/tools"} />
        </div>
        <div className="d-flex">
          <RegistryToolViewJsonActionBarButton
            toolModel={toolModel}
            className={"ml-3"}
          />
          <ActionBarTransferToolButton
            className={"ml-3"}
            toolModel={toolModel}
            loadTool={loadData}
          />
          {/*<ActionBarViewToolAuditLogsButton*/}
          {/*  className={"ml-3"}*/}
          {/*  toolModel={toolModel}*/}
          {/*/>*/}
          <ActionBarDeleteToolButton
            className={"ml-3"}
            toolModel={toolModel}
          />
        </div>
      </ActionBarContainer>
    );
  };

  const getHelpComponent = () => {
    if (toolModel) {
      return (
        <ToolDetailHelpDocumentation
          toolIdentifier={toolModel?.getData("tool_identifier")}
        />
      );
    }
  };

  return (
    <DetailScreenContainer
      navigationTabContainer={<InventorySubNavigationBar currentTab={"toolViewer"} />}
      breadcrumbDestination={"toolDetailView"}
      metadata={registryToolMetadata}
      dataObject={toolModel}
      isLoading={isLoading}
      actionBar={getActionBar()}
      helpComponent={getHelpComponent()}
      detailPanel={
        <ToolDetailPanel
          toolModel={toolModel}
          isLoading={isLoading}
          tab={tab}
          setToolModel={setToolModel}
          loadData={loadData}
        />
      }
    />
  );
}

export default ToolDetailView;