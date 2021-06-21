import { AuthContext } from "contexts/AuthContext";
import React, {useContext, useEffect, useRef, useState} from "react";
import { DialogToastContext } from "contexts/DialogToastContext";
import PropTypes from "prop-types";
import axios from "axios";
import parametersActions from "components/inventory/parameters/parameters-actions";
import ParametersView from "components/inventory/parameters/ParametersView";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import {faFileCode, faHandshake, faServer, faTools} from "@fortawesome/pro-light-svg-icons";
import ParameterModel from "components/inventory/parameters/parameter.model";
import ParameterFilterModel from "components/inventory/parameters/parameter.filter.model";

function ParametersInventory({ customerAccessRules, handleTabClick }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setLoading] = useState(false);
  const [parameterList, setParameterList] = useState([]);
  const [parameterMetadata, setParameterMetadata] = useState(undefined);
  const [parameterRoleDefinitions, setParameterRoleDefinitions] = useState(undefined);
  const [parameterFilterModel, setParameterFilterModel] = useState(new ParameterFilterModel());
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(parameterFilterModel, source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (filterDto = parameterFilterModel, cancelSource = cancelTokenSource) => {
    try {
      setLoading(true);
      await getParameters(filterDto, cancelSource);
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

  const getParameters = async (filterDto = parameterFilterModel, cancelSource = cancelTokenSource) => {
    const response = await parametersActions.getParameters(getAccessToken, cancelSource, filterDto);
    const parameters = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(parameters)) {
      const newParameterMetadata = response.data.metadata;
      setParameterMetadata(newParameterMetadata);

      if (Array.isArray(parameters) && parameters.length > 0) {
        let modelWrappedArray = [];

        // TODO: Integrate role definitions into data call
        parameters.forEach((parameter) => {
          let newModel = new ParameterModel({...parameter}, newParameterMetadata, false, getAccessToken, cancelTokenSource, loadData);
          modelWrappedArray.push(newModel);
        });

        setParameterList([...modelWrappedArray]);
      }

      setParameterRoleDefinitions(response.data.roles);
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
        {/*<NavigationTab icon={faFileCode} tabName={"scripts"} handleTabClick={handleTabClick} activeTab={"parameters"} tabText={"Scripts"} />*/}
      </NavigationTabContainer>
    );
  };


  return (
    <ScreenContainer
      navigationTabContainer={getNavigationTabContainer()}
      breadcrumbDestination={"customParameters"}
    >
      <ParametersView
        isLoading={isLoading}
        loadData={loadData}
        parameterList={parameterList}
        setParameterList={setParameterList}
        parameterFilterModel={parameterFilterModel}
        parameterMetadata={parameterMetadata}
        customerAccessRules={customerAccessRules}
        parameterRoleDefinitions={parameterRoleDefinitions}
      />
    </ScreenContainer>
  );
}

ParametersInventory.propTypes = {
  customerAccessRules: PropTypes.object,
  handleTabClick: PropTypes.func
};

export default ParametersInventory;