import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "../../../../contexts/DialogToastContext";
import SelectInputBase from "../../inputs/SelectInputBase";
import userActions from "../../../user/user-actions";

function CloudProviderRegionSelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField}) {
  const toastContext = useContext(DialogToastContext);
  const [cloudProviderRegions, setCloudProviderRegions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true)
      await loadAwsRegions();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const loadAwsRegions = async () => {
    try {
      const res = await userActions.getAWSRegions();
      setCloudProviderRegions(res);
    } catch (error) {
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    }
  };

  if (!isLoading && (cloudProviderRegions == null || cloudProviderRegions.length === 0)) {
    return (
      <div className="form-text text-muted p-2">
        AWS Regions information is missing or unavailable!
      </div>
    )
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
        // placeholderText={placeholderText}
        disabled={disabled || isLoading}
      />
    </div>
  );
}

CloudProviderRegionSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string
};

CloudProviderRegionSelectInput.defaultProps = {
  valueField: "value",
  textField: "text"
};

export default CloudProviderRegionSelectInput;