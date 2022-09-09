import React from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import VanitySetCardView from "components/common/card/VanitySetCardView";
import ToolIdentifierCard from "components/admin/tools/identifiers/ToolIdentifierCard";
import VerticalCardViewBase from "components/common/card_view/VerticalCardViewBase";

export default function ToolIdentifierCardView(
  {
    toolIdentifiers,
    toolIdentifierFilterModel,
    loadData,
    isLoading,
    toolIdentifierMetadata,
    onClickFunction,
    tooltip,
  }) {
  const getCardFunction = (toolIdentifier) => {
    return (
      <ToolIdentifierCard
        toolIdentifierModel={new Model({ ...toolIdentifier }, toolIdentifierMetadata, false)}
        onClickFunction={onClickFunction}
        tooltip={tooltip}
      />
    );
  };

  return (
    <VanitySetCardView
      isLoading={isLoading}
      loadData={loadData}
      paginationModel={toolIdentifierFilterModel}
      className={"m-2"}
      cards={
        <VerticalCardViewBase
          data={toolIdentifiers}
          getCardFunction={getCardFunction}
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
  isLoading: PropTypes.bool,
  onClickFunction: PropTypes.func,
  tooltip: PropTypes.string,
};