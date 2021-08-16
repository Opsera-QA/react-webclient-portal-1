import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types";

function CoverityIssuesByCategoryHelpDocumentation({ closeHelpPanel }) {
  return (
    <HelpDocumentationContainer closeHelpPanel={closeHelpPanel} helpTopic={"Coverity Issues By Category"}>
      <div>
        The purpose of this KPI is to show Issues by category. Each data block defines the total number of issues in all
        projects, in each category. Each datablock will also display the trend of each category, based on the previous
        scan result of each project. The KPI also displays the top 3 projects that have the overall highest number of
        issues.
      </div>
    </HelpDocumentationContainer>
  );
}

CoverityIssuesByCategoryHelpDocumentation.propTypes = {
  closeHelpPanel: PropTypes.func,
};

export default React.memo(CoverityIssuesByCategoryHelpDocumentation);
