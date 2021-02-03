import React from "react";
import PropTypes from "prop-types";
import {Col} from "react-bootstrap";
import RegistryToolCard from "components/common/fields/inventory/RegistryToolCard";
import Model from "core/data_model/model";
import toolMetadata from "components/inventory/tools/tool-metadata";
import Row from "react-bootstrap/Row";

function ToolCardView({ data }) {
  if (!Array.isArray(data) || data.length === 0) {
    return <></>;
  }

  return (
    <Row>
      {data.map((toolData, index) => (
        <Col key={index} sm={6} md={4} lg={2} className="p-2">
          <RegistryToolCard toolData={new Model({ ...toolData }, toolMetadata, false)}/>
        </Col>
      ))}
    </Row>
  );
}

ToolCardView.propTypes = {
  data: PropTypes.array,
};

export default ToolCardView;