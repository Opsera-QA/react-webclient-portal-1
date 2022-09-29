import React from "react";
import { useParams } from "react-router-dom";
import ToolDetailPanel from "components/inventory/tools/details/panel/ToolDetailPanel";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import ActionBarDeleteToolButton from "components/common/actions/buttons/tool/ActionBarDeleteToolButton";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import ActionBarTransferToolButton from "components/common/actions/buttons/tool/ActionBarTransferToolButton";
import InventorySubNavigationBar from "components/inventory/InventorySubNavigationBar";
import ToolDetailHelpDocumentation from "../../../common/help/documentation/tool_registry/ToolDetailHelpDocumentation";
import useHeaderNavigationBarReference from "hooks/useHeaderNavigationBarReference";
import FreeTrialLandingHeaderNavigationBar from "components/trial/landing/FreeTrialLandingHeaderNavigationBar";
import registryToolMetadata from "@opsera/definitions/constants/registry/tools/registryTool.metadata";
import useGetRegistryToolModelById from "components/inventory/tools/hooks/useGetRegistryToolModelById";
import RegistryToolViewJsonActionBarButton
  from "components/inventory/tools/details/json/RegistryToolViewJsonActionBarButton";

function ToolDetailView() {
  useHeaderNavigationBarReference(<FreeTrialLandingHeaderNavigationBar currentScreen={"workspace"} />);
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
          <ActionBarDeleteToolButton
            className={"ml-3"}
            toolModel={toolModel}I
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