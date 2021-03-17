import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import { Multiselect } from 'react-widgets'
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import adminTagsActions from "components/settings/tags/admin-tags-actions";
import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";

function TagMultiSelectInputBase({ fieldName, dataObject, setDataObject, disabled, setDataFunction, className}) {
  const { getAccessToken } = useContext(AuthContext);
  const [field] = useState(dataObject.getFieldById(fieldName));
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
    }
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

    dataObject.getArrayData(fieldName).map((tag, index) => {
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
  }

  const loadTagOptions = (tags) => {
    let currentOptions = [];

    tags.map((tag, index) => {
      let tagOption = {type: tag["type"], value: tag["value"]};
      currentOptions.push(tagOption);
    });

    if (isMounted?.current === true) {
      setTagOptions(currentOptions);
    }
  }

  const validateAndSetData = (fieldName, value) => {
    let newDataObject = dataObject;
    newDataObject.setData(fieldName, value);

    if (isMounted?.current === true) {
      setDataObject({...newDataObject});
    }
  };

  const getPlaceholderText = () => {
    if (errorMessage) {
      return errorMessage;
    }

    return "Select Tags"
  };

  if (field == null) {
    return null;
  }

  return (
    <div className={className}>
      <Multiselect
        data={[...tagOptions]}
        textField={(data) => capitalizeFirstLetter(data["type"]) + ": " + data["value"]}
        filter={"contains"}
        groupBy={"type"}
        busy={isLoading}
        value={[...dataObject?.getArrayData(fieldName)]}
        placeholder={getPlaceholderText()}
        disabled={disabled || isLoading}
        onChange={(tag) => setDataFunction ? setDataFunction(field.id, tag) : validateAndSetData(field.id, tag)}
      />
    </div>
  );
}

TagMultiSelectInputBase.propTypes = {
  setDataObject: PropTypes.func,
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

TagMultiSelectInputBase.defaultProps = {
  fieldName: "tags"
}

export default TagMultiSelectInputBase;