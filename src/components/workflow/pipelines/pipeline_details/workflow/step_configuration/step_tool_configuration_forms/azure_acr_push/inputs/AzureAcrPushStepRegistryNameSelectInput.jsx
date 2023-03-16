import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import azurePipelineActions from "../azure-pipeline-actions";
import {hasStringValue} from "components/common/helpers/string-helpers";
import toolsActions from "components/inventory/tools/tools-actions";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

function AzureAcrPushStepRegistryNameSelectInput(
  {
    fieldName,
    model,
    setModel,
    azureToolConfigId,
    resource,
    applicationId,
  }) {
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [azureRegistryList, setAzureRegistryList] = useState([]);
  const [error, setError] = useState("");
  const {getAccessToken} = useContext(AuthContext);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    setAzureRegistryList([]);

    if (
      hasStringValue(azureToolConfigId) === true &&
      hasStringValue(resource) === true &&
      (hasStringValue(model?.getData("toolType")) && model?.getData("toolType") === "azure"
        ? hasStringValue(applicationId)
        : true)
    ) {
      loadData(source).catch((error) => {
        throw error;
      });
    }
  }, [azureToolConfigId, resource, applicationId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      setError("");
      await loadAzureRegistries(cancelSource);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // TODO: We should be doing this work in a node route instead of putting the effort on the React end.
  const loadAzureRegistries = async (cancelSource = cancelTokenSource) => {
    const response = await toolsActions.getRoleLimitedToolByIdV3(getAccessToken, cancelSource, azureToolConfigId);
    const tool = response?.data?.data;
    let applicationData = {};

    if (tool == null) {
      setError("Could not find Tool to grab Registries.");
      return;
    }

    if (model?.getData("toolType") === "azure") {
      const applicationResponse = await toolsActions.getRoleLimitedToolApplicationByIdV2(
        getAccessToken,
        cancelSource,
        azureToolConfigId,
        applicationId
      );
      applicationData = applicationResponse?.data?.data;

      if (applicationData == null) {
        setError(`
        The selected Application was not found. 
        It may have been deleted, or the Tool's access rules may have been updated.
        Please select another Application or create another in the Tool Registry.
      `);
        return;
      }
    }

    const azureResponse = await azurePipelineActions.getAzureRegistries(
      getAccessToken,
      cancelSource,
      tool,
      resource,
      model?.getData("toolType"),
      applicationData
    );

    const newRegistries = DataParsingHelper.parseNestedArray(azureResponse, "data.data", []);
    setAzureRegistryList([...newRegistries]);
  };

  const setDataFunction = (fieldName, selectedOption) => {
    model.setData(fieldName, selectedOption.name);
    model.setData("acrLoginUrl", selectedOption.url);
    model.setDefaultValue("azureRepoName");
    setModel({...model});
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      selectOptions={azureRegistryList}
      busy={isLoading}
      valueField={"name"}
      textField={"name"}
      disabled={isLoading}
      errorMessage={error}
      loadDataFunction={loadData}
      externalCacheToolId={azureToolConfigId}
      error={error}
      pluralTopic={"Registries"}
      singularTopic={"Registry"}
    />
  );
}

AzureAcrPushStepRegistryNameSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  azureToolConfigId: PropTypes.string,
  resource: PropTypes.string,
  applicationId: PropTypes.string,
};

AzureAcrPushStepRegistryNameSelectInput.defaultProps = {
  fieldName: "azureRegistryName",
};

export default AzureAcrPushStepRegistryNameSelectInput;
