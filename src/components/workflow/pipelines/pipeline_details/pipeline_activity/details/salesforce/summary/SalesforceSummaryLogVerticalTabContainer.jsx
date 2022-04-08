import React from "react";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import {faClipboardListCheck, faFileAlt, faFileCode, faObjectGroup} from "@fortawesome/pro-light-svg-icons";

function SalesforceSummaryLogVerticalTabContainer() {
  return (
    <VanitySetVerticalTabContainer>
      <VanitySetVerticalTab
        icon={faFileAlt}
        tabText={"Overview"}
        tabName={"summary"}
      />
      <VanitySetVerticalTab
        icon={faFileCode}
        tabText={"Component Details"}
        tabName={"components"}
      />
      <VanitySetVerticalTab
        icon={faClipboardListCheck}
        tabText={"Unit Test Details"}
        tabName={"tests"}
      />
    </VanitySetVerticalTabContainer>
  );
}

export default SalesforceSummaryLogVerticalTabContainer;