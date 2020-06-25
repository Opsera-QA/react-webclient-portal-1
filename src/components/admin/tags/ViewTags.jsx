import React, { useContext, useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { format } from "date-fns";

import "components/inventory/tools/tools.css";

function ViewTags(props) {
  const { tagId, tagData } = props;

  return (
    <>
      { Object.keys(tagData).length > 0  && <>
        <Row>
          <Col lg={4} md={6} className="my-2 ml-2">
            <span className="pr-1 text-muted">Tag Name: </span>{tagData.key}</Col>

          <Col lg={4} md={6} className="my-2">
            <span className="pr-1 text-muted">Value: </span>{tagData.value}</Col>
        </Row>

        <Row className="mt-3 mx-1 px-1 py-2 tool-content-block">   
          <Col lg={4} md={6} className="my-2">
            <span className="pr-1 text-muted">ID: </span>{tagData._id}</Col>

          <Col lg={4} md={6} className="my-2">
            <span className="pr-1 text-muted">Account: </span>{tagData.account}</Col>

          {(tagData.configuration && Object.keys(tagData.configuration).length >0 ) && <Col lg={4} md={6} className="my-2">
            <span className="pr-1 text-muted">Configuration: </span>
            {Object.keys(tagData.configuration).map((item, i) => <div className="p-1" key={i}>{item} : {tagData.configuration[item]}</div>)}</Col> }

          <Col lg={4} md={6} className="my-2">
            <span className="pr-1 text-muted">State: </span>{tagData.active ? "Active" : "Disabled"}</Col>

          { tagData.createdAt && <Col lg={4} md={6} className="my-2">
            <span className="pr-1 text-muted">Created: </span>{format(new Date(tagData.createdAt), "yyyy-MM-dd")}</Col>}


        </Row>

      </>}
    </>
  );
}

ViewTags.propTypes = {
  tagId: PropTypes.string,
  tagData: PropTypes.object
};


export default ViewTags;
