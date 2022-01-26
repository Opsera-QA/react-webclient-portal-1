import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import { DialogToastContext } from "contexts/DialogToastContext";
import userActions from "components/user/user-actions";

function AWSRegionSelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField, awsTool }) {
  const toastContext = useContext(DialogToastContext);
  const [cloudProviderRegions, setCloudProviderRegions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [placeholder, setPlaceholder] = useState("Select an AWS Region");
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
  }, [awsTool]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadAwsRegions(cancelSource);
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadAwsRegions = async (cancelSource = cancelTokenSource) => {
    try {
      const response = await userActions.getAwsRegionsV2(cancelSource);
      const regions = response?.data?.data;
      if (Array.isArray(regions)) {
        setCloudProviderRegions(regions);
        return;
      }
      if (!isLoading && (cloudProviderRegions == null || cloudProviderRegions.length === 0)) {
        setPlaceholder("AWS Region information is missing or unavailable!");
      }
    } catch (error) {
      setPlaceholder("Error pulling region information");

      console.error(error);
      toastContext.showServiceUnavailableDialog();
    }
  };

  return (
    <div>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        selectOptions={cloudProviderRegions}
        busy={isLoading}
        valueField={valueField}
        textField={textField}
        placeholderText={placeholder}
        disabled={disabled || isLoading}
      />
    </div>
  );
}

AWSRegionSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  awsTool: PropTypes.string
};

AWSRegionSelectInput.defaultProps = {
  valueField: "value",
  textField: "text",
};

export default AWSRegionSelectInput;
