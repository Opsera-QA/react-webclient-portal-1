import React, {useEffect, useState} from "react";
import {faQuestionCircle} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";
import HelpDocumentationTree from "components/common/help/overlay/HelpDocumentationTree";
import HelpDocumentationView from "components/common/help/overlay/HelpDocumentationView";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";

function HelpDocumentation({initialView}) {
  const [currentView, setCurrentView] = useState("welcome");

  useEffect(() => {
    if (initialView) {
      setCurrentView(initialView);
    }
  }, [initialView]);

  return (
    <VanitySetTabAndViewContainer
      tabColumnSize={4}
      icon={faQuestionCircle}
      title={`Help`}
      verticalTabContainer={<HelpDocumentationTree setCurrentView={setCurrentView} />}
      currentView={<HelpDocumentationView currentView={currentView} />}
    />
  );
}

HelpDocumentation.propTypes = {
  initialView: PropTypes.string,
};

export default HelpDocumentation;