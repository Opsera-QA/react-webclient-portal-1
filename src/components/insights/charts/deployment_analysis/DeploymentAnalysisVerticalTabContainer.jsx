import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import { faFileCode } from "@fortawesome/pro-light-svg-icons";

function DeploymentAnalysisVerticalTabContainer({ highestMergesMetric }) {
  const [activeTab, setActiveTab] = useState();
  useEffect(() => {
    if (highestMergesMetric && Array.isArray(highestMergesMetric) && highestMergesMetric[0]) {
      setActiveTab(highestMergesMetric[0].id);
    }
  }, [highestMergesMetric]);

  return (
    <VanitySetVerticalTabContainer className={"h-100"}>
      {highestMergesMetric.map((item, index) => {
        return <VanitySetVerticalTab key={index} icon={faFileCode} tabText={item.label} tabName={item.id} />;
      })}
    </VanitySetVerticalTabContainer>
  );
}
DeploymentAnalysisVerticalTabContainer.propTypes = {
  highestMergesMetric: PropTypes.array,
};
export default DeploymentAnalysisVerticalTabContainer;