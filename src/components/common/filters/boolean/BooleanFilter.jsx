import React, { useState } from "react";
import PropTypes from "prop-types";
import {Form} from "react-bootstrap";
import WarningDialog from "components/common/status_notifications/WarningDialog";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";

function BooleanFilter({ fieldName, setFilterDto, filterDto, setDataFunction, inline, toolTipText}) {
  const [field] = useState(filterDto.getFieldById(fieldName));

  const validateAndSetData = (fieldName, value) => {
    let newDataObject = filterDto;
    newDataObject.setData(fieldName, value);
    setFilterDto({...newDataObject});
  };

  const getFilterBody = () => {
    return (
      <div className={`d-flex mt-1${inline ? ` inline-filter-input` : ``}`}>
        <div>
          <Form.Check
            onChange={() => {
              setDataFunction
                ? setDataFunction(field.id, !filterDto.getData(fieldName))
                : validateAndSetData(field.id, !filterDto.getData(fieldName));}
            }
            type="switch"
            id={field.id}
            checked={!!filterDto.getData(fieldName)}
            label={""}
          />
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

BooleanFilter.propTypes = {
  fieldName: PropTypes.string,
  filterDto: PropTypes.object,
  loadData: PropTypes.func,
  inline: PropTypes.bool,
  toolTipText: PropTypes.bool
};

export default BooleanFilter;