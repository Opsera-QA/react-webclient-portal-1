import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from "react-bootstrap";

import DataBlockBoxContainer from 'components/common/metrics/data_blocks/DataBlockBoxContainer';
import TwoLineScoreDataBlock from 'components/common/metrics/score/TwoLineScoreDataBlock';

const BLOCK_MAP = {
  deploy_count: 'Deploy Count',
  validations_passed: 'Validations Passed',
  validations_failed: 'Validations Failed',
  unit_tests_passed: 'Unit Tests Passed',
  unit_tests_failed: 'Unit Tests Failed',
  pipelines: 'Pipelines'
};

const DataBlock = ({title, value}) => (
  <Col xl={2} lg={2} sm={4} className={"my-3"}>
    <DataBlockBoxContainer showBorder={true}>
    <TwoLineScoreDataBlock
      className="p-2 lookup-pipelines"
      score={value}
      subtitle={title}
    />
  </DataBlockBoxContainer>
  </Col>
);

DataBlock.propTypes = {
  title: PropTypes.string,
  value: PropTypes.number
};

const LookupTableTotals = ({
  data
}) => {

  if (data.length === 0) {
    return null;
  }

  const blockKeys = Object.keys(BLOCK_MAP);

  return (
    <Row className="px-2">
      {blockKeys.map((blockKey, idx) => {
        const key = `block-${idx}`;
        const title = BLOCK_MAP[blockKey];
        const value = data[0][blockKey];
        return <DataBlock key={key} title={title} value={value} />;
      })}
    </Row>
  );
};

LookupTableTotals.propTypes = {
  data: PropTypes.array
};

export default LookupTableTotals;
