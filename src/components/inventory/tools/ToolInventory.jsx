import React, {useEffect, useState} from "react";
import toolsActions from "components/inventory/tools/tools-actions";
import PropTypes from "prop-types";
import ToolTableCardView from "components/inventory/tools/ToolTableCardView";
import ToolRegistryHelpDocumentation
  from "components/common/help/documentation/tool_registry/ToolRegistryHelpDocumentation";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import InventorySubNavigationBar from "components/inventory/InventorySubNavigationBar";
import ToolFilterModel from "components/inventory/tools/tool.filter.model";
import useComponentStateReference from "hooks/useComponentStateReference";
import RegistryToolRoleHelper from "@opsera/know-your-role/roles/registry/tools/registryToolRole.helper";

function ToolInventory() {
  const [isLoading, setLoading] = useState(false);
  const [toolRegistryList, setToolRegistryList] = useState([]);
  const [toolFilterModel, setToolFilterModel] = useState(new ToolFilterModel());
  const {
    isMounted,
    toastContext,
    getAccessToken,
    cancelTokenSource,
    userData,
  } = useComponentStateReference();

  useEffect(() => {
    setToolRegistryList([]);

    if (RegistryToolRoleHelper.canGetRegistryTools(userData)) {
      loadData(toolFilterModel).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }
  }, [userData]);

  const loadData = async (newFilterModel = toolFilterModel) => {
    try {
      setLoading(true);
      await getToolRegistryList(newFilterModel);
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setLoading(false);
      }
    }
  };

  const getToolRegistryList = async (newFilterModel = toolFilterModel) => {
    const response = await toolsActions.getRoleLimitedToolRegistryListV3(getAccessToken, cancelTokenSource, newFilterModel);
    const toolArray = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(toolArray)) {
      setToolRegistryList(toolArray);
      newFilterModel.updateTotalCount(response?.data?.count);
      newFilterModel.updateActiveFilters();
      setToolFilterModel({ ...newFilterModel });
    }
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
    >
      <ToolTableCardView
        isLoading={isLoading}
        loadData={loadData}
        tools={toolRegistryList}
        toolFilterDto={toolFilterModel}
        isMounted={isMounted}
        setToolFilterDto={setToolFilterModel}
      />
    </ScreenContainer>
  );
}

ToolInventory.propTypes = {
  customerAccessRules: PropTypes.object,
  handleTabClick: PropTypes.func
};

export default ToolInventory;