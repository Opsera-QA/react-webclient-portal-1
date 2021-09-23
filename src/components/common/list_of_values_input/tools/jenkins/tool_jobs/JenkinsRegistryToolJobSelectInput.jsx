import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import toolsActions from "components/inventory/tools/tools-actions";

function JenkinsRegistryToolJobSelectInput({ jenkinsId, visible, typeFilter, fieldName, dataObject, setDataObject, setDataFunction, clearDataFunction, disabled, configurationRequired}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [jenkinsJobs, setJenkinsJobs] = useState([]);
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


    setJenkinsJobs([]);
    if (jenkinsId !== "") {
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
  }, [jenkinsId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadJenkinsJobs(cancelSource);
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const loadJenkinsJobs = async (cancelSource = cancelTokenSource) => {
    const response = await toolsActions.getFullToolByIdV2(getAccessToken, cancelSource, jenkinsId);
    const jenkinsJobs = response?.data?.jobs;

    if (Array.isArray(jenkinsJobs) && jenkinsJobs.length > 0) {
      if (configurationRequired) {
        if (typeFilter) {
          let filteredJobs = jenkinsJobs.filter((job) => {return job.type[0] === typeFilter;});
          setJenkinsJobs(filteredJobs);
        }
        else {
          setJenkinsJobs(jenkinsJobs);
        }
      }
      else {
        if (jenkinsJobs.length > 0 && typeFilter) {
          let filteredJobs = jenkinsJobs.filter((job) => {return job.type[0] === typeFilter;});
          setJenkinsJobs(filteredJobs);
        }
        else {
          setJenkinsJobs(jenkinsJobs);
        }
      }
    }
  };

  const getPlaceholderText = () => {
    if (!isLoading && (jenkinsJobs == null || jenkinsJobs.length === 0 && jenkinsId !== "")) {
      return (`No configured ${typeFilter ? typeFilter + " " : ""} Jenkins Jobs have been registered for this Jenkins tool.`);
    }

    return ("Select Jenkins Job");
  };

  if (visible === false) {
    return <></>;
  }

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      setDataFunction={setDataFunction}
      selectOptions={jenkinsJobs}
      placeholderText={getPlaceholderText()}
      busy={isLoading}
      valueField="name"
      textField="name"
      clearDataFunction={clearDataFunction}
      disabled={disabled || jenkinsId === ""}
    />
  );
}

JenkinsRegistryToolJobSelectInput.propTypes = {
  jenkinsId: PropTypes.string,
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  typeFilter: PropTypes.string,
  configurationRequired: PropTypes.bool,
  clearDataFunction: PropTypes.func
};

export default JenkinsRegistryToolJobSelectInput;