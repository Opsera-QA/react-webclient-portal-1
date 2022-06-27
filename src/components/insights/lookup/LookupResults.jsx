import React, { useState } from "react";
import {faBug} from "@fortawesome/pro-light-svg-icons";
import PropTypes from 'prop-types';
import LoadingDialog from "components/common/status_notifications/loading";
import FilterContainer from "components/common/table/FilterContainer";
import LookupTableTotals from "./LookupTableTotals";
import LookupTablePipelines from "./LookupTablePipelines";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import { Col, Row } from "react-bootstrap";

const LookupResults = ({ isLoading, activeTables }) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (eventKey, event) => {
        console.log('handleTabClick', { eventKey, event });
    };

    let totals, componentName, pipelines;

    console.log({ activeTables, activeTab });

    let currentActiveTable = null;

    if (activeTables) {
        currentActiveTable = activeTables[activeTab];
    }

    console.log({ currentActiveTable });

    if (currentActiveTable) {
        totals = currentActiveTable.totals;
        componentName = currentActiveTable.componentName;
        pipelines = currentActiveTable.pipelines;
    }

    console.log({ totals, componentName, pipelines });

    if (isLoading) {
        return (
          <LoadingDialog size={"sm"} message={"Loading Customer Onboard Editor"} />
        );
    }

    if (!activeTables || activeTables.length === 0) {
        return null;
    }
    
    return (
        <Row>
            <Col sm={3} className={"px-0"}>
                <VanitySetVerticalTabContainer>
                    {activeTables && activeTables.map(({ componentName }, index) => (
                        <VanitySetVerticalTab
                            key={`${componentName}-${index}`}
                            tabText={componentName}
                            tabName={componentName}
                            handleTabClick={handleTabClick}
                            activeTab={activeTab}
                        />
                    ))}
                </VanitySetVerticalTabContainer>
            </Col>
            <Col sm={9} className={"px-0"}>
                <>
                    <FilterContainer
                        className="mt-2 lookup-table"
                        showBorder={false}
                        body={<LookupTableTotals data={totals} />}
                        titleIcon={faBug}
                        title={`${componentName}: Totals`}
                    />
                    <FilterContainer
                        className="mt-2 lookup-pipelines"
                        showBorder={false}
                        body={<LookupTablePipelines data={pipelines} />}
                        titleIcon={faBug}
                        title={`${componentName}: Pipelines`}
                    />
                </>
            </Col>
        </Row>
    );
};



LookupResults.propTypes = {
    isLoading: PropTypes.bool,
    activeTables: PropTypes.arrayOf(
        PropTypes.shape({
            totals: PropTypes.array,
            pipelines: PropTypes.array,
            componentName: PropTypes.string
        })
    )
};

export default LookupResults;