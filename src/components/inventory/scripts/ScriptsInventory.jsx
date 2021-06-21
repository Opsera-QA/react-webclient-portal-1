import { AuthContext } from "contexts/AuthContext";
import React, {useContext, useEffect, useRef, useState} from "react";
import Model from "core/data_model/model";
import { DialogToastContext } from "contexts/DialogToastContext";
import toolFilterMetadata from "components/inventory/tools/tool-filter-metadata";
import PropTypes from "prop-types";
import axios from "axios";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import {faFileCode, faHandshake, faServer, faTools} from "@fortawesome/pro-light-svg-icons";
import ScriptsView from "components/inventory/scripts/ScriptsView";
import scriptsActions from "components/inventory/scripts/scripts-actions";
import ScriptModel from "components/inventory/scripts/script.model";

function ScriptsInventory({ customerAccessRules, handleTabClick }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setLoading] = useState(false);
  const [scriptList, setScriptList] = useState([]);
  const [scriptMetadata, setScriptMetadata] = useState(undefined);
  const [scriptRoleDefinitions, setScriptRoleDefinitions] = useState(undefined);
  const [scriptFilterModel, setParameterFilterModel] = useState(new Model({ ...toolFilterMetadata.newObjectFields }, toolFilterMetadata, false));
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

    if (isMounted?.current === true && scripts) {
      const newScriptMetadata = response.data.metadata;
      setScriptMetadata(newScriptMetadata);

      if (Array.isArray(scripts) && scripts.length > 0) {
        let modelWrappedArray = [];

        // TODO: Integrate role definitions into data call
        scripts.forEach((script) => {
          let newModel = {...new ScriptModel({...script}, newScriptMetadata, false, getAccessToken, cancelTokenSource, loadData)};
          modelWrappedArray.push(newModel);
        });
        setScriptList([...modelWrappedArray]);
      }

      setScriptRoleDefinitions(response.data.roles);
      let newFilterDto = filterDto;
      newFilterDto.setData("totalCount", response.data.count);
      newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
      setParameterFilterModel({ ...newFilterDto });
    }
  };

  const getNavigationTabContainer = () => {
    return (
      <NavigationTabContainer>
        <NavigationTab icon={faTools} tabName={"tools"} handleTabClick={handleTabClick} activeTab={"parameters"} tabText={"Tools"} />
        <NavigationTab icon={faServer} tabName={"platform"} handleTabClick={handleTabClick} activeTab={"parameters"} tabText={"Platform"} />
        <NavigationTab icon={faHandshake} tabName={"parameters"} handleTabClick={handleTabClick} activeTab={"parameters"} tabText={"Parameters"} />
        <NavigationTab icon={faFileCode} tabName={"scripts"} handleTabClick={handleTabClick} activeTab={"tools"} tabText={"Scripts"} />
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