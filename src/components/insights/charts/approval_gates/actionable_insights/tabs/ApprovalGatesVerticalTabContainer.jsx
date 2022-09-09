import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import {
  faCompass,
  faDatabase,
  faDraftingCompass,
} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import PaginationContainer from "components/common/pagination/PaginationContainer";

function ApprovalGatesVerticalTabContainer({
  listOfPipelines,
  tableFilterDto,
  isLoading,
  setTableFilterDto,
  loadData,
}) {
  const [activeTab, setActiveTab] = useState();
  useEffect(() => {
    if (
      listOfPipelines &&
      Array.isArray(listOfPipelines) &&
      listOfPipelines[0]
    ) {
      setActiveTab(listOfPipelines[0]._id);
    }
  }, [listOfPipelines]);

  return (
    <VanitySetVerticalTabContainer
      title={
        <div>
          <IconBase
            icon={faDatabase}
            className={"pr-2"}
          />
          List Of Pipelines
        </div>
      }
      supportSearch={true}
      isLoading={isLoading}
      filterModel={tableFilterDto}
      setFilterModel={setTableFilterDto}
      loadData={loadData}
    >
      <PaginationContainer
        isLoading={isLoading}
        filterDto={tableFilterDto}
        setFilterDto={setTableFilterDto}
        loadData={loadData}
        paginationStyle={"stackedVerticalTab"}
        topPaginationStyle={"stackedVerticalTab"}
        scrollOnLoad={false}
      >
        <VanitySetVerticalTabContainer className={"h-100"}>
          {listOfPipelines?.map((item, index) => {
            return (
              <VanitySetVerticalTab
                key={index}
                //icon={faDraftingCompass}
                tabText={item.pipeline_name}
                tabName={item._id}
              />
            );
          })}
        </VanitySetVerticalTabContainer>
      </PaginationContainer>
    </VanitySetVerticalTabContainer>
  );
}
ApprovalGatesVerticalTabContainer.propTypes = {
  listOfPipelines: PropTypes.array,
  tableFilterDto: PropTypes.object,
  isLoading: PropTypes.bool,
  setTableFilterDto: PropTypes.func,
  loadData: PropTypes.func,
};
export default ApprovalGatesVerticalTabContainer;
