import React, {useState, useEffect, useContext, useRef} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {
  faGithub,
  faGitlab,
  faBitbucket,
  faJira,
} from "@fortawesome/free-brands-svg-icons";
import { AuthContext } from "contexts/AuthContext";
import connectedAssetsActions from "../../../connectedAssets.actions";
import { CONNECTED_ASSETS_CONSTANTS as constants } from "../../../connecetdAssets.constants";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DataBlockBoxContainer from "../../../../../common/metrics/data_blocks/DataBlockBoxContainer";
import ThreeLineIconDataBlockBase from "../../../../../common/metrics/icon/ThreeLineIconDataBlockBase";

function ConnectedAssetsWebhooksAnalyticsDetails({ dashboardData }) {
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const { getAccessToken } = useContext(AuthContext);

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
  }, [JSON.stringify(dashboardData)]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await loadPipelineData();
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

  const loadPipelineData = async (cancelSource = cancelTokenSource) => {
    setIsLoading(true);
    let dateRange = dashboardData?.getData("date");
    const response = await connectedAssetsActions.getWebhooksInfo(
      getAccessToken,
      cancelSource,
      constants.WEBHHOOKS_LIST.ANALYTICS_INFO,
      dateRange?.startDate,
      dateRange?.endDate
    );
    let dataObject = response?.data?.data?.info?.data;
    if (isMounted?.current === true && dataObject) {
      setMetrics(dataObject);
    }
  };

  return (
    <div>
      <div className={"mx-2"}>
        <Row className={"mx-0 p-2 justify-content-between"}>
          <Col md={6} className={"my-2"}>
            <DataBlockBoxContainer
              showBorder={true}
            >
              <ThreeLineIconDataBlockBase
                icon={faGitlab}
                className={"p-2"}
                middleText={"Gitlab"}
                bottomText={metrics?.gitlab}
              ></ThreeLineIconDataBlockBase>
            </DataBlockBoxContainer>
          </Col>
          <Col md={6} className={"my-2"}>
            <DataBlockBoxContainer
              showBorder={true}
            >
              <ThreeLineIconDataBlockBase
                icon={faGithub}
                className={"p-2"}
                middleText={"Github"}
                bottomText={metrics?.github}
              ></ThreeLineIconDataBlockBase>
            </DataBlockBoxContainer>
          </Col>
          <Col md={6} className={"my-2"}>
            <DataBlockBoxContainer
              showBorder={true}
            >
              <ThreeLineIconDataBlockBase
                icon={faBitbucket}
                className={"p-2"}
                middleText={"Bitbucket"}
                bottomText={metrics?.bitbucket}
              ></ThreeLineIconDataBlockBase>
            </DataBlockBoxContainer>
          </Col>
          <Col md={6} className={"my-2"}>
            <DataBlockBoxContainer
              showBorder={true}
            >
              <ThreeLineIconDataBlockBase
                icon={faJira}
                className={"p-2"}
                middleText={"Jira"}
                bottomText={metrics?.jira}
              ></ThreeLineIconDataBlockBase>
            </DataBlockBoxContainer>
          </Col>
        </Row>
      </div>
    </div>
  );
}
ConnectedAssetsWebhooksAnalyticsDetails.propTypes = {
  dashboardData: PropTypes.object,
};
export default ConnectedAssetsWebhooksAnalyticsDetails;
