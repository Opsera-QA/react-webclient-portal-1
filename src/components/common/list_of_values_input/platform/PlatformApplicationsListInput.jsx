import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import deleteToolsActions from "components/settings/delete_tools/settings-delete-tools-action.js";
import axios from "axios";

function PlatformApplicationsListInput({ visible, fieldName, placeholderText, dataObject, setDataObject, setDataFunction, clearDataFunction, disabled, configurationRequired, className}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
    }
    catch (error) {
      if (isMounted?.current === true) {
        toastContext.showErrorDialog("Application information is missing or unavailable!.");
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadApplications = async (cancelSource = cancelTokenSource) => {
    const response = await deleteToolsActions.getAllApplicationsV2(getAccessToken, cancelSource);
    if (isMounted?.current === true && response?.data) { 
      setApplications(response?.data);
    }
  };

  const getNoApplicationMessage = () => {
    if (!isLoading && (applications == null || applications.length === 0)) {
      return (
        <div className="form-text text-muted p-2">
          <FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth />
          No Applications have been registered for this account.
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
        selectOptions={applications}
        busy={isLoading}
        placeholderText={placeholderText}
        valueField="_id"
        textField="name"
        clearDataFunction={clearDataFunction}
        disabled={disabled}
      />
      {getNoApplicationMessage()}
    </div>
  );
}

PlatformApplicationsListInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  setDataFunction: PropTypes.func,
  placeholderText: PropTypes.string,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  typeFilter: PropTypes.string,
  configurationRequired: PropTypes.bool,
  className: PropTypes.string,
  clearDataFunction: PropTypes.func
};

PlatformApplicationsListInput.defaultProps = {
  visible: true,
  placeholderText: "Select One",
};

export default PlatformApplicationsListInput;