import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types";

function CumulativeOpenDefectsHelpDocumentation({closeHelpPanel}) {
  return (
    <HelpDocumentationContainer
      closeHelpPanel={closeHelpPanel}
      helpTopic={"Cummulative Open Defects"}
    >
      <div>
        Help Conentent
      </div>
    </HelpDocumentationContainer>
  );
}

CumulativeOpenDefectsHelpDocumentation.propTypes = {
  closeHelpPanel: PropTypes.func,
};

export default React.memo(CumulativeOpenDefectsHelpDocumentation);