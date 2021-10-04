import React from "react";
import PropTypes from "prop-types";
import RegistryToolCard from "components/common/fields/inventory/RegistryToolCard";
import Model from "core/data_model/model";
import toolMetadata from "components/inventory/tools/tool-metadata";
import CardView from "components/common/card/CardView";
import VerticalCardViewBase from "components/common/card_view/VerticalCardViewBase";

function ToolCardView({ data, toolFilterDto, setToolFilterDto, loadData, isLoading }) {
  const getRegistryToolCard = (tool) => {
    return (
      <RegistryToolCard
        toolData={new Model({ ...tool }, toolMetadata, false)}
      />
    );
  };

  return (
    <CardView
      isLoading={isLoading}
      loadData={loadData}
      setPaginationDto={setToolFilterDto}
      paginationDto={toolFilterDto}
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
  isLoading: PropTypes.bool
};

export default ToolCardView;