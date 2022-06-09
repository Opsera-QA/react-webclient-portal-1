const DeploymentStatisticsActionableTasksMetadata = {
    idProperty: "_id",
    type: "Opsera Tasks Deployments Report",
    fields: [
        {
            label: "Task",
            id: "task_name",
        },
        {
            label: "Total Executions",
            id: "total",
        },
        {
            label: "Successful Executions",
            id: "success",
        },
        {
            label: "Failed Executions",
            id: "failure",
        },
        {
            label: "Total Time to Deploy",
            id: "duration",
        },
        {
            label: "Time to Resolve Deployments",
            id: "timeToResolve",
        }
    ],
    newObjectFields: {},
};

export default DeploymentStatisticsActionableTasksMetadata;
