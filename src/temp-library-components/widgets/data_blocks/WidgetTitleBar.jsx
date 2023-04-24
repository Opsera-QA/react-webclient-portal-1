import React from "react";
import PropTypes from "prop-types";
import IconBase from "components/common/icons/IconBase";

export default function WidgetTitleBar(
  {
    title,
    rightSideComponents,
    middleComponents,
    titleIcon,
    isLoading,
    isPolling,
  }) {
  const getBody = (stacked) => {
    if (stacked === true) {
      return (
        <>
          <div className={"d-flex w-100 justify-content-between"}>
            <div className={"my-auto mr-2 widget-title-text text-nowrap"}>
              <span className={"d-flex"}>
                <IconBase icon={titleIcon} isLoading={isLoading || isPolling} className={"mr-2 d-none d-lg-block"}/>
                {title}
              </span>
            </div>
            <div className={"d-flex"}>
              {rightSideComponents}
            </div>
          </div>
          <div className={"mt-3"}>
            {middleComponents}
          </div>
        </>
      );
    }

    return (
      <div className={"d-flex w-100 justify-content-between"}>
        <div className={"my-auto mr-2 widget-title-text text-nowrap"}>
          <span className={"d-flex"}>
            <IconBase icon={titleIcon} isLoading={isLoading || isPolling} className={"mr-2 d-none d-lg-block"} />
            {title}
          </span>
        </div>
        <div>
          {middleComponents}
        </div>
        <div className={"d-flex"}>
          {rightSideComponents}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={"d-none d-xs-inline d-sm-inline d-md-inline d-lg-none d-xl-none w-100"}>
        {getBody(true)}
      </div>
      <div className={"d-none d-xs-none d-sm-none d-md-none d-lg-inline d-xl-inline w-100 d-flex"}>
        {getBody()}
      </div>
    </>
  );
}

WidgetTitleBar.propTypes = {
  title: PropTypes.any,
  titleIcon: PropTypes.object,
  rightSideComponents: PropTypes.any,
  middleComponents: PropTypes.any,
  isLoading: PropTypes.bool,
  isPolling: PropTypes.bool,
};
