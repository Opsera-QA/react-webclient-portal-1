import React, {useContext, useEffect, useState, useRef} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import {serviceNowActions} from "components/common/list_of_values_input/tools/service_now/serviceNow.actions";

function ServiceNowGroupSelectInput(
  {
    visible,
    model,
    setModel,
    setDataFunction,
    fieldName,
    disabled,
    serviceNowId,
  }) {
  const { getAccessToken } = useContext(AuthContext);
  const [groups, setGroups] = useState([]);
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
    setGroups([]);

    if (isMongoDbId(serviceNowId) === true) {
      loadGroups(source).catch((error) => {
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

  const loadGroups = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      const response = await serviceNowActions.getServiceNowGroups(getAccessToken, cancelSource, serviceNowId);
      const serviceNowGroups = response?.data?.message;

      if (isMounted?.current === true && Array.isArray(serviceNowGroups)) {
        setGroups(serviceNowGroups);
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
      return "Loading Groups";
    }

    if (serviceNowId === "") {
      return "A ServiceNow Tool must be selected before selecting a Group";
    }

    if (isMongoDbId(serviceNowId) === true && groups.length === 0) {
      return "No Groups found for selected ServiceNow account.";
    }
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      selectOptions={groups}
      busy={isLoading}
      visible={visible}
      valueField={"sys_id"}
      textField={"name"}
      error={error}
      placeholderText={getPlaceholderText()}
      disabled={disabled || isLoading || serviceNowId === "" || groups.length === 0}
    />
  );
}

ServiceNowGroupSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  fieldName: PropTypes.string,
  setDataFunction: PropTypes.func,
  serviceNowId: PropTypes.string,
  disabled: PropTypes.bool,
  visible: PropTypes.bool
};

export default ServiceNowGroupSelectInput;