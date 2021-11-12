import React from "react";
import PropTypes from "prop-types";
import TwoLineDataBlockBase from "components/common/metrics/data_blocks/base/TwoLineDataBlockBase";
import MetricScoreTextWithSupportingText from "components/common/metrics/score/MetricScoreTextWithSupportingText";

function TwoLineScoreWithSupportingTextDataBlock({ score, supportingText, subtitle, className, icon, }) {  
  return (
    <TwoLineDataBlockBase
      className={className}
      title={<MetricScoreTextWithSupportingText score={score} supportingText={supportingText} />}
      subtitle={subtitle}
      icon={icon}
    />
  );
}

TwoLineScoreWithSupportingTextDataBlock.propTypes = {
  score: PropTypes.number,
  supportingText: PropTypes.string,
  subtitle: PropTypes.any,
  className: PropTypes.string,
  icon: PropTypes.object,
};

export default TwoLineScoreWithSupportingTextDataBlock;