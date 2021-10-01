import React from "react";
import PropTypes from "prop-types";
import {Col} from "react-bootstrap";
import Model from "core/data_model/model";
import Row from "react-bootstrap/Row";
import VanitySetCardView from "components/common/card/VanitySetCardView";
import ToolIdentifierCard from "components/admin/tools/tool_identifier/ToolIdentifierCard";

function ToolIdentifierCardView({ toolIdentifiers, toolIdentifierFilterModel, loadData, isLoading, toolIdentifierMetadata }) {
  const getCards = () => {
    if (!Array.isArray(toolIdentifiers) || toolIdentifiers.length === 0 || toolIdentifierMetadata == null) {
      return null;
    }

    return (
      <Row className={"mx-0 my-2"}>
        {toolIdentifiers.map((task, index) => (
          <Col key={index} className={"my-2"}>
            <ToolIdentifierCard
              toolIdentifierModel={new Model({ ...task }, toolIdentifierMetadata, false)}
            />
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <VanitySetCardView
      isLoading={isLoading}
      loadData={loadData}
      paginationModel={toolIdentifierFilterModel}
      className={"makeup-container-table"}
      cards={getCards()}
    />
  );
}

ToolIdentifierCardView.propTypes = {
  toolIdentifiers: PropTypes.array,
  toolIdentifierFilterModel: PropTypes.object,
  toolIdentifierMetadata: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool
};

export default ToolIdentifierCardView;