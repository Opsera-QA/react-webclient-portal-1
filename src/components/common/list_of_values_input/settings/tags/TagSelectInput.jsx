import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import adminTagsActions from "components/settings/tags/admin-tags-actions";
import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function TagSelectInput({ fieldName, dataObject, setDataObject, disabled, setDataFunction, showLabel, className, allowedTypes, getCurrentValue}) {
  const { getAccessToken } = useContext(AuthContext);
  const [tagOptions, setTagOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState("");

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
      await getTags(cancelSource);
      await removeOldTags();
    }
    catch (error) {
      if (isMounted?.current === true) {
        setErrorMessage("Could not load tags.");
        console.error(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getTags = async (cancelSource = cancelTokenSource) => {
    const response = await adminTagsActions.getAllTagsV2(getAccessToken, cancelSource);
    let tags = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(tags) && tags.length > 0) {
      loadTagOptions(tags);
    }
  };

  const removeOldTags = async () => {
    let newTags = [];

    dataObject.getArrayData(fieldName).forEach((tag) => {
      if (tag["type"] != null && tag["type"] !== "" && tag["value"] != null && tag["value"] !== "")
      {
        let tagOption = {type: tag["type"], value: tag["value"]};
        newTags.push(tagOption);
      }
    });
    let newDataObject = dataObject;
    newDataObject.setData(fieldName, newTags);

    if (isMounted?.current === true) {
      setDataObject({...newDataObject});
    }
  };

  const loadTagOptions = (tags) => {
    let currentOptions = [];

    tags.map((tag) => {
      let tagOption = {type: tag["type"], value: tag["value"]};
      
      if (Array.isArray(allowedTypes) && allowedTypes.length > 0) {
        if (allowedTypes.includes(tagOption.type)) {
          currentOptions.push(tagOption);
        }
      }
      else {
        currentOptions.push(tagOption);
      }
    });

    if (isMounted?.current === true) {
      setTagOptions(currentOptions);
    }
  };

  const getPlaceholderText = () => {
    if (errorMessage) {
      return errorMessage;
    }

    return "Select Tag";
  };

  return (
    <SelectInputBase
      dataObject={dataObject}
      setDataObject={setDataObject}
      setDataFunction={setDataFunction}
      fieldName={fieldName}
      showLabel={showLabel}
      className={className}
      selectOptions={[...tagOptions]}
      textField={(data) => data?.type != null ? capitalizeFirstLetter(data?.type) + ": " + capitalizeFirstLetter(data?.value) : null}
      filter={"contains"}
      groupBy={"type"}
      busy={isLoading}
      getCurrentValue={getCurrentValue}
      placeholder={getPlaceholderText()}
      disabled={disabled || isLoading}
    />
  );
}

TagSelectInput.propTypes = {
  setDataObject: PropTypes.func,
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataFunction: PropTypes.func,
  showLabel: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  allowedTypes: PropTypes.array,
  getCurrentValue: PropTypes.func
};

export default TagSelectInput;