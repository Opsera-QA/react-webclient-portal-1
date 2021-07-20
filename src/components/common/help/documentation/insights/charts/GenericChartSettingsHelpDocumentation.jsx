import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";

function GenericChartSettingsHelpDocumentation() {
  return (
    <HelpDocumentationContainer
      helpTopic={"KPI Settings"}
    >
      <div>Set any filters, tags, names or dates provided for the given KPI and <b>Save</b> to view the KPI with
        reflected filters. To remove the KPI from your dashboard, select the trash icon. To remove any settings,
        select <b>Clear Value</b> in given field.
      </div>
    </HelpDocumentationContainer>
  );
}

export default React.memo(GenericChartSettingsHelpDocumentation);