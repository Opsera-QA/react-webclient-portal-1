import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import argoActions from "components/inventory/tools/tool_details/tool_jobs/argo/argo-actions";

function HelmAwsClusterSelectInput({
  fieldName,
  model,
  setModel,
  disabled,
  textField,
  valueField,
  awsToolConfigId,
  clusterData
}) {
  const { getAccessToken } = useContext(AuthContext);
  const [clusters, setClusters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

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
  }, [awsToolConfigId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadAwsClusters(cancelSource);
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

  const loadAwsClusters = async (cancelSource) => {
      setClusters([]);
      const res = await argoActions.getAwsEksClusters(getAccessToken, cancelSource, awsToolConfigId);
      if (res && res.status === 200) {
        if (res.data.length === 0) {
          return;
        }
        const clusterNames = clusterData.map(c => c.name.trim());                
        const tempClusters = res.data.filter(cluster => !clusterNames.includes(cluster));
        setClusters(tempClusters);
        return;
      }
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={clusters}
      textField={textField}
      valueField={valueField}
      error={error}
      busy={isLoading}
      singularTopic={"Cluster"}
      pluralTopic={"Clusters"}
      disabled={disabled || isLoading || (!isLoading && (clusters == null || clusters.length === 0))}
    />
  );
}

HelmAwsClusterSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  awsToolConfigId: PropTypes.string,
  clusterData: PropTypes.array,
};

HelmAwsClusterSelectInput.defaultProps = {
  fieldName: "clusterName",
  textField: "clusterName",
  valueField: "clusterName",
};

export default HelmAwsClusterSelectInput;
