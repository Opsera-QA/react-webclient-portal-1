import React, {useContext, useEffect, useRef, useState} from "react";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import toolsActions from "components/inventory/tools/tools-actions";

function AzureToolApplicationSelectInput({ azureToolId, fieldName, model, setModel, setDataFunction, clearDataFunction, }) {
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
    // TODO: This route should send back just the tool NOT an array with the tool in it
    const response = await toolsActions.getRoleLimitedToolByIdV2(getAccessToken, cancelSource, azureToolId);
    const tool = response?.data?.data[0];

    // TODO: We should probably add some way to verify credentials.
    //  I should probably also make an RBAC Tool Application Base select input
    if (isMounted?.current === true && tool != null) {
      const applications = tool?.applications;

      console.log("response: " + JSON.stringify(response));
      console.log("applications: " + JSON.stringify(applications));
      if (Array.isArray(applications)) {
        console.log("applications: " + JSON.stringify(applications));
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
      busy={isLoading}
      valueField={"_id"}
      textField={'name'}
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
};

export default AzureToolApplicationSelectInput;
