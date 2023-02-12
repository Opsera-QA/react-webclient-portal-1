import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {metricHelpers} from "components/insights/metric.helpers";

// TODO: Remove
function SupportedMetricFilterInputContainer({ children }) {
  return (children);
}

SupportedMetricFilterInputContainer.propTypes = {
  children: PropTypes.any,
};

export default SupportedMetricFilterInputContainer;
