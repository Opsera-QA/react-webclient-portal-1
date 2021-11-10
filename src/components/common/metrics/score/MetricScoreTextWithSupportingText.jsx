import React from "react";
import PropTypes from "prop-types";
import MetricTextWithSupportingTextBase from "components/common/metrics/text/MetricTextWithSupportingTextBase";

function MetricScoreTextWithSupportingText({score, supportingText, qualityLevel}) {
  if (score == null) {
    return null;
  }

  return (
    <MetricTextWithSupportingTextBase
      formattedText={score}
      supportingText={supportingText}
      qualityLevel={qualityLevel}
    />
  );
}

MetricScoreTextWithSupportingText.propTypes = {
  score: PropTypes.number,
  supportingText: PropTypes.string,
  qualityLevel: PropTypes.string,
};

export default MetricScoreTextWithSupportingText;