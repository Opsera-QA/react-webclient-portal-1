import React, {useEffect} from "react";
import PropTypes from "prop-types";
import ToolRegistryHelpDocumentation
  from "components/common/help/documentation/tool_registry/ToolRegistryHelpDocumentation";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import InventorySubNavigationBar from "components/inventory/InventorySubNavigationBar";
import useGetRegistryTools from "hooks/tools/useGetRegistryTools";
import useComponentStateReference from "hooks/useComponentStateReference";
import useGetPlatformSettingsFeatureFlagByName from "hooks/platform/settings/useGetPlatformSettingsFeatureFlagByName";
import platformSettingFeatureConstants
  from "@opsera/definitions/constants/platform/settings/features/platformSettingFeature.constants";
import CreateToolRegistryWizard from "components/inventory/tools/tool_details/wizards/CreateToolRegistryWizard";
import NewToolOverlay from "components/inventory/tools/create_overlay/NewToolOverlay";
import RegistryToolRoleHelper from "@opsera/know-your-role/roles/registry/tools/registryToolRole.helper";
import InlineToolIdentifierFilter from "components/common/filters/tools/tool_identifier/InlineToolIdentifierFilter";
import RegistryToolCardView from "components/inventory/tools/RegistryToolCardView";
import ToolsTable from "components/inventory/tools/ToolsTable";
import PaginationContainer from "components/common/pagination/PaginationContainer";
import TableCardView from "components/common/table/TableCardView";
import ToolFilterOverlay from "components/inventory/tools/ToolFilterOverlay";

function ToolInventory() {
  const {
    registryTools,
    registryToolFilterModel,
    setRegistryToolFilterModel,
    loadData,
    isLoading,
    error,
  } = useGetRegistryTools();
  const {
    userData,
    toastContext,
  } = useComponentStateReference();
  const getPlatformSettingsFeatureFlagByName = useGetPlatformSettingsFeatureFlagByName(platformSettingFeatureConstants.IN_USE_PLATFORM_SETTING_FEATURE_NAMES.NEXT_GENERATION_WIZARDS_TOGGLE);

  useEffect(() => {}, []);

  const createNewTool = () => {
    if (getPlatformSettingsFeatureFlagByName?.platformSettingsFeatureFlag?.active === true) {
      toastContext.showOverlayPanel(
        <CreateToolRegistryWizard loadData={loadData}/>
      );
    } else {
      toastContext.showOverlayPanel(
        <NewToolOverlay loadData={loadData}/>
      );
    }
  };

  const getCreateNewToolFunction = () => {
    const canCreate = RegistryToolRoleHelper.canCreateRegistryTool(userData);
    if (canCreate === true) {
      return createNewTool;
    }
  };

  const getInlineFilters = () => {
    return (
      <InlineToolIdentifierFilter
        filterModel={registryToolFilterModel}
        setFilterModel={setRegistryToolFilterModel}
        loadData={loadData}
        className={"ml-2"}
        isLoading={isLoading}
      />
    );
  };

  const getCardView = () => {
    return (
      <RegistryToolCardView
        isLoading={isLoading}
        loadData={loadData}
        tools={registryTools}
      />
    );
  };

  const getTableView = () => {
    return (
      <ToolsTable
        isLoading={isLoading || getPlatformSettingsFeatureFlagByName.isLoading}
        loadData={loadData}
        data={registryTools}
      />
    );
  };


  return (
    <ScreenContainer
      navigationTabContainer={<InventorySubNavigationBar currentTab={"tools"} />}
      breadcrumbDestination={"toolRegistry"}
      pageDescription={`
        The Opsera Tool Registry allows you to register, track and configure all of the tools in your organization in
        one centralized location.
      `}
      helpComponent={
        <ToolRegistryHelpDocumentation />
      }
      error={error}
      addRecordFunction={getCreateNewToolFunction()}
      filterModel={registryToolFilterModel}
      setFilterModel={setRegistryToolFilterModel}
      loadDataFunction={loadData}
      filterOverlay={<ToolFilterOverlay loadDataFunction={loadData} toolFilterModel={registryToolFilterModel} />}
      titleActionBar={getInlineFilters()}
    >
      <PaginationContainer
        loadData={loadData}
        isLoading={isLoading}
        filterDto={registryToolFilterModel}
        setFilterDto={setRegistryToolFilterModel}
        data={registryTools}
        nextGeneration={true}
      >
        <TableCardView
          filterModel={registryToolFilterModel}
          data={registryTools}
          isLoading={isLoading}
          cardView={getCardView()}
          tableView={getTableView()}
        />
      </PaginationContainer>
    </ScreenContainer>
  );
}

ToolInventory.propTypes = {
  customerAccessRules: PropTypes.object,
  handleTabClick: PropTypes.func
};

export default ToolInventory;