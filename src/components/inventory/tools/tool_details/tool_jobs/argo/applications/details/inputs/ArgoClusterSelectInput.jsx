import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import argoActions from "../../../argo-actions";
import axios from "axios";

function ArgoClusterSelectInput({ argoToolId, visible, fieldName, dataObject, setDataObject, setDataFunction, clearDataFunction, disabled, className}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);  
  const [clusters, setClusters] = useState([]);
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

    loadData(argoToolId,source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [argoToolId]);

  const loadData = async (argoToolId, cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadClusters(argoToolId, cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        toastContext.showErrorDialog("Tool information is missing or unavailable! Please ensure the required credentials are registered and up to date in Tool Registry.");
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadClusters = async (argoToolId, cancelSource = cancelTokenSource) => {
    // const response = await pipelineActions.getToolsListV2(getAccessToken, cancelSource, "jenkins");
    const clusters = await argoActions.getArgoClustersV2(argoToolId, getAccessToken, cancelSource);

    if (isMounted?.current === true && clusters?.data) {
      if (clusters.status === 200 && clusters.data && clusters.data.data && clusters.data.data.length > 0) {
        setClusters(clusters.data.data);
      }
    }
  };

  const getNoClustersMessage = () => {
    if (!isLoading && (clusters == null || clusters.length === 0 && argoToolId !== "")) {
      return (
        <div className="form-text text-muted p-2">
          <FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth />
          No configured Argo clusters have been registered for this tool.
        </div>
      );
    }
  };

  if (!visible) {
    return <></>;
  }

  return (
    <div className={className}>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        setDataFunction={setDataFunction}
        selectOptions={clusters}
        busy={isLoading}
        valueField="server"
        textField="server"
        clearDataFunction={clearDataFunction}
        disabled={disabled || isLoading || argoToolId === "" || clusters?.length === 0}
      />
      {getNoClustersMessage()}
    </div>
  );
}

ArgoClusterSelectInput.propTypes = {
  argoToolId: PropTypes.string,
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  className: PropTypes.string,
  clearDataFunction: PropTypes.func
};

ArgoClusterSelectInput.defaultProps = {
  visible: true,
};

export default ArgoClusterSelectInput;