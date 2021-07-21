import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { AuthContext } from "../../../../../../contexts/AuthContext";
import axios from "axios";
import ECSCreationActions from "../ecs-creation-actions";

function InstanceTypeSelectInput({
                              fieldName,
                              dataObject,
                              setDataObject,
                              disabled,
                              textField,
                              valueField,
                              awstoolId,
                              pipelineId,
                            }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [instanceTypes, setInstanceTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Select a Instance Type");
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
  }, [awstoolId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadTypes(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loadTypes = async (cancelSource) => {
    try {
      setInstanceTypes([]);
      const res = await ECSCreationActions.getEc2ImageTypes(dataObject, getAccessToken, cancelSource);
      if (res && res.status === 200) {
        if (res.data.images.length === 0) {
          setPlaceholder("No Instance Types Found");
          return;
        }
        setPlaceholder("Select a Instance Type");
        setInstanceTypes(res.data.images);
        return;
      }
      setPlaceholder("No Instance Types Found");
      setInstanceTypes([]);
    } catch (error) {
      setPlaceholder("No Instance Types Found");
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    }
  };

  return (
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        selectOptions={instanceTypes}
        busy={isLoading}
        textField={textField}
        valueField={valueField}
        placeholderText={placeholder}
        disabled={disabled || isLoading || (!isLoading && (instanceTypes == null || instanceTypes.length === 0))}
      />
  );
}

InstanceTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  awstoolId: PropTypes.string,
  pipelineId: PropTypes.string,
};

InstanceTypeSelectInput.defaultProps = {
  fieldName: "instanceType",
  textField: "key",
  valueField: "value",
};

export default InstanceTypeSelectInput;
