import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import {DialogToastContext} from "contexts/DialogToastContext";
import { AuthContext } from "../../../../../../../../../../contexts/AuthContext";
import terraformCloudOrganizationsActions
  from "../../../../../../../../../inventory/tools/tool_details/tool_jobs/terraform_cloud/organizations/terraformCloudOrganizations.actions";

function TerraformCloudOrganizationsSelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField, toolId}) {
  const toastContext = useContext(DialogToastContext);
  const [organizations, setOrganizations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const { getAccessToken } = useContext(AuthContext);
  const [placeholder, setPlaceholderText] = useState("Select Organizations");


  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    if (!disabled) {
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
  }, [toolId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadOrganizations(cancelSource);
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const loadOrganizations = async (cancelSource = cancelTokenSource) => {
    try {
      const res = await terraformCloudOrganizationsActions.getTerraformCloudOrganizations(getAccessToken, cancelSource, toolId);
      const accounts = res?.data;

      if(Array.isArray(accounts)) {
        setOrganizations(accounts);
        return;
      }
      setOrganizations([]);
      if (!isLoading && (organizations == null || organizations.length === 0)) {
        setPlaceholderText("No Organizations found");
      }
    } catch (error) {
      if (!isLoading && (organizations == null || organizations.length === 0)) {
        setPlaceholderText("Organization information is missing or unavailable!");
      }
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    }
  };

  return (
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        selectOptions={organizations}
        busy={isLoading}
        valueField={valueField}
        textField={textField}
        placeholderText={placeholder}
        disabled={disabled || isLoading}
      />
  );
}

TerraformCloudOrganizationsSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  toolId: PropTypes.string
};

TerraformCloudOrganizationsSelectInput.defaultProps = {
  valueField: "value",
  textField: "text",
  fieldName: "organizationName",
  disabled: false
};

export default TerraformCloudOrganizationsSelectInput;
