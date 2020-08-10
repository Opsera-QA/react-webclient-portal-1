/* This controls layout of the "count" blocks at the top of a dashboard layout
 this accepts a data object with the necessary block values and is only for UI rendering

Expecting data in this format:
[{ name: "Successful Builds", value: "1" footer: "footer text", status: "success" }]

 */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
// import { CardDeck, Card } from "react-bootstrap";
import Card from "react-bootstrap/Card";
// import CardDeck from "react-bootstrap/CardDeck";
import CardGroup from "react-bootstrap/CardGroup";

function SummaryCountBlocksView({ data, view }) {
  useEffect(() => {
    // console.log("Rendering Blocks for data", data);
  }, [data]);

  const setStatusLevel = (status) => {
    if (status === "danger") {
      return "red";
    } else if (status === "warning") {
      return "yellow";
    } else if (status === "success") {
      return "green";
    } else {
      return null;
    }
  };

  return (
    <>
      {data !== undefined && data.length > 0 ? (
        <div className="w-100">
          <div className="d-flex justify-content-center">
            <CardGroup className="w-100 d-flex justify-content-center">
              {data.map(function (item, index) {
                return (
                  <div
                    key={index}
                    className="count-block-card-view ml-1 mr-1 w-50 text-center align-self-center"
                    style={view !== "small" ? { maxWidth: "150px", height: "150px" } : { maxWidth: "150px" }}
                  >
                    <Card style={view !== "small" ? { width: "100%", height: "135px" } : { width: "100%" }}>
                      <Card.Body>
                        <Card.Title className="count-block-primary-text" style={{ fontSize: "25px" }}>
                          {item.value}
                        </Card.Title>
                        <Card.Text className={"count-block-subtext mt-2 " + setStatusLevel(item.status)}>
                          {item.name}
                        </Card.Text>
                      </Card.Body>
                      {item.footer && <Card.Text className="w-100 text-muted mb-1">{item.footer}</Card.Text>}
                    </Card>
                  </div>
                );
              })}
            </CardGroup>
          </div>
        </div>
      ) : null}
    </>
  );
}

SummaryCountBlocksView.propTypes = {
  data: PropTypes.array,
  view: PropTypes.string,
};

export default SummaryCountBlocksView;
