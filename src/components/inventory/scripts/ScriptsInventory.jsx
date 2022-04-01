import { AuthContext } from "contexts/AuthContext";
import React, {useContext, useEffect, useRef, useState} from "react";
import { DialogToastContext } from "contexts/DialogToastContext";
import axios from "axios";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import ScriptsView from "components/inventory/scripts/ScriptsView";
import scriptsActions from "components/inventory/scripts/scripts-actions";
import ScriptModel from "components/inventory/scripts/script.model";
import ScriptsFilterModel from "components/inventory/scripts/scripts.filter.model";
import InventorySubNavigationBar from "components/inventory/InventorySubNavigationBar";
import ScriptsHelpDocumentation from "../../common/help/documentation/tool_registry/ScriptsHelpDocumentation";
import {isActionAllowed} from "components/common/helpers/role-helpers";

function ScriptsInventory() {
  const { getAccessToken, getAccessRoleData } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setLoading] = useState(false);
  const [scriptList, setScriptList] = useState([]);
  const [scriptMetadata, setScriptMetadata] = useState(undefined);
  const [scriptRoleDefinitions, setScriptRoleDefinitions] = useState(undefined);
  const [scriptFilterModel, setParameterFilterModel] = useState(new ScriptsFilterModel());
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

    loadData(scriptFilterModel, source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (filterDto = scriptFilterModel, cancelSource = cancelTokenSource) => {
    try {
      setLoading(true);
      const accessRoleData = await getAccessRoleData();
      setCustomerAccessRules(accessRoleData);
      await getScripts(filterDto, cancelSource);
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

  const getScripts = async (filterDto = scriptFilterModel, cancelSource = cancelTokenSource) => {
    const response = await scriptsActions.getScripts(getAccessToken, cancelSource, filterDto?.getData("search"));
    const scripts = response?.data?.data;
    const userRoleAccess = await getAccessRoleData();

    if (isMounted?.current === true && scripts) {
      const newScriptMetadata = response.data.metadata;
      setScriptMetadata(newScriptMetadata);
      const newScriptRoleDefinitions = response?.data?.roles;
      setScriptRoleDefinitions(newScriptRoleDefinitions);

      if (Array.isArray(scripts) && scripts.length > 0) {
        let modelWrappedArray = [];

        scripts.forEach((script) => {
          const deleteAllowed = isActionAllowed(userRoleAccess, "delete_script", script.owner, script.roles, newScriptRoleDefinitions);
          const updateAllowed = isActionAllowed(userRoleAccess, "update_script", script.owner, script.roles, newScriptRoleDefinitions);
          const canEditAccessRoles = isActionAllowed(userRoleAccess, "edit_access_roles", script.owner, script.roles, newScriptRoleDefinitions);
          const newModel = {...new ScriptModel({...script}, newScriptMetadata, false, getAccessToken, cancelTokenSource, loadData, updateAllowed, deleteAllowed, canEditAccessRoles)};

          modelWrappedArray.push(newModel);
        });
        setScriptList([...modelWrappedArray]);
      }

      let newFilterDto = filterDto;
      newFilterDto.setData("totalCount", response.data.count);
      newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
      setParameterFilterModel({ ...newFilterDto });
    }
  };

  const getHelpComponent = () => {
    if (!isLoading) {
      return (<ScriptsHelpDocumentation scriptRoleDefinitions={scriptRoleDefinitions} />);
    }
  };

  return (
    <ScreenContainer
      navigationTabContainer={<InventorySubNavigationBar currentTab={"scripts"} />}
      breadcrumbDestination={"scripts"}
      pageDescription={`
        The Opsera Scripts Library enables user to register a new script, give it a name and apply RBAC. The script can then be referenced in the a pipeline step.
      `}
      helpComponent={getHelpComponent()}
    >
      <ScriptsView
        isLoading={isLoading}
        loadData={loadData}
        scriptList={scriptList}
        setScriptList={setScriptList}
        scriptMetadata={scriptMetadata}
        customerAccessRules={customerAccessRules}
        scriptFilterModel={scriptFilterModel}
        scriptRoleDefinitions={scriptRoleDefinitions}
      />
    </ScreenContainer>
  );
}

ScriptsInventory.propTypes = {};

export default ScriptsInventory;