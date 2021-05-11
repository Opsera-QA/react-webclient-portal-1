import React from "react";
import PropTypes from "prop-types";
import NumberPicker from "react-widgets/lib/NumberPicker";
import simpleNumberLocalizer from "react-widgets-simple-number";

function PipelineRunFilter({ filterDto, setFilterDto, maximumRunCount, className}) {
  simpleNumberLocalizer();

  const validateAndSetData = (fieldName, value) => {
    let newDataObject = filterDto;
    newDataObject.setData(fieldName, value);
    setFilterDto({...newDataObject});
  };

  if (filterDto == null) {
    return null;
  }

  return (
    <div className={className}>
      <div className={"d-flex"}>
        <span className="mt-2 mr-2 w-25">Pipeline Run:</span>
        <NumberPicker
          type="number"
          placeholder={"Pipeline Run"}
          disabled={maximumRunCount ? maximumRunCount < 2 : false}
          value={filterDto.getData("run")}
          className="w-75"
          onChange={(data) => validateAndSetData("run", data)}
          min={0}
          max={maximumRunCount}
        />
      </div>
    </div>
  );
}

PipelineRunFilter.propTypes = {
  filterDto: PropTypes.object,
  setFilterDto: PropTypes.func,
  maximumRunCount: PropTypes.number,
  className: PropTypes.string
};

PipelineRunFilter.defaultProps = {
  maximumRunCount: 0
};

export default PipelineRunFilter;


