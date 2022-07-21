import React from "react";
import PropTypes from "prop-types";
import WidgetDataBlockBaseContainer from "temp-library-components/widgets/data_blocks/WidgetDataBlockBaseContainer";
import useComponentStateReference from "hooks/useComponentStateReference";

function PipelineWidgetsBody({selectedPipelineId}) {
  const {themeConstants} = useComponentStateReference();

  return (
    <div>
      <WidgetDataBlockBaseContainer
        backgroundColor={themeConstants.COLOR_PALETTE.WHITE}
        borderColor={themeConstants.BORDER_COLORS.GRAY}
        heightSize={5}
      >
        TODO:
      </WidgetDataBlockBaseContainer>
    </div>
  );
}

PipelineWidgetsBody.propTypes = {
  selectedPipelineId: PropTypes.string,
};

export default PipelineWidgetsBody;
