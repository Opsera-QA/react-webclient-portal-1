import React from "react";
import PropTypes from "prop-types";
import FilterSelectInputBase from "components/common/filters/input/FilterSelectInputBase";
import useGetPipelineAppliedToolIdentifiers
  from "hooks/workflow/pipelines/tool_identifiers/useGetPipelineAppliedToolIdentifiers";

export default function PipelineToolIdentifierFilter(
  {
    filterModel,
    setFilterModel,
    className,
  }) {
  const {
    toolIdentifiers,
    isLoading,
    error,
  } = useGetPipelineAppliedToolIdentifiers();

  const setDataFunction = (fieldName, selectedOption) => {
    filterModel.setData("tool_identifier", selectedOption?.identifier);
    filterModel.setData("tool_identifier_name", selectedOption?.name);
    setFilterModel({...filterModel});
  };

  return (
    <div className={className}>
      <FilterSelectInputBase
        fieldName={"tool_identifier"}
        busy={isLoading}
        placeholderText={"Filter by Tool"}
        groupBy={"tool_type_category"}
        dataObject={filterModel}
        setDataObject={setFilterModel}
        setDataFunction={setDataFunction}
        valueField={"identifier"}
        textField={"name"}
        error={error}
        selectOptions={toolIdentifiers}
      />
    </div>
  );
}

PipelineToolIdentifierFilter.propTypes = {
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  className: PropTypes.string,
};
