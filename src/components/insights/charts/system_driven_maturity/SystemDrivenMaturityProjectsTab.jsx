import React from 'react';
import PropTypes from 'prop-types';
import Container from "react-bootstrap/Container";
import { MaturityScoreItemType } from './maturityScoreItemType';
import SystemDrivenMaturityTimelineChart from './SystemDrivenMaturityTimelineChart';

function SystemDrivenMaturityProjectsTab ({ kpiConfiguration, dashboardData, group }) {
  // TODO: obtain projects from group

  return (
    <Container>
      <SystemDrivenMaturityTimelineChart />
    </Container>
  );
}

SystemDrivenMaturityProjectsTab.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  group: MaturityScoreItemType,
};

export default SystemDrivenMaturityProjectsTab;