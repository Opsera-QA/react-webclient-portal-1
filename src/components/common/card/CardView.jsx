import React from "react";
import PropTypes from "prop-types";
import PaginationContainer from "components/common/pagination/PaginationContainer";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import InfoMessageFieldBase from "components/common/fields/text/message/InfoMessageFieldBase";

function CardView(
  {
    cards,
    isLoading,
    paginationDto,
    setPaginationDto,
    loadData,
    noDataMessage,
    className,
    nextGeneration,
    minHeight,
  }) {
  if (!isLoading && cards == null) {
    return (
      <CenteredContentWrapper minHeight={minHeight}>
        <InfoMessageFieldBase
          message={noDataMessage}
          showInformationLabel={false}
        />
      </CenteredContentWrapper>
    );
  }

  return (
    <div className="card-container">
      <PaginationContainer
        loadData={loadData}
        setFilterDto={setPaginationDto}
        filterDto={paginationDto}
        isLoading={isLoading}
        nextGeneration={nextGeneration}
      >
        <div className={className}>
          {cards}
        </div>
      </PaginationContainer>
    </div>
  );
}

CardView.propTypes = {
  cards: PropTypes.object,
  isLoading: PropTypes.bool,
  title: PropTypes.string,
  paginationDto: PropTypes.object,
  setPaginationDto: PropTypes.func,
  loadData: PropTypes.func,
  noDataMessage: PropTypes.string,
  className:PropTypes.string,
  nextGeneration: PropTypes.bool,
  minHeight: PropTypes.string,
};

CardView.defaultProps = {
  noDataMessage: "No data is currently available",
  className: "m-2"
};

export default CardView;