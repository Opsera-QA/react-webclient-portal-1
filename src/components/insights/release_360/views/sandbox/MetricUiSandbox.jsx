import React from 'react';
import BuildAndDeployMetrics from "components/insights/charts/opsera/build_and_deploy_statistics/BuildAndDeployMetrics";

// TODO: This is a temporary spot to showcase in progress Metric UIs
function MetricUiSandbox() {
  return (
    <div className={"mt-2"}>
      <BuildAndDeployMetrics
      />
    </div>
  );
}

MetricUiSandbox.propTypes = {};

export default MetricUiSandbox;
