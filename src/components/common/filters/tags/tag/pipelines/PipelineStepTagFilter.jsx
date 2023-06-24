import React from "react";
import PropTypes from "prop-types";
import FilterSelectInputBase from "components/common/filters/input/FilterSelectInputBase";
import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";
import useGetPipelineStepAppliedTags from "hooks/workflow/pipelines/tags/useGetPipelineStepAppliedTags";

export default function PipelineStepTagFilter(
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
  } = useGetPipelineStepAppliedTags();

  const getTextFieldString = (tag) => {
    if (tag == null) {
      return "Select Pipeline Step Tag";
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
        fieldName={"stepTag"}
        busy={isLoading}
        placeholderText={"Filter by Pipeline Step Tag"}
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

PipelineStepTagFilter.propTypes = {
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  className: PropTypes.string,
  valueField: PropTypes.string,
};
