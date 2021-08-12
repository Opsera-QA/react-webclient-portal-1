import React from "react";
import PropTypes from "prop-types";
import InfoOverlayContainer from "components/common/inputs/info_text/InfoOverlayContainer";
import {Link} from "react-router-dom";

// TODO: Rework to use Summary panel for both the main tool view and also the configuration based off tool identifier like in the registry
function RegistryToolInfoOverlay({toolData}) {
  const getBody = () => {
    if (toolData) {
      return (
        <>
          <div className="text-muted mb-2">
            Configuration details for this item are listed below. Tool and account specific settings are stored in the
            <span> <Link to="/inventory/tools">Tool Registry</Link></span>. To add a new entry to a dropdown or update settings,
            make those changes there.
          </div>
          {toolData?.configuration && (
            <>
              {Object.entries(toolData?.configuration).map(function(a) {
                return (
                  <div key={a}>
                    {a[1].length > 0 && (
                      <>
                        <span className="text-muted pr-1">{a[0]}: </span> {a[1]}
                      </>
                    )}
                  </div>
                );
              })}
            </>
          )}
        </>
      );
    }

    return (
      <div className="text-muted mb-2">Please select any tool/account to get the details.</div>
    );
  };

  return (
    <InfoOverlayContainer title={"Tool and Account Details"}>
      {getBody()}
    </InfoOverlayContainer>
  );
}

RegistryToolInfoOverlay.propTypes = {
  toolData: PropTypes.object,
};

export default RegistryToolInfoOverlay;