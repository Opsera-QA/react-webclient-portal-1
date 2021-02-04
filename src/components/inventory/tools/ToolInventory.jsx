import { AuthContext } from "contexts/AuthContext";
import React, { useContext, useEffect, useState } from "react";
import Model from "core/data_model/model";
import { DialogToastContext } from "contexts/DialogToastContext";
import toolFilterMetadata from "components/inventory/tools/tool-filter-metadata";
import toolsActions from "components/inventory/tools/tools-actions";
import PropTypes from "prop-types";
import cookieHelpers from "core/cookies/cookie-helpers";
import ToolViews from "components/inventory/tools/ToolViews";

function ToolInventory({ customerAccessRules }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setLoading] = useState(false);
  const [toolRegistryList, setToolRegistryList] = useState([]);
  const [toolFilterDto, setToolFilterDto] = useState(undefined);

  useEffect(() => {
    getCookie().catch(error => {
      throw { error };
    });
  }, []);

  const getCookie = async () => {
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
      await loadData(newToolFilterDto);
    }
  };

  const loadData = async (filterDto = toolFilterDto) => {
    try {
      setLoading(true);
      await getToolRegistryList(filterDto);
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    } finally {
      setLoading(false);
    }
  };

  const saveCookies = (newToolFilterDto) => {
    cookieHelpers.setCookie("registry", "viewType", JSON.stringify(newToolFilterDto.getData("viewType")));
  };

  const getToolRegistryList = async (filterDto = toolFilterDto) => {
    const response = await toolsActions.getRoleLimitedToolRegistryList(filterDto, getAccessToken);
    saveCookies(filterDto);

    if (response?.data?.data) {
      setToolRegistryList(response.data.data);
      let newFilterDto = filterDto;
      newFilterDto.setData("totalCount", response.data.count);
      newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
      setToolFilterDto({ ...newFilterDto });
    }
  };

  return (
    <ToolViews
      isLoading={isLoading}
      loadData={loadData}
      saveCookies={saveCookies}
      data={toolRegistryList}
      toolFilterDto={toolFilterDto}
      setToolFilterDto={setToolFilterDto}
      customerAccessRules={customerAccessRules}
    />
  );
}

ToolInventory.propTypes = {
  customerAccessRules: PropTypes.object,
};

export default ToolInventory;