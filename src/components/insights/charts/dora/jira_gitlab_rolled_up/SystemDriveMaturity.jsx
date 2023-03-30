import React from "react";
import PropTypes from 'prop-types';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { MATURITY_SCORE_TEXT } from "../../charts-helpers";

const Icon = ({ color }) => <i style={{color}} className="fa-solid fa-circle"></i>;

Icon.propTypes = {
  color: PropTypes.oneOf(['grey', 'green', 'red', 'orange'])
};

const OrgTagRow = ({ orgTag }) => {
  const { name, score, previousScore } = orgTag;

  return (
    <Row className="p-2">
      <Col>{name}</Col>
      <Col></Col>
      <Col><Icon color="grey" /></Col>
      <Col><Icon color="green" /></Col>
      <Col></Col>
    </Row>
  );
};

OrgTagRow.propTypes = {
  orgTag: PropTypes.shape({
    name: PropTypes.string,
    score: PropTypes.string,
    previousScore: PropTypes.string
  })
};

function SystemDrivenMaturity () {
  const orgTags = [
    {
      name: "Org Tag One",
      maturityScore: MATURITY_SCORE_TEXT.HIGH,
      previousMaturityScore: MATURITY_SCORE_TEXT.MEDIUM
    },
    {
      name: "Org Tag Two",
      maturityScore: MATURITY_SCORE_TEXT.MEDIUM,
      previousMaturityScore: MATURITY_SCORE_TEXT.MEDIUM
    },
    {
      name: "Org Tag Three",
      maturityScore: MATURITY_SCORE_TEXT.LOW,
      previousMaturityScore: MATURITY_SCORE_TEXT.MEDIUM
    },
    {
      name: "Org Tag Four",
      maturityScore: MATURITY_SCORE_TEXT.ELITE,
      previousMaturityScore: MATURITY_SCORE_TEXT.LOW
    }
  ];
  return (
    <Container className="p-3" style={{fontSize: '2rem'}}>
      <Row className="text-center">
        <Col></Col>
        <Col>Low</Col>
        <Col>Medium</Col>
        <Col>High</Col>
        <Col>Elite</Col>
      </Row>
      <Row>
        <Col>Org Tag 1</Col>
        <Col></Col>
        <Col><Icon color="grey" /></Col>
        <Col><Icon color="green"/></Col>
        <Col></Col>
      </Row>
      <Row>
        <Col>Org Tag 2</Col>
        <Col></Col>
        <Col></Col>
        <Col></Col>
        <Col><Icon color="orange" /></Col>
      </Row>
      <Row>
        <Col>Org Tag 3</Col>
        <Col><Icon color="red" /></Col>
        <Col><Icon color="grey" /></Col>
        <Col></Col>
        <Col></Col>
      </Row>
      {orgTags.map((orgTag, index) => <OrgTagRow key={index} orgTag={orgTag} />)}
    </Container>
  );
}

export default SystemDrivenMaturity;