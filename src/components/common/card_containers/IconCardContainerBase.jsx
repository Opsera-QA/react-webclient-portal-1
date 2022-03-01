import React from "react";
import PropTypes from "prop-types";
import {Card} from "react-bootstrap";
import LoadingIcon from "components/common/icons/LoadingIcon";

function IconCardContainerBase({ children, isLoading, titleBar, footerBar, className, contentBody }) {
  const getCardTitle = () => {
    if (isLoading) {
      return (<div className="ml-1"><LoadingIcon className={"mr-1"}/>Loading Data</div>);
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
    if (!isLoading) {
      return children;
    }
  };

  return (
    <Card className={`mb-2 h-100 ${className}`}>
      <Card.Title className="mb-0 px-2">
        {getCardTitle()}
      </Card.Title>
      <Card.Body className="h-100 px-2 py-0">
        {getCardBody()}
      </Card.Body>
      <Card.Footer>
        {getCardFooter()}
      </Card.Footer>
    </Card>
  );
}

IconCardContainerBase.propTypes = {
  children: PropTypes.any,
  titleBar: PropTypes.object,
  contentBody: PropTypes.object,
  className: PropTypes.string,
  footerBar: PropTypes.object,
  isLoading: PropTypes.bool
};

export default IconCardContainerBase;
