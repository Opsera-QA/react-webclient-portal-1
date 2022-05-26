import React from "react";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import {faClipboardListCheck, faFileAlt, faFileCode} from "@fortawesome/pro-light-svg-icons";

function SfdxScanSummaryLogVerticalTabContainer() {
  return (
    <VanitySetVerticalTabContainer>
      <VanitySetVerticalTab
        icon={faFileAlt}
        tabText={"Summary Details"}
        tabName={"summary"}
      />
        <VanitySetVerticalTab
            icon={faClipboardListCheck}
            tabText={"Execution Details"}
            tabName={"execDetails"}
        />
    </VanitySetVerticalTabContainer>
  );
}

export default SfdxScanSummaryLogVerticalTabContainer;