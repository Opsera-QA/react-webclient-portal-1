import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import Container from "react-bootstrap/Container";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import TabPanelContainer from "components/common/panels/general/TabPanelContainer";
import VanityMetricContainer from "components/common/panels/insights/charts/VanityMetricContainer";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import SystemDrivenMaturityHelpDocumentation from "components/common/help/documentation/insights/charts/SystemDrivenMaturityHelpDocumentation";
import {
  getDeploymentStageFromKpiConfiguration,
  getResultFromKpiConfiguration,
  getUseDashboardTagsFromKpiConfiguration,
  MATURITY_SCORE_TEXT,
  MATURITY_SCORE_VALUE
} from "../charts-helpers";
import doraActions from "../dora/dora.action";

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

function TimelineChart () {
  return (
    <h4>TODO: Timeline Chart...</h4>
  );
}

function GroupsTab ({ kpiConfiguration, dashboardData, orgTag, onSelectGroup }) {
  const [groups, setGroups] = useState(null);

  useEffect(() => {
    // obtain groups from orgTag
    setGroups([
      {
        name: 'A',
        score: MATURITY_SCORE_TEXT.ELITE,
        previousScore: MATURITY_SCORE_TEXT.MEDIUM
      },
      {
        name: 'B',
        score: MATURITY_SCORE_TEXT.MEDIUM,
        previousScore: MATURITY_SCORE_TEXT.MEDIUM
      },
      {
        name: 'C',
        score: MATURITY_SCORE_TEXT.LOW,
        previousScore: MATURITY_SCORE_TEXT.HIGH
      }
    ]);
  }, []);

  return (
    <Container>
      <TimelineChart />
      <div style={{ fontSize: '2rem' }}>
        <SystemDrivenMaturityChart items={groups} onRowSelect={onSelectGroup} />
      </div>
    </Container>
  );
}

GroupsTab.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  orgTag: OrgTagType,
  onSelectGroup: PropTypes.func
};

function ProjectsTab ({ kpiConfiguration, dashboardData, group }) {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    // obtain projects from group
    setProjects([
      {
        name: 'Project A',
        score: MATURITY_SCORE_TEXT.HIGH,
        previousScore: MATURITY_SCORE_TEXT.LOW
      },
      {
        name: 'Project B',
        score: MATURITY_SCORE_TEXT.LOW,
        previousScore: MATURITY_SCORE_TEXT.MEDIUM
      },
      {
        name: 'Project C',
        score: MATURITY_SCORE_TEXT.MEDIUM,
        previousScore: MATURITY_SCORE_TEXT.LOW
      },
      {
        name: 'Project D',
        score: MATURITY_SCORE_TEXT.ELITE,
        previousScore: MATURITY_SCORE_TEXT.ELITE
      }
    ]);
  }, []);

  return (
    <Container>
      <TimelineChart />
      <div style={{ fontSize: '2rem' }}>
        <SystemDrivenMaturityChart items={projects} />
      </div>
    </Container>
  );
}

ProjectsTab.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  group: OrgTagType,
};

const OVERLAY_TABS = {
  GROUPS: 'groups',
  PROJECTS: 'projects'
};

function Overlay ({ kpiConfiguration, dashboardData, orgTag }) {
  const toastContext = useContext(DialogToastContext);
  const [activeTab, setActiveTab] = useState(OVERLAY_TABS.GROUPS);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const onSelectGroup = (group) => {
    setActiveTab(OVERLAY_TABS.PROJECTS);
    setSelectedGroup(group);
  };

  const onGoToGroupsTab = () => {
    setActiveTab(OVERLAY_TABS.GROUPS);
    setSelectedGroup(null);
  };

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const breadcrumbBar = (
    <>
      <button type="button" onClick={onGoToGroupsTab}>GROUPS</button>
      {selectedGroup && <h5>{selectedGroup.name}</h5>}
    </>
  );

  const getBody = () => {
    if (!orgTag) {
      return 'No organization tag';
    }

    if (activeTab === OVERLAY_TABS.GROUPS) {
      return (
        <GroupsTab
            kpiConfiguration={kpiConfiguration}
            dashboardData={dashboardData}
            orgTag={orgTag}
            onSelectGroup={onSelectGroup}
        />
      );
    }

    if (activeTab === OVERLAY_TABS.PROJECTS) {
      return (
        <ProjectsTab
          kpiConfiguration={kpiConfiguration}
          dashboardData={dashboardData}
          group={selectedGroup}
        />
      );
    }
  };

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      showPanel={true}
      titleText={"Dora Organization Tags Actionable Insights"}
      showToasts={true}
    >
      {breadcrumbBar}
      <div className={"p-3"}>
        <TabPanelContainer currentView={getBody()} />
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

Overlay.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  orgTag: OrgTagType
};

