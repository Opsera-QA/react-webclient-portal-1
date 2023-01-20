import React from "react";
import PropTypes from "prop-types";
import {useHistory} from "react-router-dom";
import {SecureRoute} from "@okta/okta-react";
import ToolDetailView from "./components/inventory/tools/tool_details/ToolDetailView";
import PipelineDetailView from "./components/workflow/pipelines/pipeline_details/PipelineDetailView";
import TaskDetailView from "components/tasks/details/TaskDetailView";
import OpseraFooter from "components/footer/OpseraFooter";
import FreeTrialWorkspace from "components/workspace/trial/FreeTrialWorkspace";
import FreeTrialInsightsLanding from "components/trial/insights/FreeTrialInsightsLanding";
import PublicRoutes from "routes/PublicRoutes";

export default function FreeTrialAppRoutes({authClient}) {
  const history = useHistory();

  return (
    <div className={"w-100 px-3"}>
      <div className={"d-flex flex-row"}>
        {/*{getSideBar()}*/}
        <div className={"w-100 hide-x-overflow"}>
          <PublicRoutes authClient={authClient}/>
          <SecureRoute path="/inventory/tools/details/:id/:tab?" exact component={ToolDetailView}/>
          <SecureRoute path="/task/details/:id" exact component={TaskDetailView}/>
          <SecureRoute path="/workflow/details/:id/:tab?" exact component={PipelineDetailView}/>
          <SecureRoute path="/workspace" component={FreeTrialWorkspace}/>
          <SecureRoute path="/unified-insights" component={FreeTrialInsightsLanding}/>
        </div>
      </div>
      <OpseraFooter/>
    </div>
  );
}

FreeTrialAppRoutes.propTypes = {
  authClient: PropTypes.object,
};

