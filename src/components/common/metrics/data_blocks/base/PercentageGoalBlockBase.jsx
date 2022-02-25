import React from "react";
import PropTypes from "prop-types";

// TODO: This should not be used
function PercentGoalBlockBase({ title, subtitle, className, goal}) {
  const getTitle = () => {
    if (title) {
      return (
        <div>
          {title}
        </div>
      );
    }
  };

  const getSubtitle = () => {
    if (subtitle) {
      return (
        <div>
          {subtitle}
        </div>
      );
    }
  };

  const getGoal = () => {
    if (goal) {
      return (
        <div>
          {goal}
        </div>
      );
    }
  };

  return (
    <div className={className}>
      <div className={"p-2 text-center"}>
        <div className="data-block-focal-text">
          {getTitle()}
        </div>
        <div className="w-100 text-muted">
          {getSubtitle()}
        </div>
        <div className="w-100 font-weight-bolder">
          {getGoal()}
        </div>
      </div>
    </div>
  );
}

PercentGoalBlockBase.propTypes = {
  title: PropTypes.any,
  subtitle: PropTypes.any,
  className: PropTypes.string,
  goal: PropTypes.any,
};

export default PercentGoalBlockBase;