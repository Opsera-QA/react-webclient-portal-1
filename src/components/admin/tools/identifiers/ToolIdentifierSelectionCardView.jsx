import React from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import VanitySetCardView from "components/common/card/VanitySetCardView";
import ToolIdentifierSelectionCard from "components/admin/tools/identifiers/ToolIdentifierSelectionCard";
import VerticalCardViewBase from "components/common/card_view/VerticalCardViewBase";

function ToolIdentifierSelectionCardView({ toolIdentifiers, loadData, isLoading, toolIdentifierMetadata, setDataFunction }) {
  const getToolIdentifierSelectionCard = (toolIdentifier) => {
    return (
      <ToolIdentifierSelectionCard
        toolIdentifierModel={new Model({ ...toolIdentifier }, toolIdentifierMetadata, false)}
        setDataFunction={setDataFunction}
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
          getCardFunction={getToolIdentifierSelectionCard}
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