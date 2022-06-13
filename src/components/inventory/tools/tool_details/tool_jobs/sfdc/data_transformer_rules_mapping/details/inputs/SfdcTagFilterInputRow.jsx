import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { faTimes } from "@fortawesome/pro-light-svg-icons";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import StandaloneSelectInput from "components/common/inputs/select/StandaloneSelectInput";
import IconBase from "components/common/icons/IconBase";
import StandaloneTextInputBase from "components/common/inputs/text/standalone/StandaloneTextInputBase";

const FILTER_OPTIONS = [
  {
    name: "Equals",
    value: "equals"
  }
];

function SfdcTagFilterInputRow({
  index,
  disabled,  
  filter,
  filterField,
  filterValue,
  updateFilter,
  updateFilterField,
  updateFilterValue,
  deleteTagFilterRow,
}) {
  const getFilterInput = () => {
    return (
      <StandaloneSelectInput
        selectOptions={FILTER_OPTIONS}
        valueField={"value"}
        textField={"name"}
        value={filter}
        disabled={disabled}
        placeholder={"Select a filter"}
        setDataFunction={updateFilter}
      />
    );
  };

  const getDeletePropertyButton = (index) => {
    if (disabled !== true) {
      return (
        <Button
          variant="link"
          onClick={() => deleteTagFilterRow(index)}
        >
          <span>
            <IconBase
              className={"danger-red"}
              icon={faTimes}
            />
          </span>
        </Button>
      );
    }
  };

  return (
    <div
      className="d-flex py-2"
      key={index}
    >
      <Col sm={11}>
        <Row className={"pl-2"}>
          <Col
            sm={5}
            className={"pl-0 pr-1"}
          >
            <StandaloneTextInputBase
             value={filterField}
             setDataFunction={updateFilterField}
             disabled={disabled}
            />
          </Col>
          <Col
            sm={2}
            className={"pl-1 pr-0"}
          >
            {getFilterInput()}
          </Col>
          <Col
            sm={5}
            className={"pl-3 pr-0"}
          >
            <StandaloneTextInputBase
             value={filterValue}
             setDataFunction={updateFilterValue}
             disabled={disabled}
            />
          </Col>          
        </Row>
      </Col>
      <Col
        sm={1}
        className={"px-0 ml-auto mr-auto delete-button"}
      >
        {getDeletePropertyButton(index)}
      </Col>
    </div>
  );
}

SfdcTagFilterInputRow.propTypes = {
  index: PropTypes.number,  
  disabled: PropTypes.bool,
  filter: PropTypes.string,
  filterField: PropTypes.string,
  filterValue: PropTypes.string,
  updateFilter: PropTypes.func,
  updateFilterField: PropTypes.func,
  updateFilterValue: PropTypes.func,
  deleteTagFilterRow: PropTypes.func,
};

export default SfdcTagFilterInputRow;
