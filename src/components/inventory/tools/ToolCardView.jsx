import React from "react";
import PropTypes from "prop-types";
import RegistryToolCard from "components/common/fields/inventory/RegistryToolCard";
import Model from "core/data_model/model";
import CardView from "components/common/card/CardView";
import VerticalCardViewBase from "components/common/card_view/VerticalCardViewBase";

function ToolCardView({ data, toolFilterDto, toolMetadata, setToolFilterDto, loadData, isLoading }) {
  const getRegistryToolCard = (tool) => {
    return (
      <RegistryToolCard
        toolModel={new Model({ ...tool }, toolMetadata, false)}
      />
    );
  };

  if (toolMetadata == null) {
    return null;
  }

  return (
    <CardView
      isLoading={isLoading}
      loadData={loadData}
      setPaginationDto={setToolFilterDto}
      paginationDto={toolFilterDto}
      nextGeneration={true}
      cards={
        <VerticalCardViewBase
          data={data}
          getCardFunction={getRegistryToolCard}
        />
      }
    />
  );
}

ToolCardView.propTypes = {
  data: PropTypes.array,
  toolFilterDto: PropTypes.object,
  setToolFilterDto: PropTypes.func,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  toolMetadata: PropTypes.object,
};

export default ToolCardView;