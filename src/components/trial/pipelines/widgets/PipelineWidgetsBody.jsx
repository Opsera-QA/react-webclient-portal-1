import React from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";

export default function PipelineWidgetsBody(
  {
    selectedPipelineId,
    selectedHeaderItem,
  }) {
  const {themeConstants} = useComponentStateReference();

  if (isMongoDbId(selectedPipelineId) !== true) {
    return null;
  }

  return (
    <div>
      {selectedHeaderItem}
    </div>
  );
}

PipelineWidgetsBody.propTypes = {
  selectedPipelineId: PropTypes.string,
  selectedHeaderItem: PropTypes.string,
};