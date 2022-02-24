import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import argoActions from "components/inventory/tools/tool_details/tool_jobs/argo/argo-actions";
import axios from "axios";

function ArgoRepositorySelectInput({ argoToolId, visible, fieldName, dataObject, setDataObject, setDataFunction, clearDataFunction, disabled, className}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);  
  const [repositories, setRepositories] = useState([]);
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
      await loadRepositories(argoToolId, cancelSource);
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

  const loadRepositories = async (argoToolId, cancelSource = cancelTokenSource) => {
    const response = await argoActions.getArgoRepositories(getAccessToken, cancelSource, argoToolId);
    const repos = response?.data?.data;

    if (isMounted?.current === true && response?.status === 200 && Array.isArray(repos)) {
      setRepositories(repos);
    }
  };

  const getNoRepositoriesMessage = () => {
    if (!isLoading && (repositories == null || repositories.length === 0 && argoToolId !== "")) {
      return (
        <div className="form-text text-muted p-2">
          <FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth />
          No configured Argo repositories availalble for this tool.
        </div>
      );
    }
  };

  const formatText = (item) => {
    const name = item?.username !== "" ? item?.username : "No Repository Name";
    const serverUrl = item?.repo;

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
        selectOptions={repositories}
        busy={isLoading}
        valueField="repo"
        textField={formatText}
        clearDataFunction={clearDataFunction}
        disabled={disabled || isLoading || argoToolId === "" || repositories?.length === 0}
      />
      {getNoRepositoriesMessage()}
    </div>
  );
}

ArgoRepositorySelectInput.propTypes = {
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

export default ArgoRepositorySelectInput;