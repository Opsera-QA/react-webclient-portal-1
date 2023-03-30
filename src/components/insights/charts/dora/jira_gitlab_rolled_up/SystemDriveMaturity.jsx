import React from "react";
import PropTypes from 'prop-types';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { MATURITY_SCORE_TEXT, MATURITY_SCORE_VALUE } from "../../charts-helpers";

const Icon = ({ color }) => {
  if (!color) {
    return null;
  }

  return <i style={{color}} className="fa-solid fa-circle"></i>;
};

Icon.propTypes = {
  color: PropTypes.oneOf(['grey', 'green', 'red', 'orange'])
};

const OrgTagRow = ({ orgTag }) => {
  const { name, score, previousScore } = orgTag;

  const determineColor = (maturity, score, previous) => {
    const color = {
      [maturity]: ''
    };

    if (score === previous && score === maturity) {
      color[maturity] = 'orange';
      return color;
    }

    if (score === maturity) {
      // determine if new score is greater or lower than previous
      color[maturity] = MATURITY_SCORE_VALUE[score] > MATURITY_SCORE_VALUE[previous] ? 'green' : 'red';
      return color;
    }

    if (previous === maturity) {
      color[maturity] = 'grey';
      return color;
    }
  };

  const icons = {
    ...determineColor(MATURITY_SCORE_TEXT.LOW, score, previousScore),
    ...determineColor(MATURITY_SCORE_TEXT.MEDIUM, score, previousScore),
    ...determineColor(MATURITY_SCORE_TEXT.HIGH, score, previousScore),
    ...determineColor(MATURITY_SCORE_TEXT.ELITE, score, previousScore),
  };

  return (
    <Row className="p-2 text-center">
      <Col>{name}</Col>
      <Col>
        <Icon color={icons[MATURITY_SCORE_TEXT.LOW]} />
      </Col>
      <Col>
        <Icon color={icons[MATURITY_SCORE_TEXT.MEDIUM]} />
      </Col>
      <Col>
        <Icon color={icons[MATURITY_SCORE_TEXT.HIGH]} />
      </Col>
      <Col>
        <Icon color={icons[MATURITY_SCORE_TEXT.ELITE]} />
      </Col>
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
      score: MATURITY_SCORE_TEXT.HIGH,
      previousScore: MATURITY_SCORE_TEXT.MEDIUM
    },
    {
      name: "Org Tag Two",
      score: MATURITY_SCORE_TEXT.MEDIUM,
      previousScore: MATURITY_SCORE_TEXT.MEDIUM
    },
    {
      name: "Org Tag Three",
      score: MATURITY_SCORE_TEXT.LOW,
      previousScore: MATURITY_SCORE_TEXT.MEDIUM
    },
    {
      name: "Org Tag Four",
      score: MATURITY_SCORE_TEXT.ELITE,
      previousScore: MATURITY_SCORE_TEXT.LOW
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
      {orgTags.map((orgTag, index) => <OrgTagRow key={index} orgTag={orgTag} />)}
    </Container>
  );
}

export default SystemDrivenMaturity;