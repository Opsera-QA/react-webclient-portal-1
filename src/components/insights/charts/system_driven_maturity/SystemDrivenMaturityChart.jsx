import React from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Popover } from "react-bootstrap";
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

const determineColor = (maturity, score, previous) => {
  if (score === previous && score === maturity) {
    return 'orange';
  }

  if (score === maturity) {
    // determine if new score is greater or lower than previous
    return MATURITY_SCORE_VALUE[score] > MATURITY_SCORE_VALUE[previous] ? 'green' : 'red';
  }

  if (previous === maturity) {
    return 'grey';
  }
  
  // no color, no icon
  return null;
};

const Icon = ({ maturity, item, onSelect }) => {
  if (!maturity) {
    return null;
  }

  const {
    score,
    previousScore,
    deploymentFrequencyMaturityScoreText,
    leadTimeForChangesMaturityScoreText,
    changeFailureRateMaturityScoreText,
    meanTimeToResolutionMaturityScoreText,
  } = item;

  const color = determineColor(maturity, score, previousScore);

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

  const icon = <i style={style} className="fa-solid fa-circle" onClick={onClickHandler} ></i>;

  if (isClickable) {
    return (
      <OverlayTrigger
        rootClose
        placement="left"
        overlay={
          <Popover
            id="popover-basic"
            style={{ maxWidth: "500px" }}
          >
            <Popover.Content>
              <div className='text-muted'>
                <div className="mb-2">
                  Deployment Frequency: {deploymentFrequencyMaturityScoreText}
                </div>
                <div className="mb-2">
                  Lead Time For Changes: {leadTimeForChangesMaturityScoreText}
                </div>
                <div className="mb-2">
                  Change Failure Rate: {changeFailureRateMaturityScoreText}
                </div>
                <div className=" mb-2">
                  Mean Time To Resolution: {meanTimeToResolutionMaturityScoreText}
                </div>
              </div>
            </Popover.Content>
          </Popover>
        }
      >
        {icon}
      </OverlayTrigger>
    );
  }

  return icon;
};

Icon.propTypes = {
  maturity: PropTypes.oneOf(Object.values(MATURITY_SCORE_TEXT)).isRequired,
  item: MaturityScoreItemType,
  onSelect: PropTypes.func
};

const MaturityScoreRow = ({ item, onRowSelect }) => {
  const { name } = item;

  const onClickHandler = () => {
    if (onRowSelect) {
      onRowSelect(item);
    }
  };

  return (
    <tr className='d-flex'>
      <td className="py-2 text-left" style={{ flex: 4 }}>{name}</td>
      <td className="py-2" style={{ flex: 1 }}>
        <Icon maturity={MATURITY_SCORE_TEXT.LOW} item={item} onSelect={onClickHandler} />
      </td>
      <td className="py-2" style={{ flex: 1 }}>
        <Icon maturity={MATURITY_SCORE_TEXT.MEDIUM} item={item} onSelect={onClickHandler} />
      </td>
      <td className="py-2" style={{ flex: 1 }}>
        <Icon maturity={MATURITY_SCORE_TEXT.HIGH} item={item} onSelect={onClickHandler} />
      </td>
      <td className="py-2" style={{ flex: 1 }}>
        <Icon maturity={MATURITY_SCORE_TEXT.ELITE} item={item} onSelect={onClickHandler} />
      </td>
    </tr>
  );
};

MaturityScoreRow.propTypes = {
  item: MaturityScoreItemType,
  onRowSelect: PropTypes.func
};

export default SystemDrivenMaturityChart;