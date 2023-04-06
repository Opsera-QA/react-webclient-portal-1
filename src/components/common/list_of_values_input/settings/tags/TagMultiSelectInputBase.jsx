import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";
import StandaloneMultiSelectInput from "components/common/inputs/multi_select/StandaloneMultiSelectInput";
import TagParsingHelper from "@opsera/persephone/helpers/data/tags/tagParsing.helper";
import useGetCustomerTags from "hooks/settings/tags/useGetCustomerTags";

export default function TagMultiSelectInputBase(
  {
    fieldName,
    model,
    setModel,
    disabled,
    setDataFunction,
    className,
  }) {
  const field = model.getFieldById(fieldName);
  const {
    customerTags,
    error,
    isLoading,
  } = useGetCustomerTags();

  useEffect(() => {}, []);

  const validateAndSetData = (fieldName, newTagArray) => {
    model.setData(fieldName, newTagArray);
    setModel({...model});
  };

  const getPlaceholderText = () => {
    if (error) {
      return error;
    }

    return "Select Tags";
  };

  if (field == null) {
    return null;
  }

  return (
    <div className={className}>
      <div className={"custom-multiselect-input"}>
        <StandaloneMultiSelectInput
          selectOptions={[...customerTags]}
          textField={(data) => capitalizeFirstLetter(data["type"]) + ": " + data["value"]}
          filter={"contains"}
          groupBy={"type"}
          busy={isLoading}
          value={[...model?.getArrayData(fieldName)]}
          placeholderText={getPlaceholderText()}
          disabled={disabled || isLoading}
          setDataFunction={(tagArray) => setDataFunction ? setDataFunction(field.id, TagParsingHelper.parseTagArray(tagArray)) : validateAndSetData(field.id, TagParsingHelper.parseTagArray(tagArray))}
        />
      </div>
    </div>
  );
}

TagMultiSelectInputBase.propTypes = {
  setDataFunction: PropTypes.func,
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

TagMultiSelectInputBase.defaultProps = {
  fieldName: "tags"
};
