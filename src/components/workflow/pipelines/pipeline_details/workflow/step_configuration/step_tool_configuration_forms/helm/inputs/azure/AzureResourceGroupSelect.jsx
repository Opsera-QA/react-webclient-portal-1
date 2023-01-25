import React, { useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import {faSync} from "@fortawesome/pro-light-svg-icons";
import helmStepActions from "../../helm-step-actions";
import {hasStringValue} from "components/common/helpers/string-helpers";
import toolsActions from "components/inventory/tools/tools-actions";
import IconBase from "components/common/icons/IconBase";

function AksResourceGroupSelectInput(
  {
    fieldName,
    model,
    setModel,
    azureToolConfigId,
    azureApplication,
    textField,
    valueField,
    disabled
  }) {
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [azureRegionList, setAzureRegionList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [placeholder, setPlaceholderText] = useState("Select Cluster");
  const [error, setError] = useState(undefined);
  const { getAccessToken } = useContext(AuthContext);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    setAzureRegionList([]);

    if (hasStringValue(azureToolConfigId) && hasStringValue(azureApplication) && !disabled) {
      loadData(source).catch((error) => {
        throw error;
      });
    }
  }, [azureToolConfigId, azureApplication]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadAzureRegistries(cancelSource);
      setError(null);
    } catch (error) {
      setError(error);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // TODO: We should make a route on node where you can pass an azure tool ID and an azure Application ID
  //  and return the resource groups instead of constructing the complex query here on React
  const loadAzureRegistries = async (cancelSource = cancelTokenSource) => {
    const response = await toolsActions.getRoleLimitedToolByIdV3(getAccessToken, cancelSource, azureToolConfigId);
    const tool = response?.data?.data;

    if (tool == null) {
      setErrorMessage("Could not find Tool to grab Clusters.");
      return;
    }

    const applicationResponse = await toolsActions.getRoleLimitedToolApplicationByIdV2(getAccessToken, cancelSource, azureToolConfigId, azureApplication);
    const applicationData = applicationResponse?.data?.data;

    if (applicationData == null) {
      setErrorMessage(`
        The selected Application was not found. 
        It may have been deleted, or the Tool's access roles may have been updated.
        Please select another Application or create another in the Tool Registry.
      `);
      return;
    }

    const resourceGroupResponse = await helmStepActions.getAzureResourceGroups(
      getAccessToken,
      cancelSource,
      tool,
      applicationData?.configuration
    );
    const result = resourceGroupResponse?.data?.data;

    if (Array.isArray(result) && result.length > 0) {
      setErrorMessage("");
      setAzureRegionList(result);
    }

    if (result?.length === 0) {
      setErrorMessage("No Resource Groups found");
    }
  };

  const getInfoText = () => {
    if (model?.getData("resource")?.length > 0) {
      return (
        <small>
          <IconBase icon={faSync} className={"pr-1"} />
          Click here to refresh Resource Groups
        </small>
      );
    }
  };

  return (
    <>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={model}
        setDataObject={setModel}
        selectOptions={azureRegionList}
        busy={isLoading}
        disabled={isLoading || disabled}
        singularTopic={"Resource Group"}
        pluralTopic={"Resource Groups"}
        textField={textField}
        valueField={valueField}
        errorMessage={errorMessage}
        error={error}
      />
      <div onClick={() => loadData()} className="text-muted ml-3 dropdown-data-fetch">
        {getInfoText()}
      </div>
    </>
  );
}

AksResourceGroupSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  azureToolConfigId: PropTypes.string,
  azureApplication: PropTypes.string,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  disabled: PropTypes.bool
};

AksResourceGroupSelectInput.defaultProps = {
  fieldName: "resourceGroup",
  textField: "name",
  valueField: "name",
};

export default AksResourceGroupSelectInput;
