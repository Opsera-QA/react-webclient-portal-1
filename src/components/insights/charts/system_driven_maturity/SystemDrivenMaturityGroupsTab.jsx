import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Container from "react-bootstrap/Container";
import { MATURITY_SCORE_TEXT } from "../charts-helpers";
import { MaturityScoreItemType } from './maturityScoreItemType';
import SystemDrivenMaturityTimelineChart from './SystemDrivenMaturityTimelineChart';
import SystemDrivenMaturityChart from './SystemDrivenMaturityChart';

function SystemDrivenMaturityGroupsTab ({ kpiConfiguration, dashboardData, orgTag, onSelectGroup }) {
  const [groups, setGroups] = useState(null);

  useEffect(() => {
    // obtain groups from orgTag
    setGroups([
      {
        name: 'Organization Tag A',
        score: MATURITY_SCORE_TEXT.ELITE,
        previousScore: MATURITY_SCORE_TEXT.MEDIUM
      },
      {
        name: 'Organization Tag B',
        score: MATURITY_SCORE_TEXT.MEDIUM,
        previousScore: MATURITY_SCORE_TEXT.MEDIUM
      },
      {
        name: 'Organization Tag C',
        score: MATURITY_SCORE_TEXT.LOW,
        previousScore: MATURITY_SCORE_TEXT.HIGH
      }
    ]);
  }, []);

  return (
    <Container>
      <SystemDrivenMaturityTimelineChart />
      <div style={{ fontSize: '2rem' }}>
        <SystemDrivenMaturityChart items={groups} onRowSelect={onSelectGroup} />
      </div>
    </Container>
  );
}

SystemDrivenMaturityGroupsTab.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  orgTag: MaturityScoreItemType,
  onSelectGroup: PropTypes.func
};

export default SystemDrivenMaturityGroupsTab;