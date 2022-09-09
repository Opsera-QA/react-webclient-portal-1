import React from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import VanitySetCardView from "components/common/card/VanitySetCardView";
import VerticalCardViewBase from "components/common/card_view/VerticalCardViewBase";
import ToolIdentifierCard from "components/admin/tools/identifiers/ToolIdentifierCard";
import toolIdentifierMetadata from "components/admin/tools/identifiers/toolIdentifier.metadata";

export default function ToolIdentifierSelectionCardView(
  {
    toolIdentifiers,
    onClickFunction,
    loadData,
    isLoading,
  }) {
  const getCardFunction = (toolIdentifier) => {
    return (
      <ToolIdentifierCard
        toolIdentifierModel={new Model({ ...toolIdentifier }, toolIdentifierMetadata, false)}
        onClickFunction={() => onClickFunction(toolIdentifier)}
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
          getCardFunction={getCardFunction}
        />
      }
    />
  );
}

ToolIdentifierSelectionCardView.propTypes = {
  toolIdentifiers: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  onClickFunction: PropTypes.func,
};