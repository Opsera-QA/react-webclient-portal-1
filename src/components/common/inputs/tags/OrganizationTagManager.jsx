import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import adminTagsActions from "components/settings/tags/admin-tags-actions";
import InfoText from "components/common/inputs/info_text/InfoText";
import InputContainer from "components/common/inputs/InputContainer";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import {capitalizeFirstLetter, hasStringValue} from "components/common/helpers/string-helpers";
import StandaloneMultiSelectInput from "components/common/inputs/multi_select/StandaloneMultiSelectInput";
import {fieldValidation} from "core/data_model/modelValidation";

function SelectTagsFromOrganizationTags(
  {
    fieldName,
    dataObject,
    setDataObject,
    disabled,
    setDataFunction,
    inline,
    placeholderText,
  }) {
  const { getAccessToken } = useContext(AuthContext);
  const field = dataObject?.getFieldById(fieldName);
  const [organizationTagOptions, setOrganizationTagOptions] = useState([]);
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
      await getOrganizationTags(cancelSource);
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

  const getOrganizationTags = async (cancelSource = cancelTokenSource) => {
    const response = await adminTagsActions.getOrganizationTags(getAccessToken, cancelSource);
    let organizationTags = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(organizationTags) && organizationTags.length > 0) {
      loadTagOptions(organizationTags);
    }
  };

  const loadTagOptions = (organizationTags) => {
    let currentOptions = [];

    organizationTags.map((tag) => {
      if (!dataObject.getArrayData(fieldName).some(item => item._id === tag._id && item.name === tag.name)) {
        currentOptions.push(tag);
      }
    });

    if (isMounted?.current === true) {
      setOrganizationTagOptions(currentOptions);
    }
  };

  const validateAndSetData = (fieldName, value) => {
    const errors = fieldValidation(value, dataObject, field);

    if (Array.isArray(errors) && errors.length > 0) {
      setErrorMessage(errors[0]);
      return;
    }

    setErrorMessage("");
    let newDataObject = {...dataObject};
    newDataObject.setData(fieldName, value);

    if (isMounted?.current === true) {
      setDataObject({...newDataObject});
    }
  };

  const hasWarningState = () => {
    return field.noItemsWarning && dataObject?.getArrayData(fieldName)?.length === 0;
  };

  const setOrgTagsData = (orgTags) => {
    return setDataFunction ? setDataFunction(field.id, orgTags) : validateAndSetData(field.id, orgTags);
  };

  if (field == null) {
    return null;
  }

  return (
    <InputContainer fieldName={fieldName}>
      <InputLabel
        showLabel={inline !== true}
        model={dataObject}
        field={field}
        hasError={hasStringValue(errorMessage) === true}
        hasWarningState={hasWarningState()}
        disabled={disabled}
        isLoading={isLoading}
      />
      <div className={"custom-multiselect-input"}>
        <StandaloneMultiSelectInput
          hasErrorState={hasStringValue(errorMessage)}
          hasWarningState={hasWarningState()}
          selectOptions={[...organizationTagOptions]}
          textField={(data) => capitalizeFirstLetter(data["name"])}
          className={inline ? `inline-filter-input inline-select-filter` : undefined}
          busy={isLoading}
          value={dataObject?.getArrayData(fieldName)}
          placeholderText={errorMessage ? errorMessage : placeholderText}
          disabled={disabled || isLoading}
          setDataFunction={setOrgTagsData}
        />
      </div>
      <InfoText
        fieldName={fieldName}
        model={dataObject}
        field={field}
        errorMessage={errorMessage}
      />
    </InputContainer>
  );
}

SelectTagsFromOrganizationTags.propTypes = {
  setDataObject: PropTypes.func,
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  inline: PropTypes.bool,
  placeholderText: PropTypes.string,
};

SelectTagsFromOrganizationTags.defaultProps = {
  fieldName: "orgTags",
  inline: false,
  placeholderText: "Select Organization Tags"
};

export default SelectTagsFromOrganizationTags;