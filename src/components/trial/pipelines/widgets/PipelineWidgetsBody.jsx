import React from "react";
import PropTypes from "prop-types";
import WidgetDataBlockBaseContainer from "temp-library-components/widgets/data_blocks/WidgetDataBlockBaseContainer";
import useComponentStateReference from "hooks/useComponentStateReference";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";

export default function PipelineWidgetsBody({selectedPipelineId}) {
  const {themeConstants} = useComponentStateReference();

  if (isMongoDbId(selectedPipelineId) !== true) {
    return null;
  }

  return (
    <div>
        TODO:
    </div>
  );
}

PipelineWidgetsBody.propTypes = {
  selectedPipelineId: PropTypes.string,
};