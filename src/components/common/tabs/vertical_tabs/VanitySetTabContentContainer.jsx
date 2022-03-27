import React from "react";
import PropTypes from "prop-types";
import IconBase from "components/common/icons/IconBase";

function VanitySetTabContentContainer(
  {
    isLoading,
    children,
    title,
    titleIcon,
  }) {
  const getTitleBar = () => {
    if (title) {
      return (
        <div className={"p-2 makeup-tab-content-title d-flex"}>
          <div className={"my-auto justify-content-between"}>
            <div>
              <IconBase
                isLoading={isLoading}
                icon={titleIcon}
                className={"mr-1"}
              />
              {title}
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      {getTitleBar()}
      <div>
        {children}
      </div>
    </div>
  );
}


VanitySetTabContentContainer.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.any,
  title: PropTypes.string,
  titleIcon: PropTypes.object,
};

export default VanitySetTabContentContainer;