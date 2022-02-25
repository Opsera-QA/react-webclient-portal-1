import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import {DialogToastContext} from "contexts/DialogToastContext";
import userActions from "components/user/user-actions";

function TerraformS3BucketRegionSelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField}) {
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
      return ("S3 Bucket Region information is missing or unavailable!");
    }

    return ("Select S3 Bucket Region");
  };

  if (!isLoading && (cloudProviderRegions == null || cloudProviderRegions.length === 0)) {
    return (
      <div className="form-text text-muted p-2">
        S3 Bucket Region information is missing or unavailable!
      </div>
    );
  }

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
        placeholderText={getPlaceholderText()}
        disabled={disabled || isLoading}
      />
    </div>
  );
}

TerraformS3BucketRegionSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string
};

TerraformS3BucketRegionSelectInput.defaultProps = {
  valueField: "value",
  textField: "text"
};

export default TerraformS3BucketRegionSelectInput;
