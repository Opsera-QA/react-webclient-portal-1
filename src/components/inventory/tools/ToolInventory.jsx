import { AuthContext } from "contexts/AuthContext";
import React, {useContext, useEffect, useRef, useState} from "react";
import Model from "core/data_model/model";
import { DialogToastContext } from "contexts/DialogToastContext";
import toolFilterMetadata from "components/inventory/tools/tool-filter-metadata";
import toolsActions from "components/inventory/tools/tools-actions";
import PropTypes from "prop-types";
import cookieHelpers from "core/cookies/cookie-helpers";
import ToolViews from "components/inventory/tools/ToolViews";
import axios from "axios";
import ToolRegistryHelpDocumentation
  from "components/common/help/documentation/tool_registry/ToolRegistryHelpDocumentation";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import {faFileCode, faHandshake, faServer, faTools} from "@fortawesome/pro-light-svg-icons";

function ToolInventory({ customerAccessRules, handleTabClick }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setLoading] = useState(false);
  const [toolRegistryList, setToolRegistryList] = useState([]);
  const [toolFilterDto, setToolFilterDto] = useState(new Model({ ...toolFilterMetadata.newObjectFields }, toolFilterMetadata, false));
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

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
    const response = await toolsActions.getRoleLimitedToolRegistryListV2(getAccessToken, cancelSource, filterDto);
    saveCookies(filterDto);

    if (isMounted?.current === true && response?.data?.data) {
      setToolRegistryList(response.data.data);
      let newFilterDto = filterDto;
      newFilterDto.setData("totalCount", response.data.count);
      newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
      setToolFilterDto({ ...newFilterDto });
    }
  };

  const getNavigationTabContainer = () => {
    return (
      <NavigationTabContainer>
        <NavigationTab icon={faTools} tabName={"tools"} handleTabClick={handleTabClick} activeTab={"tools"} tabText={"Tools"} />
        <NavigationTab icon={faServer} tabName={"platform"} handleTabClick={handleTabClick} activeTab={"tools"} tabText={"Platform"} />
        <NavigationTab icon={faHandshake} tabName={"parameters"} handleTabClick={handleTabClick} activeTab={"tools"} tabText={"Parameters"} />
        <NavigationTab icon={faFileCode} tabName={"scripts"} handleTabClick={handleTabClick} activeTab={"tools"} tabText={"Scripts"} />
      </NavigationTabContainer>
    );
  };

  return (
    <ScreenContainer
      navigationTabContainer={getNavigationTabContainer()}
      breadcrumbDestination={"toolRegistry"}
      pageDescription={`
        The Opsera Tool Registry allows you to register, track and configure all of the tools in your organization in
        one centralized location.
      `}
      helpComponent={
        <ToolRegistryHelpDocumentation />
      }
    >
      <ToolViews
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