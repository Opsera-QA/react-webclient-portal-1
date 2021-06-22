import { AuthContext } from "contexts/AuthContext";
import React, {useContext, useEffect, useRef, useState} from "react";
import { DialogToastContext } from "contexts/DialogToastContext";
import PropTypes from "prop-types";
import axios from "axios";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import {faFileCode, faHandshake, faServer, faTools} from "@fortawesome/pro-light-svg-icons";
import ScriptsView from "components/inventory/scripts/ScriptsView";
import scriptsActions from "components/inventory/scripts/scripts-actions";
import ScriptModel from "components/inventory/scripts/script.model";
import ScriptsFilterModel from "components/inventory/scripts/scripts.filter.model";
import workflowAuthorizedActions
  from "components/workflow/pipelines/pipeline_details/workflow/workflow-authorized-actions";

function ScriptsInventory({ customerAccessRules, handleTabClick }) {
  const { getAccessToken, getAccessRoleData } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setLoading] = useState(false);
  const [scriptList, setScriptList] = useState([]);
  const [scriptMetadata, setScriptMetadata] = useState(undefined);
  const [scriptRoleDefinitions, setScriptRoleDefinitions] = useState(undefined);
  const [scriptFilterModel, setParameterFilterModel] = useState(new ScriptsFilterModel());
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

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
    const response = await scriptsActions.getScripts(getAccessToken, cancelSource, filterDto);
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
          const deleteAllowed = workflowAuthorizedActions.isActionAllowed(userRoleAccess, "delete_script", script.owner, script.roles, newScriptRoleDefinitions);
          const updateAllowed = workflowAuthorizedActions.isActionAllowed(userRoleAccess, "update_script", script.owner, script.roles, newScriptRoleDefinitions);

          let newModel = {...new ScriptModel({...script}, newScriptMetadata, false, getAccessToken, cancelTokenSource, loadData, updateAllowed, deleteAllowed)};
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

  const getNavigationTabContainer = () => {
    return (
      <NavigationTabContainer>
        <NavigationTab icon={faTools} tabName={"tools"} handleTabClick={handleTabClick} activeTab={"scripts"} tabText={"Tools"} />
        <NavigationTab icon={faServer} tabName={"platform"} handleTabClick={handleTabClick} activeTab={"scripts"} tabText={"Platform"} />
        <NavigationTab icon={faHandshake} tabName={"parameters"} handleTabClick={handleTabClick} activeTab={"scripts"} tabText={"Parameters"} />
        <NavigationTab icon={faFileCode} tabName={"scripts"} handleTabClick={handleTabClick} activeTab={"scripts"} tabText={"Scripts"} />
      </NavigationTabContainer>
    );
  };


  return (
    <ScreenContainer
      navigationTabContainer={getNavigationTabContainer()}
      breadcrumbDestination={"scripts"}
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

ScriptsInventory.propTypes = {
  customerAccessRules: PropTypes.object,
  handleTabClick: PropTypes.func
};

export default ScriptsInventory;