import React, {useEffect, useState} from "react";
import parametersActions from "components/inventory/parameters/parameters-actions";
import ParametersView from "components/inventory/parameters/ParametersView";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import ParameterFilterModel from "components/inventory/parameters/parameter.filter.model";
import InventorySubNavigationBar from "components/inventory/InventorySubNavigationBar";
import ParametersHelpDocumentation from "../../common/help/documentation/tool_registry/ParametersHelpDocumentation";
import useComponentStateReference from "hooks/useComponentStateReference";
import CustomParameterRoleHelper from "@opsera/know-your-role/roles/registry/parameters/customParameterRole.helper";
import useGetParameterModel from "components/inventory/parameters/hooks/useGetParameterModel";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";

export default function ParametersInventory() {
  const [isLoading, setIsLoading] = useState(false);
  const [parameterList, setParameterList] = useState([]);
  const [parameterFilterModel, setParameterFilterModel] = useState(new ParameterFilterModel());
  const [parameterModel, setParameterModel] = useState(undefined);
  const { getNewParameterModel } = useGetParameterModel();
  const {
    isMounted,
    cancelTokenSource,
    toastContext,
    getAccessToken,
    userData,
  } = useComponentStateReference();

  useEffect(() => {
    setParameterList([]);

    if (CustomParameterRoleHelper.canGetParameters(userData) === true) {
      loadData(parameterFilterModel).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }
  }, [userData]);

  const loadData = async (filterModel = parameterFilterModel, selectedItemId) => {
    try {
      setIsLoading(true);
      await getParameters(filterModel, selectedItemId);
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

  const getParameters = async (filterModel = parameterFilterModel, selectedItemId) => {
    const response = await parametersActions.getParameters(
      getAccessToken,
      cancelTokenSource,
      filterModel?.getData("search")
    );
    const parameters = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(parameters)) {
      if (isMongoDbId(selectedItemId) === true) {
        const foundParameter = parameters.find((parameter) => parameter?._id === selectedItemId);

        if (foundParameter) {
          const newModel = getNewParameterModel(
            foundParameter,
            false,
            setParameterModel,
            loadData,
          );
          setParameterModel({ ...newModel });
        }
      }

      setParameterList([...parameters]);
      filterModel.setData("totalCount", response.data.count);
      filterModel.setData("activeFilters", filterModel.getActiveFilters());
      setParameterFilterModel({ ...filterModel });
    }
  };

  return (
    <ScreenContainer
      navigationTabContainer={<InventorySubNavigationBar currentTab={"parameters"} />}
      breadcrumbDestination={"customParameters"}
      pageDescription={`
        Parameters allow the user to store sensitive information in the vault in order to reference it later in the pipeline step.
      `}
      helpComponent={<ParametersHelpDocumentation />}
    >
      <ParametersView
        isLoading={isLoading}
        loadData={loadData}
        parameterList={parameterList}
        setParameterList={setParameterList}
        parameterFilterModel={parameterFilterModel}
        parameterModel={parameterModel}
        setParameterModel={setParameterModel}
      />
    </ScreenContainer>
  );
}

ParametersInventory.propTypes = {};