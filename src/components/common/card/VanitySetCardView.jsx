import React from "react";
import PropTypes from "prop-types";
import VanityPaginationContainer from "components/common/pagination/v2/VanityPaginationContainer";

function VanitySetCardView({ cards, isLoading, paginationModel, loadData, noDataMessage, className }) {
  if (!isLoading && cards == null) {
    return <div className="info-text text-center p-5">{noDataMessage}</div>;
  }

  return (
    <div className={"vanity-card-container"}>
      <VanityPaginationContainer
        loadData={loadData}
        paginationModel={paginationModel}
        isLoading={isLoading}
      >
        <div className={className}>
          {cards}
        </div>
      </VanityPaginationContainer>
    </div>
  );
}

VanitySetCardView.propTypes = {
  cards: PropTypes.object,
  isLoading: PropTypes.bool,
  paginationModel: PropTypes.object,
  loadData: PropTypes.func,
  noDataMessage: PropTypes.string,
  className:PropTypes.string
};

VanitySetCardView.defaultProps = {
  noDataMessage: "No data is currently available",
  className: "m-2"
};

export default VanitySetCardView;