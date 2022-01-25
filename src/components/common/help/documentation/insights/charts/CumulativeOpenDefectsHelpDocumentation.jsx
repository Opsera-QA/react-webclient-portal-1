import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types";

function CumulativeOpenDefectsHelpDocumentation({closeHelpPanel}) {
  return (
    <HelpDocumentationContainer
      closeHelpPanel={closeHelpPanel}
      helpTopic={"Cumulative Open Defects"}
    >
      <div className={"mb-2"}>This chart depicts the cumulative number of defects of the application that are open and closed.</div>
      <div>
        <ul style={{listStyleType: "none"}}>
          <li><b>Total No of Defects</b> - Cumulative total number of defects found.</li>
          <li><b>Cumulative Open Defects</b> -  %(Total Valid Defects Open)/(Total No of Defects)</li>
          <li><b>Total Valid Defects Closed</b> - Total valid defects that have been resolved.</li>
          <li><b>Total Valid Defects Open</b> - Total valid defects pending to be resolved.</li>
        </ul>
      </div>
    </HelpDocumentationContainer>
  );
}

CumulativeOpenDefectsHelpDocumentation.propTypes = {
  closeHelpPanel: PropTypes.func,
};

export default React.memo(CumulativeOpenDefectsHelpDocumentation);