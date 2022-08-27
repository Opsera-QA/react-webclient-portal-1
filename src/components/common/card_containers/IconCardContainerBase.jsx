import React from "react";
import PropTypes from "prop-types";
import {Card} from "react-bootstrap";
import LoadingIcon from "components/common/icons/LoadingIcon";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import { hasStringValue } from "components/common/helpers/string-helpers";
import { mouseHelper } from "temp-library-components/helpers/mouse/mouse.helper";

// TODO: Refactor, start from scratch
export default function IconCardContainerBase(
  {
    children,
    isLoading,
    cardFooter,
    titleBar,
    className,
    contentBody,
    style,
    onClickFunction,
    tooltip,
    tooltipPosition,
  }) {
  const getCardTitle = () => {
    if (isLoading) {
      return (<div className="ml-1"><LoadingIcon className={"mr-1"} />Loading Data</div>);
    }

    return titleBar;
  };

  const getCardBody = () => {
    if (isLoading) {
      return (<div className="m-3" />);
    }

    if (contentBody) {
      return (
        <Card.Body className="h-100 px-2 py-0">
          {contentBody}
        </Card.Body>
      );
    }
  };

  const getCardFooter = () => {
    if (children) {
      return (
        <Card.Footer>
          {children}
        </Card.Footer>
      );
    }
  };

  const getClassName = () => {
    if (hasStringValue(className) === true) {
      return `${className} card h-100 vertical-selection-card`;
    }

    return `card h-100 vertical-selection-card`;
  };

  const getStyle = () => {
    if (style) {
      return style;
    }

    return ({
      borderRadius: "1rem",
      cursor: mouseHelper.getMouseCursor(onClickFunction),
      overflow: "hidden",
    });
  };

  return (
    <TooltipWrapper innerText={tooltip} placement={tooltipPosition}>
      <div
        className={getClassName()}
        style={getStyle()}
        onClick={onClickFunction}
      >
        <Card.Title className="mb-0 px-2">
          {getCardTitle()}
        </Card.Title>
        {getCardBody()}
        {getCardFooter()}
        {cardFooter}
      </div>
    </TooltipWrapper>
  );
}

IconCardContainerBase.propTypes = {
  children: PropTypes.any,
  titleBar: PropTypes.object,
  contentBody: PropTypes.object,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  cardFooter: PropTypes.any,
  style: PropTypes.object,
  onClickFunction: PropTypes.func,
  tooltip: PropTypes.any,
  tooltipPosition: PropTypes.string,
};