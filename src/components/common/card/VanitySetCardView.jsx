import React from "react";
import PropTypes from "prop-types";
import VanityPaginationContainer from "components/common/pagination/v2/VanityPaginationContainer";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import InfoMessageFieldBase from "components/common/fields/text/message/InfoMessageFieldBase";

function VanitySetCardView(
  {
    cards,
    isLoading,
    paginationModel,
    loadData,
    noDataMessage,
    minHeight,
  }) {
  const getBody = () => {
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
      <VanityPaginationContainer
        loadData={loadData}
        paginationModel={paginationModel}
        isLoading={isLoading}
      >
        <div className={"h-100 w-100"}>
          {cards}
        </div>
      </VanityPaginationContainer>
    );
  };

  return (
    <div
      className={"vanity-card-container"}
      style={{
        minHeight: minHeight,
      }}
    >
      {getBody()}
    </div>
  );
}

VanitySetCardView.propTypes = {
  cards: PropTypes.object,
  isLoading: PropTypes.bool,
  paginationModel: PropTypes.object,
  loadData: PropTypes.func,
  noDataMessage: PropTypes.any,
  minHeight: PropTypes.string,
};

VanitySetCardView.defaultProps = {
  noDataMessage: "No data is currently available",
};

export default VanitySetCardView;