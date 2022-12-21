import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import {faSync} from "@fortawesome/pro-light-svg-icons";
import aksStepActions from "../aks-step-actions";
import {hasStringValue} from "components/common/helpers/string-helpers";
import toolsActions from "components/inventory/tools/tools-actions";
import IconBase from "components/common/icons/IconBase";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

function AksServiceDeployStepClusterSelectInput(
  {
    fieldName,
    dataObject,
    setDataObject,
    azureToolConfigId,
    applicationId,
  }) {
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [azureRegionList, setAzureRegionList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    setError(undefined);
    setAzureRegionList([]);
    if (hasStringValue(applicationId) === true && hasStringValue(azureToolConfigId) === true) {
      loadData(source).catch((error) => {
        throw error;
      });
    }
  }, [azureToolConfigId, applicationId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setError(undefined);
      setIsLoading(true);
      await loadAzureRegistries(cancelSource);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // TODO: We should make a route on node where you can pass an azure tool ID and an azure Application ID
  //  and return the clusters instead of constructing the complex query here on React
  const loadAzureRegistries = async (cancelSource = cancelTokenSource) => {
    const response = await toolsActions.getRoleLimitedToolByIdV3(getAccessToken, cancelSource, azureToolConfigId);
    const tool = response?.data?.data;

    if (tool == null) {
      setErrorMessage("Could not find Tool to grab Clusters.");
      return;
    }

    const applicationResponse = await toolsActions.getRoleLimitedToolApplicationByIdV2(getAccessToken, cancelSource, azureToolConfigId, applicationId);
    const applicationData = applicationResponse?.data?.data;

    if (applicationData == null) {
      setErrorMessage(`
        The selected Application was not found. 
        It may have been deleted, or the Tool's access roles may have been updated.
        Please select another Application or create another in the Tool Registry.
      `);
      return;
    }

    const azureResponse = await aksStepActions.getAzureClusters(
      getAccessToken,
      cancelSource,
      tool,
      applicationData?.configuration
    );

    setAzureRegionList(DataParsingHelper.parseNestedArray(azureResponse, "data.data", []));
  };

  const getInfoText = () => {
    if (dataObject?.getData("resource")?.length > 0) {
      return (
        <small>
          <IconBase icon={faSync} className={"pr-1"} />
          Click here to refresh Clusters
        </small>
      );
    }
  };

  return (
    <>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        selectOptions={azureRegionList}
        busy={isLoading}
        disabled={isLoading}
        errorMessage={errorMessage}
        error={error}
        loadDataFunction={loadData}
        pluralTopic={"Clusters"}
        singularTopic={"Cluster"}
      />
      <div onClick={() => loadData()} className="text-muted ml-3 dropdown-data-fetch">
        {getInfoText()}
      </div>
    </>
  );
}

AksServiceDeployStepClusterSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  azureToolConfigId: PropTypes.string,
  applicationId: PropTypes.string,
};

AksServiceDeployStepClusterSelectInput.defaultProps = {
  fieldName: "aksClusterName",
  textField: "clusterName",
  valueField: "clusterName",
};

export default AksServiceDeployStepClusterSelectInput;
