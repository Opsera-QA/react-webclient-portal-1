import React from "react";
import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";

// TODO: This is an initial iteration. It will be changed and enhanced over time
function DataBlockAndChartContainer({ chart, dataBlock, className, onClickFunction }) {
  return (
    <div className={className} onClick={onClickFunction}>
      <Row className="align-items-center" >
          <Col sm={3} className={"p-2"}>
            {dataBlock}        
          </Col>      
          <Col sm={9} className={"p-2"}>
            {chart}
          </Col>
        </Row>
    </div>
  );
}

DataBlockAndChartContainer.propTypes = {
  chart: PropTypes.any,
  dataBlock: PropTypes.any,
  className: PropTypes.string,
  onClickFunction: PropTypes.func,
};

export default DataBlockAndChartContainer;
