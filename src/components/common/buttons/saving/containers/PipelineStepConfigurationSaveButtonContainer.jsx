import React  from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";

// TODO: This will probably be removed if we make an actual detail view or if we do the modal concept where we have the tabs
function PipelineStepConfigurationSaveButtonContainer({ children }) {
  return (
    <Row>
      <div className="mt-3 ml-3 d-flex">
        {children}
      </div>
    </Row>
  );
}

PipelineStepConfigurationSaveButtonContainer.propTypes = {
  children: PropTypes.any
};

export default PipelineStepConfigurationSaveButtonContainer;