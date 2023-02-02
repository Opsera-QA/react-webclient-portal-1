import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import helmStepActions from "../../helm-step-actions";

function HelmAwsNamespaceSelectInput({
  fieldName,
  model,
  setModel,
  disabled,
  textField,
  valueField,
  awsToolConfigId,
  clusterName
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
  }, [awsToolConfigId, clusterName]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      model.getData("awsToolConfigId") && clusterName ? await loadAwsNamespaces(cancelSource) : null;
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

  const loadAwsNamespaces = async (cancelSource) => {
      setNamespaces([]);
      const res = await helmStepActions.getAwsNamespaces(getAccessToken, cancelSource, awsToolConfigId, clusterName);
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

HelmAwsNamespaceSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  awsToolConfigId: PropTypes.string,
  clusterData: PropTypes.array,
  clusterName: PropTypes.string,
};

HelmAwsNamespaceSelectInput.defaultProps = {
  fieldName: "namespace",
  textField: "namespace",
  valueField: "namespace",
};

export default HelmAwsNamespaceSelectInput;
