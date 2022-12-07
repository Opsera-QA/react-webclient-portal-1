import React from "react";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import { faFileAlt } from "@fortawesome/pro-light-svg-icons";

function SonarSummaryLogVerticalTabContainer() {
  return (
    <VanitySetVerticalTabContainer>
      <VanitySetVerticalTab
        icon={faFileAlt}
        tabText={"Sonar Quality Gate"}
        tabName={"sonar"}
      />
      <VanitySetVerticalTab
        icon={faFileAlt}
        tabText={"Opsera Threshold Validation"}
        tabName={"opsera"}
      />
    </VanitySetVerticalTabContainer>
  );
}

export default SonarSummaryLogVerticalTabContainer;
