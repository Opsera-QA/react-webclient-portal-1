import React, { useContext } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";

function CatalogHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div>
        <div className={"mb-1"}>
          Catalog Templates are the framework for building a pipeline.
          They can be simple and basic or complex and detailed. To begin building a pipeline,
          choose one of the pipeline templates provided in the <b>Marketplace</b> or <b>Private</b> Catalogs below.
        </div>
        <div className={"mt-3"}>
          <b>Marketplace</b> - These are publicly available pipeline templates provided by Opsera. All users have access to them.
        </div>
        <div>
          <b>Private</b> -  This is your organization’s private catalog of pipeline templates.
          These are accessible to you and your organization only.
          To share a pipeline template with your organization, publish it to this catalog in Pipeline Summary.
        </div>
      </div>
    );
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      helpTopic={"Catalog"}
      helpDocumentation={getHelpDocumentation()}
    />
  );
}

export default React.memo(CatalogHelpDocumentation);