import React, { useState } from "react";
import PropTypes from "prop-types";
import {Form} from "react-bootstrap";
import WarningDialog from "components/common/status_notifications/WarningDialog";

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
      <div>
        <Form.Check onChange={() => validateAndSetData(field.id, !filterDto.getData(fieldName))} type="switch" id={field.id} checked={!!filterDto.getData(fieldName)} label={""} />
      </div>
      <div className="my-auto">{field.label}</div>
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