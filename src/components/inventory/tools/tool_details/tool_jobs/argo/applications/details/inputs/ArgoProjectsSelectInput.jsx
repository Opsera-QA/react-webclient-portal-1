import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import argoActions from "../../../argo-actions";
import axios from "axios";

function ArgoProjectsSelectInput({ argoToolId, visible, fieldName, dataObject, setDataObject, setDataFunction, clearDataFunction, disabled, className}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);    
  const [projects, setProjects] = useState([]);
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
      await loadProjects(argoToolId, cancelSource);
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

  const loadProjects = async (argoToolId, cancelSource = cancelTokenSource) => {
    const projects = await argoActions.getArgoProjectsV2(argoToolId, getAccessToken, cancelSource);

    if (isMounted?.current === true && projects?.data) {
      if (projects.status === 200 && projects.data && projects.data.data && projects.data.data.length > 0) {
        setProjects(projects.data.data);
      }
    }
  };

  const getNoProjectsMessage = () => {
    if (!isLoading && (projects == null || projects.length === 0 && argoToolId !== "")) {
      return (
        <div className="form-text text-muted p-2">
          <FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth />
          No configured Argo Projects have been registered for this tool.
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
        selectOptions={projects}
        busy={isLoading}
        valueField="name"
        textField="name"
        clearDataFunction={clearDataFunction}
        disabled={disabled || isLoading || argoToolId === "" || projects?.length === 0}
      />
      {getNoProjectsMessage()}
    </div>
  );
}

ArgoProjectsSelectInput.propTypes = {
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

ArgoProjectsSelectInput.defaultProps = {
  visible: true,
};

export default ArgoProjectsSelectInput;