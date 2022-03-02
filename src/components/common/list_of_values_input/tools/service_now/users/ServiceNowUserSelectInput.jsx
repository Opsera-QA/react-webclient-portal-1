import React, {useContext, useEffect, useState, useRef} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import {serviceNowActions} from "components/common/list_of_values_input/tools/service_now/serviceNow.actions";

function ServiceNowUserSelectInput(
  {
    visible,
    model,
    setModel,
    disabled,
    serviceNowId,
    fieldName,
    setDataFunction,
  }) {
  const { getAccessToken } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    setUsers([]);
    setError(undefined);

    if (isMongoDbId(serviceNowId) === true) {
      loadUsers(source).catch((error) => {
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

  const loadUsers = async (cancelSource = cancelTokenSource) => {
    try{
      setIsLoading(true);
      const response = await serviceNowActions.getServiceNowUsers(getAccessToken, cancelSource, serviceNowId);
      const serviceNowUsers = response?.data?.data;

      if (isMounted?.current === true && Array.isArray(serviceNowUsers)) {
        setUsers(serviceNowUsers);
      }
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

  const getPlaceholderText = () => {
    if (isLoading) {
      return ("Loading Users");
    }

    if (serviceNowId === "") {
      return ("A ServiceNow Tool must be selected before selecting User");
    }

    if (isMongoDbId(serviceNowId) === true && users.length === 0) {
      return "No Users found for selected ServiceNow account";
    }
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      error={error}
      visible={visible}
      selectOptions={users}
      busy={isLoading}
      valueField={"sys_id"}
      textField={"name"}
      placeholderText={getPlaceholderText()}
      disabled={disabled}
    />
  );
}

ServiceNowUserSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  fieldName: PropTypes.string,
  serviceNowId: PropTypes.string,
  disabled: PropTypes.bool,
  visible: PropTypes.bool
};

export default ServiceNowUserSelectInput;