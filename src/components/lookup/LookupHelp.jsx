import React, {useContext} from 'react';

import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from 'components/common/overlays/center/help/HelpOverlayBase';

const LookupHelp = () => {

  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div>
        <div>Opsera lookup allows you to search for your component across all your pipelines.</div>
      </div>
    );
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      helpTopic={"Pipelines"}
      helpDocumentation={getHelpDocumentation()}
    >
    </HelpOverlayBase>
  );
};

export default React.memo(LookupHelp);
