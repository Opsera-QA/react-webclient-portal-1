import React from "react";
import PropTypes from "prop-types";
import VanityPaginationContainer from "components/common/pagination/v2/VanityPaginationContainer";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import InfoMessageFieldBase from "components/common/fields/text/message/InfoMessageFieldBase";
import Error from "components/common/status_notifications/error";
import ErrorMessageFieldBase from "components/common/fields/text/message/ErrorMessageFieldBase";

function VanitySetCardView(
  {
    cards,
    isLoading,
    paginationModel,
    loadData,
    noDataMessage,
    minHeight,
    error,
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

    if (!isLoading && error && (!Array.isArray(cards) || cards.length === 0)) {
      return (
        <CenteredContentWrapper minHeight={minHeight}>
          <ErrorMessageFieldBase
            message={error}
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
  error: PropTypes.any,
};

VanitySetCardView.defaultProps = {
  noDataMessage: "No data is currently available",
};

export default VanitySetCardView;