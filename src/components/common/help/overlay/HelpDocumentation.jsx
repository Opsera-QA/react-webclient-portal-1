import React, {useEffect, useState} from "react";
import {faQuestionCircle} from "@fortawesome/pro-light-svg-icons";
import VanitySetTreeAndViewContainer from "components/common/tree/VanitySetTreeAndViewContainer";
import PropTypes from "prop-types";
import HelpDocumentationTree from "components/common/help/overlay/HelpDocumentationTree";
import HelpDocumentationView from "components/common/help/overlay/HelpDocumentationView";

function HelpDocumentation({initialView}) {
  const [currentView, setCurrentView] = useState("welcome");

  useEffect(() => {
    if (initialView) {
      setCurrentView(initialView);
    }
  }, [initialView]);

  return (
    <VanitySetTreeAndViewContainer
      treeColumnSize={4}
      icon={faQuestionCircle}
      title={`Help`}
      treeContainer={<HelpDocumentationTree setCurrentView={setCurrentView} />}
      currentView={<HelpDocumentationView currentView={currentView} />}
    />
  );
}

HelpDocumentation.propTypes = {
  initialView: PropTypes.string,
};

export default HelpDocumentation;