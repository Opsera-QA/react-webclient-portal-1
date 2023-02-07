import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import helmStepActions from "../../helm-step-actions";

function HelmAzureNamespaceSelectInput({
  fieldName,
  model,
  setModel,
  disabled,
  textField,
  valueField,
  azureToolConfigId,
  clusterName,
  clusterType,
  resourceGroup,
  azureCredentialId
}) {
  const { getAccessToken } = useContext(AuthContext);
  const [namespaces, setNamespaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    setError(null);
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    
    if (!disabled) {
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
  }, [azureToolConfigId, clusterName, resourceGroup, clusterType]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      model.getData("azureToolConfigId") && clusterName && resourceGroup ? await loadAzureNamespaces(cancelSource) : null;
    } catch (error) {
      if (isMounted?.current === true) {
        setError(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadAzureNamespaces = async (cancelSource) => {
      setNamespaces([]);
      const res = await helmStepActions.getAzureNamespaces(getAccessToken, cancelSource, clusterName, clusterType, azureToolConfigId, azureCredentialId, resourceGroup);
      if (res && res.status === 200) {
        if (res.data.length === 0) {
          return;
        }
        setNamespaces(res.data);
        return;
      }
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={namespaces}
      textField={textField}
      valueField={valueField}
      error={error}
      busy={isLoading}
      singularTopic={"Namespace"}
      pluralTopic={"Namespaces"}
      disabled={disabled || isLoading || (!isLoading && (namespaces == null || namespaces.length === 0))}
    />
  );
}

HelmAzureNamespaceSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  awsToolConfigId: PropTypes.string,
  clusterData: PropTypes.array,
  clusterName: PropTypes.string,
  resourceGroup: PropTypes.string,
  azureToolConfigId: PropTypes.string,
  clusterType: PropTypes.string,
  azureCredentialId: PropTypes.string
};

HelmAzureNamespaceSelectInput.defaultProps = {
  fieldName: "namespace",
  textField: "namespace",
  valueField: "namespace",
};

export default HelmAzureNamespaceSelectInput;
