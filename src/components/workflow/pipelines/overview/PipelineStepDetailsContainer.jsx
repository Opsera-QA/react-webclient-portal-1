import React from "react";
import PropTypes from "prop-types";
import {faCode} from "@fortawesome/pro-light-svg-icons";
import VanitySetTabContentContainer from "components/common/tabs/vertical_tabs/VanitySetTabContentContainer";

function PipelineStepDetailsContainer({ isLoading, children, title }) {
  const getTitleText = () => {
    if (isLoading) {
      return (`Loading Pipeline Step`);
    }

    return (title);
  };

  return (
    <VanitySetTabContentContainer
      isLoading={isLoading}
      title={getTitleText()}
      titleIcon={faCode}
    >
      {children}
    </VanitySetTabContentContainer>
  );
}


PipelineStepDetailsContainer.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.any,
  title: PropTypes.string,
};

export default PipelineStepDetailsContainer;