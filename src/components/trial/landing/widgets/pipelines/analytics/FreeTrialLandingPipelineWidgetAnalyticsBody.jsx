import PropTypes from "prop-types";
import React from "react";
import OpseraInfinityLogoSelectionCardBase from "temp-library-components/cards/opsera/OpseraInfinityLogoSelectionCardBase";
import { useHistory } from "react-router-dom";

export default function FreeTrialLandingPipelineWidgetAnalyticsBody(
  {
    className,
  }) {
  const history = useHistory();

  const goToInsightsPage = () => {
    history.push("/unified-insights");
  };

  return (
    <OpseraInfinityLogoSelectionCardBase
      className={className}
      title={`Pipeline level analytics are coming soon.`}
      subTitle={"Until then review the full Unified Insights offering."}
      onClickFunction={goToInsightsPage}
    />
  );
}

FreeTrialLandingPipelineWidgetAnalyticsBody.propTypes = {
  className: PropTypes.string,
};