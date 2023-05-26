import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import azurePipelineActions 
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/azure_acr_push/azure-pipeline-actions";
import {hasStringValue} from "components/common/helpers/string-helpers";
import toolsActions from "components/inventory/tools/tools-actions";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

function ArgoCdStepAzureRegistryNameSelectInput(
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
      (hasStringValue(model?.getData("platform")) && model?.getData("platform") === "azure"
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

    if (model?.getData("platform") === "azure") {
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
      model?.getData("platform"),
      applicationData
    );

    const newRegistries = DataParsingHelper.parseNestedArray(azureResponse, "data.data", []);
    setAzureRegistryList([...newRegistries]);
  };

  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData(fieldName, selectedOption.name);
    newModel.setData("acrLoginUrl", selectedOption.url);
    newModel.setDefaultValue("azureRepoName");
    newModel.setDefaultValue("repositoryTag");
    newModel.setDefaultValue("imageUrl");
    setModel({...newModel});
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

ArgoCdStepAzureRegistryNameSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  azureToolConfigId: PropTypes.string,
  resource: PropTypes.string,
  applicationId: PropTypes.string,
};

ArgoCdStepAzureRegistryNameSelectInput.defaultProps = {
  fieldName: "azureRegistryName",
};

export default ArgoCdStepAzureRegistryNameSelectInput;
