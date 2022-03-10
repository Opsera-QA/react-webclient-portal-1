import React from "react";
import PropTypes from "prop-types";
import {faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// TODO: Fix so when passing in height the height doesn't change after the table loads
function TableBodyLoadingWrapper({ isLoading, data, tableComponent, noDataMessage, tableHeight }) {
  const getNoDataMessage = () => {
    if (isLoading === true) {
      return ("Loading Data");
    }

    return noDataMessage;
  };

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <Row className={"mx-0 w-100"} style={{height: tableHeight}}>
        <Col xs={12} className={"my-auto text-center px-0"}>
          <span className={"info-text"}>
            <IconBase icon={faExclamationCircle} isLoading={isLoading} className={"mr-2 mt-1"}/>
            {getNoDataMessage()}
          </span>
        </Col>
      </Row>
    );
  }

  if (tableComponent == null) {
    return null;
  }

  return (tableComponent);
}

TableBodyLoadingWrapper.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.array,
  tableComponent: PropTypes.object,
  noDataMessage: PropTypes.string,
  tableHeight: PropTypes.string
};

TableBodyLoadingWrapper.defaultProps = {
  tableHeight: "500px",
  noDataMessage: "No data is currently available"
};

export default TableBodyLoadingWrapper;