import React from "react";
import PropTypes from "prop-types";
import InfoOverlayContainer, {getInfoOverlay} from "components/common/inputs/info_text/InfoOverlayContainer";
import ArgoApplicationsTable
  from "components/inventory/tools/tool_details/tool_jobs/argo/applications/ArgoApplicationsTable";
import argoApplicationsMetadata from "components/inventory/tools/tool_details/tool_jobs/argo/applications/argo-application-metadata";
import Model from "core/data_model/model";
import ArgoApplicationSummaryPanel
  from "components/inventory/tools/tool_details/tool_jobs/argo/applications/details/ArgoApplicationSummaryPanel";

function ArgoCdApplicationInfoOverlay({argoApplications, selectedArgoApplicationName}) {
  const getBody = () => {
    if (typeof selectedArgoApplicationName === "string" && selectedArgoApplicationName.length > 0) {
      const argoApplication = argoApplications.find((application) => application.name === selectedArgoApplicationName);

      if (argoApplication != null) {
        const model = new Model(argoApplication, argoApplicationsMetadata, false);
        return (
          <div>
            <div className={"mb-2"}>
              Selection of this application identifies which application details are being used.
            </div>
            <ArgoApplicationSummaryPanel argoApplicationData={model} />
          </div>
        );
      }
      else {
        return (
          <div>
            Argo Application {selectedArgoApplicationName} not found in the Argo instance. It may have been deleted.
          </div>
        );
      }
    }

    return (
      <ArgoApplicationsTable argoApplications={argoApplications} />
    );
  };

  return (
    <InfoOverlayContainer title={"Argo Application Details"}>
      {getBody()}
    </InfoOverlayContainer>
  );
}

ArgoCdApplicationInfoOverlay.propTypes = {
  argoApplications: PropTypes.array,
  selectedArgoApplicationName: PropTypes.string,
};

export default ArgoCdApplicationInfoOverlay;