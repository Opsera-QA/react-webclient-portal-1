import React from "react";
import {useHistory} from "react-router-dom";
import {Badge} from "react-bootstrap";
import PropTypes from "prop-types";

function OverviewLandingDeclarativePipelinesContentBlock({pendingPipelines, recentPipelines}) {
  const history = useHistory();
  const d = new Date();
  d.setDate(d.getDate() - 12);

  const loadPipelines = (id) => {
    // eslint-disable-next-line react/prop-types
    if (id) {
      history.push(`/workflow/details/${id}/summary`);
    } else {
      history.push("/workflow/owner");
    }
  };

  const getPipelineAlertsBadge = () => {
    if (Array.isArray(pendingPipelines) && pendingPipelines.length > 0) {
      return (
        <div className={"ml-2"}>
          <Badge
            variant={"danger"}
            className={"ml-1"}
            style={{ fontSize: "small" }}
          >
            New Pipeline Alerts
          </Badge>
        </div>
      );
    }
  };

  const getPendingApprovalPipelines = () => {
    if (Array.isArray(pendingPipelines) && pendingPipelines.length > 0) {
      return (
        <div className="row">
          <div className="col-12">
            <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist"
                 aria-orientation="vertical">

              {pendingPipelines.map((item, key) => (
                <a key={key} className="nav-link pointer" data-toggle="pill"
                   role="tab" aria-controls="v-pills-home" aria-selected="true" onClick={() => {
                  loadPipelines(item._id);
                }}>{item.name.substring(0, 30)}
                  {item.name.length > 30 && <>...</>}
                  <span className={"opsera-yellow"} style={{ fontStyle: "italic", fontSize: "smaller", paddingLeft:"5px"}}>Pending Approval</span></a>
              ))}

            </div>
          </div>
        </div>
      );
    }
  };

  const getRecentPipelines = () => {
    if (Array.isArray(recentPipelines) && recentPipelines.length > 0) {
      return (
        <div className="row">
          <div className="col-12">
            <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist"
                 aria-orientation="vertical">

              {recentPipelines.map((item, key) => (
                <a key={key} className="nav-link pointer" data-toggle="pill"
                   role="tab" aria-controls="v-pills-home" aria-selected="true" onClick={() => {
                  loadPipelines(item._id);
                }}>{item.name.substring(0, 50)}
                  {item.name.length > 30 && <>...</>}
                  {new Date(item.createdAt) > d &&
                  <span className={"opsera-yellow"} style={{ fontStyle: "italic", fontSize: "smaller", paddingLeft:"5px"}}>New</span>
                  }
                </a>
              ))}

            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className={"landing-content-module"}>
      <div>
        <img
          alt="Declarative Pipelines"
          src="/img/pipeline.png"
          width="195"
          height="225"
          className="d-inline-block align-top pointer"
          onClick={() => {
            loadPipelines();
          }}
        />
      </div>
      <div className="mt-4">
        <div className="h5 text-color d-flex">
          <div>Declarative Pipelines</div>
          {getPipelineAlertsBadge()}
        </div>
        <div className="text-muted pr-2">
          Pipeline workflows follow a declarative model so you focus on what is required — not how it’s
          accomplished — including: software builds, security scans, unit testing, and deployments.
        </div>
        <div className="mt-2">
          {getPendingApprovalPipelines()}
          {getRecentPipelines()}
        </div>
      </div>
    </div>
  );
}

OverviewLandingDeclarativePipelinesContentBlock.propTypes = {
  recentPipelines: PropTypes.array,
  pendingPipelines: PropTypes.array,
};

export default OverviewLandingDeclarativePipelinesContentBlock;
