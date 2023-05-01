import React from 'react';
import PropTypes from 'prop-types';
import {
  MATURITY_SCORE_TEXT,
  MATURITY_SCORE_VALUE
} from "../charts-helpers";
import { MaturityScoreItemType } from './maturityScoreItemType';

function SystemDrivenMaturityChart ({ items, onRowSelect }) {
  if (!items) { 
    return null;
  }

  if (!items.length) {
    return (
      <h4 className="text-center">No data to display</h4>
    );
  }

  return (
    <table className="text-center w-100">
      <thead>
        <tr className='d-flex'>
          <th style={{ flex: 4 }}></th>
          <th style={{ flex: 1 }}>Low</th>
          <th style={{ flex: 1 }}>Medium</th>
          <th style={{ flex: 1 }}>High</th>
          <th style={{ flex: 1 }}>Elite</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => <MaturityScoreRow key={index} item={item} onRowSelect={onRowSelect} />)}
      </tbody>
    </table>
  );
}

SystemDrivenMaturityChart.propTypes = {
  items: PropTypes.arrayOf(MaturityScoreItemType),
  onRowSelect: PropTypes.func
};

const Icon = ({ color, onSelect }) => {
  if (!color) {
    return null;
  }

  const isClickable = color !== 'grey';

  const onClickHandler = () => {
    if (isClickable) {
      onSelect();
    }
  };

  const style = {
    color,
    ...(isClickable && { cursor: 'pointer' })
  };

  return <i style={style} className="fa-solid fa-circle" onClick={onClickHandler} ></i>;
};

Icon.propTypes = {
  color: PropTypes.oneOf(['grey', 'green', 'red', 'orange']),
  onSelect: PropTypes.func
};

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

const MaturityScoreRow = ({ item, onRowSelect }) => {
  const { name, score, previousScore } = item;

  const icons = {
    ...determineColor(MATURITY_SCORE_TEXT.LOW, score, previousScore),
    ...determineColor(MATURITY_SCORE_TEXT.MEDIUM, score, previousScore),
    ...determineColor(MATURITY_SCORE_TEXT.HIGH, score, previousScore),
    ...determineColor(MATURITY_SCORE_TEXT.ELITE, score, previousScore),
  };

  const onClickHandler = () => {
    if (onRowSelect) {
      onRowSelect(item);
    }
  };

  return (
    <tr className='d-flex'>
      <td className="py-2 text-left" style={{ flex: 4 }}>{name}</td>
      <td className="py-2" style={{ flex: 1 }}>
        <Icon color={icons[MATURITY_SCORE_TEXT.LOW]} onSelect={onClickHandler} />
      </td>
      <td className="py-2" style={{ flex: 1 }}>
        <Icon color={icons[MATURITY_SCORE_TEXT.MEDIUM]} onSelect={onClickHandler} />
      </td>
      <td className="py-2" style={{ flex: 1 }}>
        <Icon color={icons[MATURITY_SCORE_TEXT.HIGH]} onSelect={onClickHandler} />
      </td>
      <td className="py-2" style={{ flex: 1 }}>
        <Icon color={icons[MATURITY_SCORE_TEXT.ELITE]} onSelect={onClickHandler} />
      </td>
    </tr>
  );
};

MaturityScoreRow.propTypes = {
  item: MaturityScoreItemType,
  onRowSelect: PropTypes.func
};

export default SystemDrivenMaturityChart;