import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import azureFunctionsActions from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/azure_functions/azure-functions-step-actions";
import toolsActions from "components/inventory/tools/tools-actions";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

function AzureRegionSelectInput(
  {
    fieldName,
    model,
    setModel,
    azureToolId,
    azureToolApplicationId,
    disabled,
    setDataFunction,
    clearDataFunction
  }) {
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [azureRegionList, setAzureRegionList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [placeholder, setPlaceholderText] = useState("Select Azure Region");
  const isMounted = useRef(false);
  const {getAccessToken} = useContext(AuthContext);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    isMounted.current = true;
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    setAzureRegionList([]);

    if (azureToolId != null && azureToolId !== "" && azureToolApplicationId != null && azureToolApplicationId !== "") {
      loadData(source).catch((error) => {
        throw error;
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [azureToolId, azureToolApplicationId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadAzureTool(cancelSource);
    } catch (error) {
      setPlaceholderText("No Regions Available!");
      setErrorMessage("There was an error pulling Azure Regions");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadAzureTool = async (cancelSource = cancelTokenSource) => {
    const response = await toolsActions.getRoleLimitedToolByIdV3(getAccessToken, cancelSource, azureToolId);
    const azureTool = DataParsingHelper.parseNestedObject(response, "data.data");

    // TODO: We should probably add some way to verify credentials.
    //  I should probably also make an RBAC Tool Application Base select input
    if (isMounted?.current === true) {
      if (azureTool == null) {
        setPlaceholderText("No Regions Available!");
        setErrorMessage("There was an error pulling Azure Regions. Azure tool not found!");
      } else {
        const applications = azureTool?.applications;

        const azureApplication = Array.isArray(applications)
          ? applications.find((application) => application._id === azureToolApplicationId)
          : undefined;

        if (azureApplication == null) {
          setPlaceholderText("No Regions Available!");
          setErrorMessage("There was an error pulling Azure Regions. Azure Application not found!");
        } else {
          await loadAzureRegions(cancelSource, azureTool, azureApplication);
        }
      }
    }
  };

  const loadAzureRegions = async (cancelSource = cancelTokenSource, azureToolData, azureApplicationData) => {
    setErrorMessage("");
    const response = await azureFunctionsActions.getAzureRegions(
      getAccessToken,
      cancelSource,
      azureToolData,
      azureApplicationData
    );

    const azureRegions = response?.data?.data;

    if (!Array.isArray(azureRegions)) {
      setPlaceholderText("No Regions Available!");
      setErrorMessage("There was an error pulling Azure Regions");
    } else if (azureRegions.length > 0) {
      setAzureRegionList(azureRegions);
    } else {
      setPlaceholderText("No regions found with this Azure configuration");
      setErrorMessage("No Azure Regions found");
    }
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={azureRegionList}
      busy={isLoading}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      valueField={"name"}
      textField={(region) => {
        if (region?.properties) {
          return (region?.properties?.displayName);
        }

        return model?.getData(fieldName);
      }}
      disabled={disabled || azureRegionList.length === 0}
      placeholder={placeholder}
      errorMessage={errorMessage}
    />
  );
}

AzureRegionSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  azureToolId: PropTypes.string.isRequired,
  azureToolApplicationId: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
};

export default AzureRegionSelectInput;
