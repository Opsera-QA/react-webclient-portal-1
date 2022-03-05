import React from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import VanitySetCardView from "components/common/card/VanitySetCardView";
import ToolIdentifierCard from "components/admin/tools/identifiers/ToolIdentifierCard";
import VerticalCardViewBase from "components/common/card_view/VerticalCardViewBase";

function ToolIdentifierCardView({ toolIdentifiers, toolIdentifierFilterModel, loadData, isLoading, toolIdentifierMetadata }) {
  const getToolIdentifierCard = (toolIdentifier) => {
    return (
      <ToolIdentifierCard
        toolIdentifierModel={new Model({ ...toolIdentifier }, toolIdentifierMetadata, false)}
      />
    );
  };

  return (
    <VanitySetCardView
      isLoading={isLoading}
      loadData={loadData}
      paginationModel={toolIdentifierFilterModel}
      className={"makeup-container-table m-2"}
      cards={
        <VerticalCardViewBase
          data={toolIdentifiers}
          getCardFunction={getToolIdentifierCard}
        />
      }
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