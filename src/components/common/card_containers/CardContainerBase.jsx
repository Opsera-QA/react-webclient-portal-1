import React from "react";
import PropTypes from "prop-types";
import {Card} from "react-bootstrap";
import IconBase from "components/common/icons/IconBase";

function CardContainerBase({ children, isLoading, titleBar, footerBar }) {
  const getCardTitle = () => {
    if (isLoading) {
      return (<div className="ml-1"><IconBase isLoading={true} className={"mr-1"}/>Loading Data</div>);
    }

    return titleBar;
  };

  const getCardBody = () => {
    if (isLoading) {
      return (<div className="m-3" />);
    }

    return children;
  };

  return (
    <Card className="mb-2 pipeline-summary-card">
      <Card.Title className="mb-0">
        <div className="pipeline-card-title small py-1 px-2">
          {getCardTitle()}
        </div>
      </Card.Title>
      <Card.Body className="h-100 p-0">
        {getCardBody()}
      </Card.Body>
      <Card.Footer>
        {footerBar}
      </Card.Footer>
    </Card>
  );
}

CardContainerBase.propTypes = {
  children: PropTypes.any,
  titleBar: PropTypes.object,
  footerBar: PropTypes.object,
  isLoading: PropTypes.bool
};

export default CardContainerBase;
