import React, {useState, useEffect, useContext, useRef} from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ThreeLineIconDataBlockBase from "../../common/metrics/icon/ThreeLineIconDataBlockBase";
import DataBlockBoxContainer from "../../common/metrics/data_blocks/DataBlockBoxContainer";
import { faDatabase, faCodeBranch, faBox, faStopwatch, faUsers, faListCheck, faCompressArrowsAlt, faDiagramSuccessor } from "@fortawesome/free-solid-svg-icons";


function ConnectedAssetsDetails({ dashboardData }) {

  return (
    <div>
      <div className={"mx-2"}>
        <Row className={"mx-0 p-2 justify-content-between"}>
          <Col md={3} className={"my-2"}>
            <DataBlockBoxContainer showBorder={true}>
              <ThreeLineIconDataBlockBase
                icon={faDatabase}
                className={"p-2"}
                middleText={"Repository"}
                bottomText={182}
                ></ThreeLineIconDataBlockBase>
            </DataBlockBoxContainer>
          </Col>
          <Col md={3} className={"my-2"}>
            <DataBlockBoxContainer showBorder={true}>
              <ThreeLineIconDataBlockBase
                icon={faCodeBranch}
                className={"p-2"}
                middleText={"Branches"}
                bottomText={782}
              ></ThreeLineIconDataBlockBase>
            </DataBlockBoxContainer>
          </Col>
          <Col md={3} className={"my-2"}>
            <DataBlockBoxContainer showBorder={true}>
              <ThreeLineIconDataBlockBase
                icon={faUsers}
                className={"p-2"}
                middleText={"Collaborators"}
                bottomText={314}
              ></ThreeLineIconDataBlockBase>
            </DataBlockBoxContainer>
          </Col>
          <Col md={3} className={"my-2"}>
            <DataBlockBoxContainer showBorder={true}>
              <ThreeLineIconDataBlockBase
                icon={faDiagramSuccessor}
                className={"p-2"}
                middleText={"Pipelines"}
                bottomText={27}
              ></ThreeLineIconDataBlockBase>
            </DataBlockBoxContainer>
          </Col>
          <Col md={3} className={"my-2"}>
            <DataBlockBoxContainer showBorder={true}>
              <ThreeLineIconDataBlockBase
                icon={faListCheck}
                className={"p-2"}
                middleText={"Tasks"}
                bottomText={182}
              ></ThreeLineIconDataBlockBase>
            </DataBlockBoxContainer>
          </Col>
          <Col md={3} className={"my-2"}>
            <DataBlockBoxContainer showBorder={true}>
              <ThreeLineIconDataBlockBase
                icon={faStopwatch}
                className={"p-2"}
                middleText={"Jobs"}
                bottomText={182}
              ></ThreeLineIconDataBlockBase>
            </DataBlockBoxContainer>
          </Col>
          <Col md={3} className={"my-2"}>
            <DataBlockBoxContainer showBorder={true}>
              <ThreeLineIconDataBlockBase
                icon={faCompressArrowsAlt}
                className={"p-2"}
                middleText={"Webhooks"}
                bottomText={182}
              ></ThreeLineIconDataBlockBase>
            </DataBlockBoxContainer>
          </Col>
          <Col md={3} className={"my-2"}>
            <DataBlockBoxContainer showBorder={true}>
              <ThreeLineIconDataBlockBase
                icon={faBox}
                className={"p-2"}
                middleText={"Packages"}
                bottomText={120}
              ></ThreeLineIconDataBlockBase>
            </DataBlockBoxContainer>
          </Col>
        </Row>
      </div>
    </div>
  );
}

ConnectedAssetsDetails.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
};

export default ConnectedAssetsDetails;
