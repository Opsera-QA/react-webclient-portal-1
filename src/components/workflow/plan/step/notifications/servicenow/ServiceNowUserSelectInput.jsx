import React, {useContext, useEffect, useState, useRef} from "react";
import PropTypes from "prop-types";
import pipelineStepNotificationActions from "components/workflow/plan/step/notifications/pipelineStepNotification.actions";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function ServiceNowUserSelectInput({visible, dataObject, setDataObject, disabled, serviceNowId}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const isMounted = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    setUsers([]);
    if (serviceNowId) {
      loadUsers(serviceNowId, source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
    }
    
    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [serviceNowId]);

  const loadUsers = async (serviceNowId, cancelSource = cancelTokenSource) => {
    try{
      setIsLoading(true);
      const response = await pipelineStepNotificationActions.getServiceNowUsers(serviceNowId, getAccessToken, cancelSource);

      if (response.data != null && response.data.message != null && Array.isArray(response.data.message)) {
        setUsers(response.data.message);
      }
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showErrorDialog("Tool information is missing or unavailable! Please ensure the required credentials are registered and up to date in Tool Registry.");
      }
    } finally {
        if (isMounted?.current === true) {
          setIsLoading(false);
        }
    }
    
  };

  const getPlaceholderText = () => {
    if (isLoading) {
      return "Loading Users";
    }

    if (serviceNowId === "") {
      return "A ServiceNow Tool must be selected before selecting User";
    }

    if (!isLoading && serviceNowId !== "" && users.length === 0) {
      return "No Users found for selected ServiceNow account.";
    }
  };

  if (!visible) {
    return <></>;
  }

  return (
    <SelectInputBase
      fieldName={"serviceNowUserId"}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={users}
      busy={isLoading}
      valueField="sys_id"
      textField="name"
      placeholderText={getPlaceholderText()}
      disabled={disabled || isLoading || serviceNowId === "" || users.length === 0}
    />
  );
}

ServiceNowUserSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  serviceNowId: PropTypes.string,
  disabled: PropTypes.bool,
  visible: PropTypes.bool
};

ServiceNowUserSelectInput.defaultProps = {
  visible: true
};

export default ServiceNowUserSelectInput;