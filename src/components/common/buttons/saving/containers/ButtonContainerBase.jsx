import React  from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";

function ButtonContainerBase(
  {
    children,
    leftSideButtons,
    className,
  }) {
  return (
    <div className={className}>
      <Row className="mx-0 d-flex">
        {leftSideButtons}
        <div className="ml-auto d-flex">
          {children}
        </div>
      </Row>
    </div>
  );
}

ButtonContainerBase.propTypes = {
  leftSideButtons: PropTypes.any,
  children: PropTypes.any,
  className: PropTypes.string,
};

export default React.memo(ButtonContainerBase);