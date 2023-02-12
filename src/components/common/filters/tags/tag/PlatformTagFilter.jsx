import React from "react";
import PropTypes from "prop-types";
import FilterSelectInputBase from "components/common/filters/input/FilterSelectInputBase";
import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";
import useGetPlatformTags from "hooks/settings/tags/useGetPlatformTags";

export default function PlatformTagFilter(
  {
    filterModel,
    setFilterModel,
    className,
  }) {
  const {
    isLoading,
    platformTags,
    error,
  } = useGetPlatformTags();

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
        fieldName={"tag"}
        busy={isLoading}
        placeholderText={"Filter by Tag"}
        groupBy={"type"}
        setDataObject={setFilterModel}
        setDataFunction={setDataFunction}
        dataObject={filterModel}
        textField={getTextFieldString}
        selectOptions={platformTags}
        error={error}
      />
    </div>
  );
}

PlatformTagFilter.propTypes = {
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  className: PropTypes.string,
};

