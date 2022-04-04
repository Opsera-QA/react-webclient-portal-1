import React from "react";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import { faFileAlt } from "@fortawesome/pro-light-svg-icons";

function InformaticaSummaryLogVerticalTabContainer() {
  return (
    <VanitySetVerticalTabContainer>
      <VanitySetVerticalTab
        icon={faFileAlt}
        tabText={"Overview"}
        tabName={"summary"}
      />
    </VanitySetVerticalTabContainer>
  );
}

export default InformaticaSummaryLogVerticalTabContainer;