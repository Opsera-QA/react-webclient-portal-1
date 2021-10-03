import { AuthContext } from "contexts/AuthContext";
import React, {useContext, useEffect, useRef, useState} from "react";
import Model from "core/data_model/model";
import { DialogToastContext } from "contexts/DialogToastContext";
import toolFilterMetadata from "components/inventory/tools/tool-filter-metadata";
import toolsActions from "components/inventory/tools/tools-actions";
import PropTypes from "prop-types";
import cookieHelpers from "core/cookies/cookie-helpers";
import ToolTableCardView from "components/inventory/tools/ToolTableCardView";
import axios from "axios";
import ToolRegistryHelpDocumentation
  from "components/common/help/documentation/tool_registry/ToolRegistryHelpDocumentation";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import InventorySubNavigationBar from "components/inventory/InventorySubNavigationBar";

function ToolInventory() {
  const { getAccessToken, getAccessRoleData } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setLoading] = useState(false);
  const [toolRegistryList, setToolRegistryList] = useState([]);
  const [toolFilterDto, setToolFilterDto] = useState(new Model({ ...toolFilterMetadata.newObjectFields }, toolFilterMetadata, false));
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [customerAccessRules, setCustomerAccessRules] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    getCookie(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const getCookie = async (cancelSource = cancelTokenSource) => {
    setLoading(true);
    let newToolFilterDto = new Model({ ...toolFilterMetadata.newObjectFields }, toolFilterMetadata, false);
    try {
      let storedViewType = cookieHelpers.getCookie("registry", "viewType");

      if (storedViewType != null) {
        newToolFilterDto.setData("viewType", JSON.parse(storedViewType));
      }
    } catch (error) {
      cookieHelpers.setCookie("registry", "viewType", JSON.stringify(newToolFilterDto.getData("viewType")));
      console.error("Error loading cookie. Setting to default");
      console.error(error);
    } finally {
      await loadData(newToolFilterDto, cancelSource);
    }
  };

  const loadData = async (filterDto = toolFilterDto, cancelSource = cancelTokenSource) => {
    try {
      setLoading(true);
      const accessRoleData = await getAccessRoleData();
      setCustomerAccessRules(accessRoleData);
      await getToolRegistryList(filterDto, cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setLoading(false);
      }
    }
  };

  const saveCookies = (newToolFilterDto) => {
    cookieHelpers.setCookie("registry", "viewType", JSON.stringify(newToolFilterDto.getData("viewType")));
  };

  const getToolRegistryList = async (filterDto = toolFilterDto, cancelSource = cancelTokenSource) => {
    const response = await toolsActions.getRoleLimitedToolRegistryListV3(getAccessToken, cancelSource, filterDto);
    saveCookies(filterDto);
    const toolArray = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(toolArray)) {
      setToolRegistryList(toolArray);
      let newFilterDto = filterDto;
      newFilterDto.setData("totalCount", response.data.count);
      newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
      setToolFilterDto({ ...newFilterDto });
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
        saveCookies={saveCookies}
        data={toolRegistryList}
        toolFilterDto={toolFilterDto}
        setToolFilterDto={setToolFilterDto}
        customerAccessRules={customerAccessRules}
      />
    </ScreenContainer>
  );
}

ToolInventory.propTypes = {
  customerAccessRules: PropTypes.object,
  handleTabClick: PropTypes.func
};

export default ToolInventory;