import React, { useContext } from "react";
import {DialogToastContext} from "../../../../../../contexts/DialogToastContext";


function SfdcWizardXmlViewerHelpDocumentation() {
  return (
    <div className={"mt-3"}>
      <h5>SalesForce Pipeline Run: XML Viewer Help</h5>
      <div>Review the XML package and Unit Test classes and select <b>Proceed</b> to trigger the pipeline run.</div>
    </div>
  );
}

export default React.memo(SfdcWizardXmlViewerHelpDocumentation);