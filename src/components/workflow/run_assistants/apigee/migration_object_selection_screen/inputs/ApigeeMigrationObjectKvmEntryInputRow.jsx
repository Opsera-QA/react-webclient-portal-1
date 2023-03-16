import React from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import StandaloneTextInputBase from "components/common/inputs/text/standalone/StandaloneTextInputBase";

function ApigeeMigrationObjectKvmEntryInputRow(
  {
    setNameFunction,
    setValueFunction,
    entry,
  }) {

  return (
    <Row className="p-2">
      <Col sm={6}>
        <StandaloneTextInputBase
          value={entry?.name}                    
          setDataFunction={setNameFunction}
        />
      </Col>
      <Col sm={6}>
        <StandaloneTextInputBase
          value={entry?.value}
          setDataFunction={setValueFunction}
        />
      </Col>
    </Row>
  );
}

ApigeeMigrationObjectKvmEntryInputRow.propTypes = {
  setNameFunction: PropTypes.func,
  setValueFunction: PropTypes.func,
  entry: PropTypes.object,
};

export default ApigeeMigrationObjectKvmEntryInputRow;
