import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import {DialogToastContext} from "contexts/DialogToastContext";
import SentinelStepActions from "../sentinel-stepForm-actions";
import { AuthContext } from "../../../../../../../../../contexts/AuthContext";

function SentinelTagsSelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField}) {
  const toastContext = useContext(DialogToastContext);
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const { getAccessToken } = useContext(AuthContext);
  const [placeholder, setPlaceholderText] = useState("Select Tags");


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
      const res = await SentinelStepActions.getTags(getAccessToken, cancelSource);
      if (res && res.status === 200) {
        setTags(res.data);
        return;
      }
      setTags([]);
      if (!isLoading && (tags == null || tags.length === 0)) {
        setPlaceholderText("No Sentinel Tags found");
      }
    } catch (error) {
      if (!isLoading && (tags == null || tags.length === 0)) {
        setPlaceholderText("Sentinel Tags information is missing or unavailable!");
      }
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
        selectOptions={tags}
        busy={isLoading}
        valueField={valueField}
        textField={textField}
        placeholderText={placeholder}
        disabled={disabled || isLoading}
      />
    </div>
  );
}

SentinelTagsSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string
};

SentinelTagsSelectInput.defaultProps = {
  valueField: "value",
  textField: "text",
  fieldName: "tag",
  disabled: false
};

export default SentinelTagsSelectInput;
