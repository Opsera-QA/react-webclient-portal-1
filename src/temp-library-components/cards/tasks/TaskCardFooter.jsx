import React from "react";
import CardFooterBase from "temp-library-components/cards/CardFooterBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import PropTypes from "prop-types";

export default function TaskCardFooter({ taskModel }) {
  const { themeConstants } = useComponentStateReference();
  const state = taskModel?.getData("status");

  const getColor = () => {
    switch (state) {
      case "paused":
        return themeConstants.COLOR_PALETTE.OPSERA_GOLD;
      case "running":
        return themeConstants.COLOR_PALETTE.GREEN;
      // case "failure":
      // case "failed":
      //   return themeConstants.COLOR_PALETTE.DANGER_RED;
      default:
        return themeConstants.RESOURCE_COLORS.TASKS;
    }
  };

  return (
    <CardFooterBase
      backgroundColor={getColor()}
      color={themeConstants.COLOR_PALETTE.WHITE}
      text={"Task"}
    />
  );
}

TaskCardFooter.propTypes = {
  taskModel: PropTypes.object,
};
