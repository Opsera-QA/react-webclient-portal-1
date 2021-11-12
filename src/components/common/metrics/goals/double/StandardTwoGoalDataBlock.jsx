import React from "react";
import PropTypes from "prop-types";
import TwoGoalDataBlockBase from "components/common/metrics/goals/double/TwoGoalDataBlockBase";

function StandardTwoGoalDataBlock({ topGoal, bottomGoal, icon, }) {
  return (
    <TwoGoalDataBlockBase
      className={"d-flex h-100"}
      topGoal={topGoal}
      bottomGoal={bottomGoal}
      icon={icon}
    />
  );
}

StandardTwoGoalDataBlock.propTypes = {
  topGoal: PropTypes.any,
  bottomGoal: PropTypes.any,
  icon: PropTypes.object,
};

export default StandardTwoGoalDataBlock;