import React from "react";
import PropTypes from "prop-types";
import NumberPicker from "react-widgets/lib/NumberPicker";

function PipelineRunFilter({ filterDto, setFilterDto, maximumRunCount}) {
  const validateAndSetData = (fieldName, value) => {
    let newDataObject = filterDto;
    newDataObject.setData(fieldName, value);
    setFilterDto({...newDataObject});
  };

  // if (field == null) {
  //   return <WarningDialog warningMessage={"No field was found for this filter"} />
  // }

  return (
    <div className="run-filter">
      <NumberPicker
        type="number"
        placeholder={"Pipeline Run"}
        disabled={maximumRunCount ? maximumRunCount < 2 : false}
        value={filterDto.getData("run")}
        className="max-content-width"
        onChange={(data) => validateAndSetData("run", data)}
        min={1}
        max={maximumRunCount}
        />
    </div>
  );
}

PipelineRunFilter.propTypes = {
  filterDto: PropTypes.object,
  setFilterDto: PropTypes.func,
  runCount: PropTypes.number
};

export default PipelineRunFilter;


