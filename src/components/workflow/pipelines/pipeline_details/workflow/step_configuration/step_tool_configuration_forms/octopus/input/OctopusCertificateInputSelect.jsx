import React, {useContext, useEffect, useState, useRef} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import OctopusStepActions
  from "../octopus-step-actions";
import axios from "axios";
import { AuthContext } from "../../../../../../../../../contexts/AuthContext";

function OctopusCertificateInputSelect({ fieldName, dataObject, setDataObject, parentDataObject, setParentDataObject, disabled, textField, valueField, tool_prop}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [octopusCerts, setOctopusCerts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Select a Certificate Type");

  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

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
  }, [tool_prop]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadCerts(cancelSource);
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const loadCerts = async (cancelSource) => {
    try {
      const res = await OctopusStepActions.getCerts(parentDataObject.getData("octopusToolId"),parentDataObject.getData("spaceId"), parentDataObject.getData("environmentId"), getAccessToken, cancelSource);
      if (res && res.status === 200) {
        setOctopusCerts(res.data.data);
        return;
      }
      setOctopusCerts([]);
    } catch (error) {
      setPlaceholder("No Certificate Found");
      console.error(error);
      toastContext.showFormErrorBanner(error);
    }
  };

  return (
    <div>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        selectOptions={octopusCerts}
        busy={isLoading}
        valueField={valueField}
        textField={textField}
        placeholderText={placeholder}
        disabled={disabled || isLoading}
      />
    </div>
  );
}

OctopusCertificateInputSelect.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  parentDataObject: PropTypes.object,
  setParentDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  tool_prop: PropTypes.string
};

OctopusCertificateInputSelect.defaultProps = {
  valueField: "thumbprint",
  textField: "name"
};

export default OctopusCertificateInputSelect;