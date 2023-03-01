import React, {useContext, useEffect, useRef, useState} from "react";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import toolsActions from "components/inventory/tools/tools-actions";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

function AzureToolApplicationSelectInput({ azureToolId, fieldName, model, setModel, setDataFunction, clearDataFunction, disabled}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [azureApplications, setAzureApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    setAzureApplications([]);
    if (azureToolId != null && azureToolId !== "") {
      loadData(source).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [azureToolId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadApplications(cancelSource);
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const loadApplications = async (cancelSource = cancelTokenSource) => {
    const response = await toolsActions.getRoleLimitedToolByIdV3(getAccessToken, cancelSource, azureToolId);
    const tool = DataParsingHelper.parseNestedObject(response, "data.data");

    // TODO: We should probably add some way to verify credentials.
    if (isMounted?.current === true && tool != null) {
      const applications = tool?.applications;

      if (Array.isArray(applications)) {
        setAzureApplications(applications);
      }
    }
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      selectOptions={azureApplications}
      clearDataFunction={clearDataFunction}
      disabled={disabled}
      busy={isLoading}
      valueField={"_id"}
      textField={'name'}
      pluralTopic={"Azure Credentials"}
      singularTopic={"Azure Credential"}
    />
  );
}

AzureToolApplicationSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
  azureToolId: PropTypes.string.isRequired,
  disabled: PropTypes.bool
};

AzureToolApplicationSelectInput.defaultProps = {
  disabled: false,
};

export default AzureToolApplicationSelectInput;
