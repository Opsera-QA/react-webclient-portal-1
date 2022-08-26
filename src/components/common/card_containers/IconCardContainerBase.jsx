import React from "react";
import PropTypes from "prop-types";
import {Card} from "react-bootstrap";
import LoadingIcon from "components/common/icons/LoadingIcon";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";

// TODO: Refactor, start from scratch
export default function IconCardContainerBase(
  {
    children,
    isLoading,
    header,
    titleBar,
    footerBar,
    className,
    contentBody,
    style,
    onClickFunction,
    tooltip,
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

    return contentBody;
  };

  const getCardFooter = () => {
    if (!isLoading && children) {
      return (
        <Card.Footer>
          {children}
        </Card.Footer>
      );
    }
  };

  return (
    <TooltipWrapper innerText={tooltip}>
      <div
        className={`card mb-2 h-100 ${className}`}
        style={style}
        onClick={onClickFunction}
      >
        <Card.Title className="mb-0 px-2">
          {getCardTitle()}
        </Card.Title>
        <Card.Body className="h-100 px-2 py-0">
          {getCardBody()}
        </Card.Body>
        {getCardFooter()}
        {header}
      </div>
    </TooltipWrapper>
  );
}

IconCardContainerBase.propTypes = {
  children: PropTypes.any,
  titleBar: PropTypes.object,
  contentBody: PropTypes.object,
  className: PropTypes.string,
  footerBar: PropTypes.object,
  isLoading: PropTypes.bool,
  header: PropTypes.any,
  style: PropTypes.object,
  onClickFunction: PropTypes.func,
  tooltip: PropTypes.any,
};