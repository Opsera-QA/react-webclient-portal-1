import React from "react";
import PropTypes from "prop-types";

export const LETTER_GRADES = {
  A: "a",
  B: "b",
  C: "c",
  D: "d",
  E: "e"
};

function MetricLetterGradeText({ letterGrade }) {
  const getLetterGrade = () => {
    switch (letterGrade) {
      case LETTER_GRADES.A:
        return <div className="metric-block-content-text green">A</div>;
      case LETTER_GRADES.B:
        return <div className="metric-block-content-text yellow">B</div>;
      case LETTER_GRADES.C:
        return <div className="metric-block-content-text yellow">C</div>;
      case LETTER_GRADES.D:
        return <div className="metric-block-content-text danger-red">D</div>;
      case LETTER_GRADES.E:
        return <div className="metric-block-content-text danger-red">E</div>;
      default:
        return <div className="metric-block-content-text red">ERROR</div>;
    }
  };

  return (getLetterGrade());
}

MetricLetterGradeText.propTypes = {
  letterGrade: PropTypes.string,
};

export default MetricLetterGradeText;