import React from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import VanitySetCardView from "components/common/card/VanitySetCardView";
import VerticalCardViewBase from "components/common/card_view/VerticalCardViewBase";
import ToolIdentifierCard from "components/admin/tools/identifiers/ToolIdentifierCard";
import toolIdentifierMetadata from "components/admin/tools/identifiers/toolIdentifier.metadata";

function ToolIdentifierSelectionCardView({ toolIdentifiers, loadData, isLoading, setDataFunction }) {
  const getToolIdentifierCard = (toolIdentifier) => {
    return (
      <ToolIdentifierCard
        toolIdentifierModel={new Model({ ...toolIdentifier }, toolIdentifierMetadata, false)}
        onClickFunction={() => setDataFunction(toolIdentifier)}
      />
    );
  };

  return (
    <VanitySetCardView
      isLoading={isLoading}
      loadData={loadData}
      cards={
        <VerticalCardViewBase
          data={toolIdentifiers}
          getCardFunction={getToolIdentifierCard}
        />
      }
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