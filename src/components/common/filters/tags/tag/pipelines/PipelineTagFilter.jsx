import React from "react";
import PropTypes from "prop-types";
import FilterSelectInputBase from "components/common/filters/input/FilterSelectInputBase";
import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";
import useGetPipelineAppliedTags from "hooks/workflow/pipelines/tags/useGetPipelineAppliedTags";

export default function PipelineTagFilter(
  {
    filterModel,
    setFilterModel,
    valueField,
    className,
  }) {
  const {
    tags,
    isLoading,
    error,
  } = useGetPipelineAppliedTags();

  const getTextFieldString = (tag) => {
    if (tag == null) {
      return "Select Pipeline Tag";
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
        placeholderText={"Filter by Pipeline Tag"}
        groupBy={"type"}
        setDataFunction={setDataFunction}
        dataObject={filterModel}
        valueField={valueField}
        textField={getTextFieldString}
        error={error}
        selectOptions={tags}
      />
    </div>
  );
}

PipelineTagFilter.propTypes = {
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  className: PropTypes.string,
  valueField: PropTypes.string,
};
