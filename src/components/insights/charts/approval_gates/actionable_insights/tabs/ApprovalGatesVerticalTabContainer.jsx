import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import { faFileCode } from "@fortawesome/pro-light-svg-icons";

function ApprovalGatesVerticalTabContainer({ listOfPipelines }) {
  const [activeTab, setActiveTab] = useState();
  useEffect(() => {
    if (listOfPipelines && Array.isArray(listOfPipelines) && listOfPipelines[0]) {
      setActiveTab(listOfPipelines[0]._id);
    }
  }, [listOfPipelines]);

  return (
      <VanitySetVerticalTabContainer className={"h-100"}>
        {listOfPipelines.map((item, index) => {
          return <VanitySetVerticalTab key={index} icon={faFileCode} tabText={item.pipeline_name} tabName={item._id} />;
        })}
      </VanitySetVerticalTabContainer>
  );
}
ApprovalGatesVerticalTabContainer.propTypes = {
  listOfPipelines: PropTypes.array,
};
export default ApprovalGatesVerticalTabContainer;
