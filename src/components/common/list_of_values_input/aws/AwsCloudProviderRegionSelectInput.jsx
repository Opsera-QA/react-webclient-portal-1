import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import {DialogToastContext} from "contexts/DialogToastContext";
import userActions from "components/user/user-actions";

function AwsCloudProviderRegionSelectInput({ fieldName, model, setModel, disabled, textField, valueField}) {
  const toastContext = useContext(DialogToastContext);
  const [cloudProviderRegions, setCloudProviderRegions] = useState([]);
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
      await loadAwsRegions(cancelSource);
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const loadAwsRegions = async (cancelSource = cancelTokenSource) => {
    try {
      const response = await userActions.getAwsRegionsV2(cancelSource);
      const regions = response?.data?.data;
      if (Array.isArray(regions)) {
        setCloudProviderRegions(regions);
      }
    } catch (error) {
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    }
  };

  const getPlaceholderText = () => {
    if (!isLoading && (cloudProviderRegions == null || cloudProviderRegions.length === 0)) {
      return ("AWS Region information is missing or unavailable!");
    }

    return ("Select AWS Region");
  };

  if (!isLoading && (cloudProviderRegions == null || cloudProviderRegions.length === 0)) {
    return (
      <div className="form-text text-muted p-2">
        AWS Regions information is missing or unavailable!
      </div>
    );
  }

  return (
    <div>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={model}
        setDataObject={setModel}
        selectOptions={cloudProviderRegions}
        busy={isLoading}
        valueField={valueField}
        textField={textField}
        placeholderText={getPlaceholderText()}
        disabled={disabled || isLoading}
      />
    </div>
  );
}

AwsCloudProviderRegionSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string
};

AwsCloudProviderRegionSelectInput.defaultProps = {
  valueField: "value",
  textField: "text",
};

export default AwsCloudProviderRegionSelectInput;