import React, { useContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import Container from "react-bootstrap/Container";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import TabPanelContainer from "components/common/panels/general/TabPanelContainer";
import { DialogToastContext } from "contexts/DialogToastContext";
import { MATURITY_SCORE_TEXT, MATURITY_SCORE_VALUE } from "../../charts-helpers";


const MaturityScoreItemType = PropTypes.shape({
  name: PropTypes.string,
  score: PropTypes.string,
  previousScore: PropTypes.string
});

const OrgTagType = PropTypes.shape({
  name: PropTypes.string,
  score: PropTypes.string,
  previousScore: PropTypes.string
});

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

const OrgTagRow = ({ orgTag, onRowSelect }) => {
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

  const cellStyle = {
    border: '1px solid grey'
  };

  const onClickHandler = () => {
    if (onRowSelect) {
      onRowSelect(orgTag);
    }
  };

  return (
    <tr>
      <td style={{borderBottom: '1px solid grey'}} className="py-2">{name}</td>
      <td style={cellStyle} className="py-2">
        <Icon color={icons[MATURITY_SCORE_TEXT.LOW]} onSelect={onClickHandler} />
      </td>
      <td style={cellStyle} className="py-2">
        <Icon color={icons[MATURITY_SCORE_TEXT.MEDIUM]} onSelect={onClickHandler} />
      </td>
      <td style={cellStyle} className="py-2">
        <Icon color={icons[MATURITY_SCORE_TEXT.HIGH]} onSelect={onClickHandler} />
      </td>
      <td style={cellStyle} className="py-2">
        <Icon color={icons[MATURITY_SCORE_TEXT.ELITE]} onSelect={onClickHandler} />
      </td>
    </tr>
  );
};

OrgTagRow.propTypes = {
  orgTag: OrgTagType,
  onRowSelect: PropTypes.func
};

function SystemDrivenMaturity ({ orgTags }) {
  const onRowSelect = orgTag => {
    console.log('SDM open overlay for orgTag:', orgTag);
  };

  return (
    <Container className="p-3" style={{fontSize: '2rem'}}>
      <table className="text-center w-100">
        <thead>
          <tr>
            <th></th>
            <th>Low</th>
            <th>Medium</th>
            <th>High</th>
            <th>Elite</th>
          </tr>
        </thead>
        <tbody>
          {orgTags.map((orgTag, index) => <OrgTagRow key={index} orgTag={orgTag} onRowSelect={onRowSelect} />)}
        </tbody>
      </table>
    </Container>
  );
}

SystemDrivenMaturity.propTypes = {
  orgTags: PropTypes.array
};

SystemDrivenMaturity.defaultProps = {
  orgTags: []
};

export default SystemDrivenMaturity;