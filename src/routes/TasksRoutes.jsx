import React from "react";
import { SecureRoute } from "@okta/okta-react";
import TaskManagement from "components/tasks/TaskManagement";
import TaskAllActivityPanel from "components/tasks/activity_logs/TaskAllActivityPanel";
import TaskDetailView from "components/tasks/details/TaskDetailView";

export default function TasksRoutes() {
  return (
    <>
      <SecureRoute path="/task" exact component={TaskManagement} />
      <SecureRoute path="/task/activity" exact component={TaskAllActivityPanel} />
      <SecureRoute path="/task/details/:id" exact component={TaskDetailView} />
    </>
  );
}

TasksRoutes.propTypes = {};