function SystemDrivenMaturityChart ({ items, onRowSelect }) {
  if (!items) {
    return (
      <h4 className="text-center">No data to display</h4>
    );
  }

  return (
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
        {items.map((item, index) => <OrgTagRow key={index} orgTag={item} onRowSelect={onRowSelect} />)}
      </tbody>
    </table>
  );
}

SystemDrivenMaturityChart.propTypes = {
  items: PropTypes.arrayOf(MaturityScoreItemType),
  onRowSelect: PropTypes.func
};

function SystemDrivenMaturity ({ kpiConfiguration, dashboardData, index, setKpiConfiguration, setKpis }) {
  const toastContext = useContext(DialogToastContext);

  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metricData, setMetricData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    isMounted.current = true;
    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      const dashboardTags = dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      const dashboardOrgs = dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "organizations")]?.value;
      const selectedDeploymentStages = getDeploymentStageFromKpiConfiguration(kpiConfiguration)?.length || 0;
      const jiraResolutionNames = getResultFromKpiConfiguration(kpiConfiguration, 'jira-resolution-names');
      const useDashboardTags = getUseDashboardTagsFromKpiConfiguration(kpiConfiguration);

      console.log({ selectedDeploymentStages, jiraResolutionNames, useDashboardTags, dashboardOrgs, dashboardTags });

      if (selectedDeploymentStages && jiraResolutionNames?.length && useDashboardTags && dashboardOrgs?.length) {
        // const response = await doraActions.jiraGitlabRolledUp(
        //   getAccessToken,
        //   cancelSource,
        //   kpiConfiguration,
        //   dashboardTags,
        //   dashboardOrgs,
        //   jiraResolutionNames
        // );

        const response = {
          data: {
            data: [
              {
                name: "Org Tag One",
                score: MATURITY_SCORE_TEXT.HIGH,
                previousScore: MATURITY_SCORE_TEXT.MEDIUM
              },
              {
                name: "Org Tag Two",
                score: MATURITY_SCORE_TEXT.MEDIUM,
                previousScore: MATURITY_SCORE_TEXT.MEDIUM
              },
              {
                name: "Org Tag Three",
                score: MATURITY_SCORE_TEXT.LOW,
                previousScore: MATURITY_SCORE_TEXT.MEDIUM
              },
              {
                name: "Org Tag Four",
                score: MATURITY_SCORE_TEXT.ELITE,
                previousScore: MATURITY_SCORE_TEXT.LOW
              }
            ]
          }
        };

        const metrics = response?.data?.data;

        if (isMounted?.current === true && metrics?.length) {
          setMetricData(metrics);
        } else {
          setMetricData([]);
        }
      }
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        setError(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const onRowSelect = orgTag => {
    toastContext.showOverlayPanel(
      <Overlay
          kpiConfiguration={{}}
          dashboardData={{}}
          orgTag={orgTag}
      />
    );
  };

  const getChartBody = () => {
    return (
      <Container className="p-3" style={{fontSize: '2rem'}}>
        <SystemDrivenMaturityChart items={metricData} onRowSelect={onRowSelect} />
      </Container>
    );
  };

  return (
    <VanityMetricContainer
      title={"System Driven Maturity"}
      kpiConfiguration={kpiConfiguration}
      setKpiConfiguration={setKpiConfiguration}
      chart={getChartBody()}
      dashboardData={dashboardData}
      index={index}
      error={error}
      setKpis={setKpis}
      isLoading={isLoading}
      chartHelpComponent={(closeHelpPanel) => (
        <SystemDrivenMaturityHelpDocumentation onClose={closeHelpPanel} />
      )}
    />
  );
}

SystemDrivenMaturity.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
};

export default SystemDrivenMaturity;