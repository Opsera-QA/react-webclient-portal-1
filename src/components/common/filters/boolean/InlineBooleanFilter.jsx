import React, { useState } from "react";
import PropTypes from "prop-types";
import {Form} from "react-bootstrap";
import WarningDialog from "components/common/status_notifications/WarningDialog";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";

function InlineBooleanFilter({ fieldName, loadData, filterDto, setFilterDto, inline, toolTipText}) {
  const [field] = useState(filterDto.getFieldById(fieldName));

  const validateAndSetData = (fieldName, value) => {
    let newDataObject = filterDto;
    newDataObject.setData(fieldName, value);
    loadData(newDataObject);
  };

  const getFilterBody = () => {
    return (
      <div className={`d-flex mt-1${inline ? ` inline-filter-input` : ``}`}>
        <div>
          <Form.Check onChange={() => validateAndSetData(field.id, !filterDto.getData(fieldName))} type="switch" id={field.id} checked={!!filterDto.getData(fieldName)} label={""} />
        </div>
        <div className="my-auto">{field.label}</div>
      </div>
    );
  };

  if (field == null) {
    return <WarningDialog warningMessage={"No field was found for this filter"}/>;
  }

  if (toolTipText) {
    return (
      <TooltipWrapper innerText={"This will select all the items on this page only."}>
        {getFilterBody()}
      </TooltipWrapper>
    );
  }

  return (getFilterBody());
}

InlineBooleanFilter.propTypes = {
  fieldName: PropTypes.string,
  filterDto: PropTypes.object,
  loadData: PropTypes.func,
  setFilterDto: PropTypes.func,
  inline: PropTypes.bool
};

export default InlineBooleanFilter;