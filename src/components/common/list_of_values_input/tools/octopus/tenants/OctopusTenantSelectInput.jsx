import React, { useContext, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { DialogToastContext } from 'contexts/DialogToastContext';
import { AuthContext } from 'contexts/AuthContext';
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from 'axios';
import OctopusStepActions
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/octopus/octopus-step-actions";

const OctopusTenantSelectInput = (
  {
    octopusToolId,
    spaceId,
    projectId,
    environmentId,
    disabled,
    value,
    textField,
    valueField,
    setDataFunction
  }) => {
  const toastContext = useContext(DialogToastContext);
  const {getAccessToken} = useContext(AuthContext);
  const [placeholderText, setPlaceholderText] = useState("Select a Tenant");
  const [tenants, setTenants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const isMounted = useRef(false);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    setTenants([]);

    if (
      octopusToolId !== "" && octopusToolId != null
      && spaceId !== "" && spaceId != null
      && projectId !== "" && projectId != null
      && environmentId !== "" && environmentId != null
    ) {
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

  }, [octopusToolId, spaceId, projectId, environmentId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      setTenants([]);
      const response = await OctopusStepActions.getTenantsV2(
        getAccessToken,
        cancelSource,
        octopusToolId,
        spaceId,
        projectId,
        environmentId,
      );
      const tenants = response?.data?.data;

      if (Array.isArray(tenants)) {
        setTenants(tenants);
      }
    } catch (error) {
      setPlaceholderText("No Tenants found");
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SelectInputBase
      selectOptions={tenants}
      valueField={valueField}
      busy={isLoading}
      textField={textField}
      value={value}
      disabled={disabled || !Array.isArray(tenants) || tenants.length === 0}
      placeholderText={placeholderText}
      setDataFunction={(newValue) => setDataFunction(newValue)}
    />
  );
};

OctopusTenantSelectInput.propTypes = {
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  textField: PropTypes.string,
  valueField: PropTypes.string,
  octopusToolId: PropTypes.string,
  spaceId: PropTypes.string,
  projectId: PropTypes.string,
  environmentId: PropTypes.string,
  setDataFunction: PropTypes.func,
  value: PropTypes.string,
};

OctopusTenantSelectInput.defaultProps = {
  valueField: "id",
  textField: "name"
};

export default OctopusTenantSelectInput;
