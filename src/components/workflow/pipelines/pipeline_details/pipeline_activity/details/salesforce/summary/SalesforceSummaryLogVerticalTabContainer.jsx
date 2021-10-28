import React from "react";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import {faSalesforce} from "@fortawesome/free-brands-svg-icons";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import {faFileAlt, faObjectGroup} from "@fortawesome/pro-light-svg-icons";

function SalesforceSummaryLogVerticalTabContainer() {
  return (
    <VanitySetVerticalTabContainer className={"h-100"}>
      <VanitySetVerticalTab
        icon={faFileAlt}
        tabText={"Overview"}
        tabName={"summary"}
      />
      <VanitySetVerticalTab
        icon={faSalesforce}
        tabText={"Component Details"}
        tabName={"components"}
      />
      <VanitySetVerticalTab
        icon={faObjectGroup}
        tabText={"Unit Test Details"}
        tabName={"tests"}
      />
    </VanitySetVerticalTabContainer>
  );
}

export default SalesforceSummaryLogVerticalTabContainer;