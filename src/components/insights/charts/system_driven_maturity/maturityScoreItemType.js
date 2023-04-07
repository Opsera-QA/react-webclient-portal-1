import PropTypes from 'prop-types';

export const MaturityScoreItemType = PropTypes.shape({
  name: PropTypes.string,
  score: PropTypes.string,
  previousScore: PropTypes.string
});