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
  },
  {
    name: "Contains",
    value: "contains"
  },
  {
    name: "Starts With",
    value: "starts-with"
  },
  {
    name: "Ends With",
    value: "ends-with"
  }
];

function SfdcComponentNameFilterInputRow({
  index,
  disabled,  
  filter,
  filterValue,
  updateFilter,
  updateFilterValue,
  deleteFilterRow,
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
          onClick={() => deleteFilterRow(index)}
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
      <Col sm={12}>
        <Row className={"pl-2"}>          
          <Col
            sm={4}
            className={"pl-1 pr-0"}
          >
            {getFilterInput()}
          </Col>
          <Col
            sm={8}
            className={"px-3"}
          >
            <StandaloneTextInputBase
             value={filterValue}
             setDataFunction={updateFilterValue}
             disabled={disabled}
            />
          </Col>          
        </Row>
      </Col>      
    </div>
  );
}

SfdcComponentNameFilterInputRow.propTypes = {
  index: PropTypes.number,  
  disabled: PropTypes.bool,
  filter: PropTypes.string,
  filterField: PropTypes.string,
  filterValue: PropTypes.string,
  updateFilter: PropTypes.func,
  updateFilterField: PropTypes.func,
  updateFilterValue: PropTypes.func,
  deleteFilterRow: PropTypes.func,
};

export default SfdcComponentNameFilterInputRow;
