import React from "react";
import PropTypes from "prop-types";
import FilterSelectInputBase from "components/common/filters/input/FilterSelectInputBase";
import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";
import useGetCustomerTags from "hooks/settings/tags/useGetCustomerTags";

export default function CustomerTagFilter(
  {
    filterModel,
    setFilterModel,
    fieldName,
    className,
  }) {
  const {
    isLoading,
    customerTags,
    error,
  } = useGetCustomerTags();

  const getTextFieldString = (tag) => {
    if (tag == null) {
      return "Select Tag";
    }

    return `${capitalizeFirstLetter(tag?.type)}: ${tag?.value}`;
  };

  const setDataFunction = (fieldName, tag) => {
    filterModel.setData(fieldName, tag);
    setFilterModel({...filterModel});
  };

  return (
    <div className={className}>
      <FilterSelectInputBase
        fieldName={fieldName}
        busy={isLoading}
        placeholderText={"Filter by Tag"}
        groupBy={"type"}
        setDataObject={setFilterModel}
        setDataFunction={setDataFunction}
        dataObject={filterModel}
        textField={getTextFieldString}
        selectOptions={customerTags}
        error={error}
      />
    </div>
  );
}

CustomerTagFilter.propTypes = {
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  fieldName: PropTypes.string,
  className: PropTypes.string,
};

CustomerTagFilter.defaultProps = {
  fieldName: "tag",
};
