import React, { useState } from "react";
import PropTypes from "prop-types";
import WarningDialog from "../../status_notifications/WarningDialog";
import {Form} from "react-bootstrap";
import InputLabel from "../../form_fields/input/InputLabel";

function BooleanFilter({ fieldName, loadData, filterDto, setFilterDto}) {
  const [field] = useState(filterDto.getFieldById(fieldName));

  const validateAndSetData = (fieldName, value) => {
    let newDataObject = filterDto;
    newDataObject.setData(fieldName, value);
    loadData(newDataObject);
  };

  if (field == null) {
    return <WarningDialog warningMessage={"No field was found for this filter"}/>
  }

  return (
    <div className="d-flex mt-1">
      <div className="mt-1">
        <Form.Check onChange={() => validateAndSetData(field.id, !filterDto.getData(fieldName))} type="switch" id={field.id} checked={!!filterDto.getData(fieldName)} label={""} />
      </div>
      <span>{field.label}</span>
    </div>
  );
}

BooleanFilter.propTypes = {
  fieldName: PropTypes.string,
  filterDto: PropTypes.object,
  loadData: PropTypes.func,
  setFilterDto: PropTypes.func,
};

export default BooleanFilter;