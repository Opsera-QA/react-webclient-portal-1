import { AuthContext } from "contexts/AuthContext";
import React, {useContext, useEffect, useRef, useState} from "react";
import { DialogToastContext } from "contexts/DialogToastContext";
import toolsActions from "components/inventory/tools/tools-actions";
import PropTypes from "prop-types";
import ToolTableCardView from "components/inventory/tools/ToolTableCardView";
import axios from "axios";
import ToolRegistryHelpDocumentation
  from "components/common/help/documentation/tool_registry/ToolRegistryHelpDocumentation";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import InventorySubNavigationBar from "components/inventory/InventorySubNavigationBar";
import ToolFilterModel from "components/inventory/tools/tool.filter.model";

function ToolInventory() {
  const { getAccessToken, getAccessRoleData } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setLoading] = useState(false);
  const [toolRegistryList, setToolRegistryList] = useState([]);
  const [toolFilterModel, setToolFilterModel] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [customerAccessRules, setCustomerAccessRules] = useState(undefined);
  const [registryToolRoleDefinitions, setRegistryToolRoleDefinitions] = useState(undefined);
  const [toolMetadata, setToolMetadata] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    const newToolFilterModel = new ToolFilterModel();
    loadData(newToolFilterModel, source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (newFilterModel = toolFilterModel, cancelSource = cancelTokenSource) => {
    try {
      setLoading(true);
      await getToolRegistryList(newFilterModel, cancelSource);
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

  const getToolRegistryList = async (newFilterModel = toolFilterModel, cancelSource = cancelTokenSource) => {
    const response = await toolsActions.getRoleLimitedToolRegistryListV3(getAccessToken, cancelSource, newFilterModel);
    const toolArray = response?.data?.data;
    const accessRoleData = await getAccessRoleData();
    setCustomerAccessRules(accessRoleData);

    if (isMounted?.current === true && Array.isArray(toolArray)) {
      const roleDefinitions = response?.data?.roles;
      const metadata = response?.data?.metadata;
      setToolMetadata(metadata);
      setToolRegistryList(toolArray);
      setRegistryToolRoleDefinitions(roleDefinitions);
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
        <ToolRegistryHelpDocumentation registryToolRoleDefinitions={registryToolRoleDefinitions} />
      }
    >
      <ToolTableCardView
        isLoading={isLoading}
        loadData={loadData}
        tools={toolRegistryList}
        toolFilterDto={toolFilterModel}
        toolMetadata={toolMetadata}
        isMounted={isMounted}
        setToolFilterDto={setToolFilterModel}
        customerAccessRules={customerAccessRules}
        roleDefinitions={registryToolRoleDefinitions}
      />
    </ScreenContainer>
  );
}

ToolInventory.propTypes = {
  customerAccessRules: PropTypes.object,
  handleTabClick: PropTypes.func
};

export default ToolInventory;