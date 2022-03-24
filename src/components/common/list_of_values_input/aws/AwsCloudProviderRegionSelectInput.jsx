import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import userActions from "components/user/user-actions";

function AwsCloudProviderRegionSelectInput(
  {
    fieldName,
    model,
    setModel,
    disabled,
    textField,
    valueField,
  }) {
  const [cloudProviderRegions, setCloudProviderRegions] = useState([]);
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
      setError(undefined);
      await loadAwsRegions(cancelSource);
    }
    catch (error) {
      if (isMounted.current === true) {
        setError(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadAwsRegions = async (cancelSource = cancelTokenSource) => {
    const response = await userActions.getAwsRegionsV2(cancelSource);
    const regions = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(regions)) {
      setCloudProviderRegions(regions);
    }
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={cloudProviderRegions}
      busy={isLoading}
      valueField={valueField}
      textField={textField}
      error={error}
      disabled={disabled}
    />
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