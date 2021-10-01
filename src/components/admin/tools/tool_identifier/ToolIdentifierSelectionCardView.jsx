import React from "react";
import PropTypes from "prop-types";
import {Col} from "react-bootstrap";
import Model from "core/data_model/model";
import Row from "react-bootstrap/Row";
import VanitySetCardView from "components/common/card/VanitySetCardView";
import ToolIdentifierSelectionCard from "components/admin/tools/tool_identifier/ToolIdentifierSelectionCard";

function ToolIdentifierSelectionCardView({ toolIdentifiers, loadData, isLoading, toolIdentifierMetadata, setDataFunction }) {
  const getCards = () => {
    if (!Array.isArray(toolIdentifiers) || toolIdentifiers.length === 0 || toolIdentifierMetadata == null) {
      return null;
    }

    return (
      <Row className={"mx-0 my-2"}>
        {toolIdentifiers.map((task, index) => (
          <Col key={index} className={"my-2"}>
            <ToolIdentifierSelectionCard
              toolIdentifierModel={new Model({ ...task }, toolIdentifierMetadata, false)}
              setDataFunction={setDataFunction}
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
      className={"makeup-container-table"}
      cards={getCards()}
    />
  );
}

ToolIdentifierSelectionCardView.propTypes = {
  toolIdentifiers: PropTypes.array,
  toolIdentifierMetadata: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  setDataFunction: PropTypes.func,
};

export default ToolIdentifierSelectionCardView;