import React from "react";
import PropTypes from "prop-types";
import IconBase from "components/common/icons/IconBase";

function VanitySetTabContentContainer(
  {
    isLoading,
    children,
    title,
    titleIcon,
    tileBarInput,
  }) {
  const getTitleBar = () => {
    if (title) {
      return (
        <div className={"p-2 makeup-tab-content-title d-flex justify-content-between"}>
          <div className={"my-auto"}>
            <div>
              <IconBase
                isLoading={isLoading}
                icon={titleIcon}
                className={"mr-1"}
              />
              {title}
            </div>
          </div>
          <div className={"ml-2"}>
            {tileBarInput}
          </div>
        </div>
      );
    }
  };

  return (
    <div className={"h-100"}>
      {getTitleBar()}
      <div className={"my-auto h-100"}>
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
  tileBarInput: PropTypes.string,
};

export default VanitySetTabContentContainer;