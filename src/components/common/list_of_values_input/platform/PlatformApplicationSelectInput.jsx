import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import platformActions from "components/inventory/platform/platform.actions";

function PlatformApplicationSelectInput(
  {
    visible,
    fieldName,
    placeholderText,
    model,
    setModel,
    setDataFunction,
    clearDataFunction,
    disabled,
    className,
    // TODO: Remove when irrelevant
    filterOldPipelineApplications,
  }) {
  const {getAccessToken} = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    setApplications([]);
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadApplications(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        setErrorMessage("Application information is missing or unavailable!.");
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadApplications = async (cancelSource = cancelTokenSource) => {
    const response = await platformActions.getApplicationsV2(getAccessToken, cancelSource);
    const newApplicationsList = response?.data;

    if (isMounted?.current === true && Array.isArray(newApplicationsList)) {
      if (filterOldPipelineApplications === true) {
        //We don't want the legacy pipeline apps to show.
        const filteredApps = newApplicationsList.filter((app) => {
          return app.type !== "pipeline";
        });
        setApplications(filteredApps);
      } else {
        setApplications(newApplicationsList);
      }
    }
  };

  const getNoDataMessage = () => {
    if (!isLoading && Array.isArray(applications) && applications.length === 0) {
      return ("No Applications have been registered for this account.");
    }
  };

  if (visible === false) {
    return <></>;
  }

  return (
    <SelectInputBase
      fieldName={fieldName}
      className={className}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      selectOptions={applications}
      busy={isLoading}
      placeholderText={placeholderText}
      valueField={"_id"}
      textField={"name"}
      clearDataFunction={clearDataFunction}
      noDataMessage={getNoDataMessage()}
      errorMessage={errorMessage}
      disabled={disabled}
    />
  );
}

PlatformApplicationSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  placeholderText: PropTypes.string,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  className: PropTypes.string,
  clearDataFunction: PropTypes.func,
  filterOldPipelineApplications: PropTypes.bool,
};

PlatformApplicationSelectInput.defaultProps = {
  placeholderText: "Select A Platform Application",
};

export default PlatformApplicationSelectInput;