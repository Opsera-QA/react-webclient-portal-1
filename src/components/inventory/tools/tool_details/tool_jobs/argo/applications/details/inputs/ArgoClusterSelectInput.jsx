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
        console.error(error);
        toastContext.showInlineErrorMessage(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadClusters = async (argoToolId, cancelSource = cancelTokenSource) => {
    const response = await argoActions.getArgoClustersV2(getAccessToken, cancelSource, argoToolId);
    const clusters = response?.data?.data;

    if (isMounted?.current === true && response?.status === 200 && Array.isArray(clusters)) {
      setClusters(clusters);
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

  const formatText = (item) => {
    const name = item?.name !== "" ? item?.name : "No Cluster Name";
    const serverUrl = item?.server;

    return (`${name}: ${serverUrl}`);
  };

  if (visible === false) {
    return null;
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
        textField={formatText}
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

export default ArgoClusterSelectInput;