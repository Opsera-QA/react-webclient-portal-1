import React, { useContext } from "react";
import { DialogToastContext } from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";

const SalesforceLookUpHelpDocumentation = () => {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div>
        <div>Select components through the search bar along with a Date Range. The Date Range is mandatory, and it
          returns results based on pipeline executions that happened within that time frame.
          Click on Search to get the results component-wise.
        </div>
      </div>
    );
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      helpTopic={"Salesforce Lookup"}
      helpDocumentation={getHelpDocumentation()}
    />
  );
};

export default React.memo(SalesforceLookUpHelpDocumentation);
