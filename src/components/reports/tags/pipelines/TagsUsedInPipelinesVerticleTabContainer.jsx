import PropTypes from "prop-types";
import React from "react";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import {
  faBracketsCurly,
  faDraftingCompass,
  faMicrochip,
  faUser,
  faRss,
} from "@fortawesome/pro-light-svg-icons";
import { faSalesforce } from "@fortawesome/free-brands-svg-icons";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";

function TagsUsedInPipelinesVerticalTabContainer({
  isLoading,
  loadData,
  tags,
  tagsUsedInPipelineDto,
}) {
  const handleTabClick = (tab) => {
    tagsUsedInPipelineDto?.setData("activeTab", tab);
    tagsUsedInPipelineDto?.setData("currentPage", 1);
    loadData({ ...tagsUsedInPipelineDto });
  };
  return (
    <VanitySetVerticalTabContainer>
      <VanitySetVerticalTab
        icon={faDraftingCompass}
        tabText={"All Tags Applied"}
        tabName={"all tags"}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={tagsUsedInPipelineDto?.getData("activeTab")}
        tooltipText={"Look up pipelines where all tags are applied"}
      />
      {tags.length > 1
        ? tags.map((tag) => {
            return (
              <VanitySetVerticalTab
                icon={faUser}
                tabText={`${tag.type}: ${tag.value}`}
                tabName={tag.value}
                disabled={isLoading}
                handleTabClick={handleTabClick}
                activeTab={tagsUsedInPipelineDto?.getData("activeTab")}
                tooltipText={"Find any pipeline with a selected tag"}
                key={tag._id}
              />
            );
          })
        : null}
    </VanitySetVerticalTabContainer>
  );
}

TagsUsedInPipelinesVerticalTabContainer.propTypes = {
  isLoading: PropTypes.bool,
  tagsUsedInPipelineDto: PropTypes.object,
  loadData: PropTypes.func,
  tags: PropTypes.array,
};

export default TagsUsedInPipelinesVerticalTabContainer;
