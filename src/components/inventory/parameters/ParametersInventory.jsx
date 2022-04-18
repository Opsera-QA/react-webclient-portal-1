import { AuthContext } from "contexts/AuthContext";
import React, {useContext, useEffect, useRef, useState} from "react";
import { DialogToastContext } from "contexts/DialogToastContext";
import axios from "axios";
import parametersActions from "components/inventory/parameters/parameters-actions";
import ParametersView from "components/inventory/parameters/ParametersView";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import ParameterModel from "components/inventory/parameters/parameter.model";
import ParameterFilterModel from "components/inventory/parameters/parameter.filter.model";
import InventorySubNavigationBar from "components/inventory/InventorySubNavigationBar";
import ParametersHelpDocumentation from "../../common/help/documentation/tool_registry/ParametersHelpDocumentation";
import {isActionAllowed} from "components/common/helpers/role-helpers";

function ParametersInventory() {
  const { getAccessToken, getAccessRoleData } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(true);
      await getParameters(filterDto, cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getParameters = async (filterDto = parameterFilterModel, cancelSource = cancelTokenSource) => {
    const response = await parametersActions.getParameters(getAccessToken, cancelSource, filterDto?.getData("search"));
    const parameters = response?.data?.data;
    const userRoleAccess = await getAccessRoleData();

    if (isMounted?.current === true && Array.isArray(parameters)) {
      const newParameterMetadata = response?.data?.metadata;
      setParameterMetadata(newParameterMetadata);
      const roleDefinitions = response?.data?.roles;
      setParameterRoleDefinitions(roleDefinitions);

      if (Array.isArray(parameters) && parameters.length > 0) {
        let modelWrappedArray = [];

        parameters.forEach((parameter) => {
          const deleteAllowed = isActionAllowed(userRoleAccess, "delete_parameter", parameter.owner, parameter.roles, roleDefinitions);
          const updateAllowed = isActionAllowed(userRoleAccess, "update_parameter", parameter.owner, parameter.roles, roleDefinitions);
          const canEditAccessRoles = isActionAllowed(userRoleAccess, "edit_access_roles", parameter.owner, parameter.roles, roleDefinitions);
          const newModel = {...new ParameterModel({...parameter}, newParameterMetadata, false, getAccessToken, cancelTokenSource, loadData, updateAllowed, deleteAllowed, canEditAccessRoles)};

          modelWrappedArray.push(newModel);
        });

        setParameterList([...modelWrappedArray]);
      }

      let newFilterDto = filterDto;
      newFilterDto.setData("totalCount", response.data.count);
      newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
      setParameterFilterModel({ ...newFilterDto });
    }
  };

  const getHelpComponent = () => {
    if (!isLoading) {
      return (<ParametersHelpDocumentation parameterRoleDefinitions={parameterRoleDefinitions} />);
    }
  };

  return (
    <ScreenContainer
      navigationTabContainer={<InventorySubNavigationBar currentTab={"parameters"} />}
      breadcrumbDestination={"customParameters"}
      pageDescription={`
        Parameters allow the user to store sensitive information in the vault in order to reference it later in the pipeline step.
      `}
      helpComponent={getHelpComponent()}
    >
      <ParametersView
        isLoading={isLoading}
        loadData={loadData}
        parameterList={parameterList}
        setParameterList={setParameterList}
        parameterFilterModel={parameterFilterModel}
        parameterMetadata={parameterMetadata}
        parameterRoleDefinitions={parameterRoleDefinitions}
      />
    </ScreenContainer>
  );
}

ParametersInventory.propTypes = {};

export default ParametersInventory;