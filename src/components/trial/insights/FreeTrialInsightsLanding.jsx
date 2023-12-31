import React from "react";
import useHeaderNavigationBarReference from "hooks/useHeaderNavigationBarReference";
import FreeTrialLandingHeaderNavigationBar from "components/trial/landing/FreeTrialLandingHeaderNavigationBar";
import DashboardViewer from "components/insights/dashboards/dashboard_details/DashboardViewer";
import DashboardModel from "components/insights/dashboards/dashboard.model";
import dashboardMetadata from "components/insights/dashboards/dashboard-metadata";

export default function FreeTrialInsightsLanding() {
  useHeaderNavigationBarReference(<FreeTrialLandingHeaderNavigationBar currentScreen={"insights"} />);
  let response = {
    "data": {
      "_id" : "630e28a831cb3a0014ed59be",
      "filters" : [],
      "tags" : [],
      "name" : "Free Trial Dashboard",
      "description" : "",
      "visibility" : "private",
      "type" : "",
      "active" : true,
      "isFavorite" : false,
      "configuration" : [ 
          {
              "kpi_category" : [ 
                  "pipeline"
              ],
              "filters" : [ 
                  {
                      "type" : "tags",
                      "value" : []
                  }, 
                  {
                      "type" : "date",
                      "value" : null
                  }
              ],
              "dataPoints" : [],
              "tags" : [],
              "_id" : "630e28bb31cb3a0014ed59ef",
              "kpi_identifier" : "opsera-recent-pipeline-status",
              "kpi_name" : "Recent Pipeline Status",
              "kpi_settings" : {
                  "rows" : 5
              },
              "active" : true,
              "updatedAt" : new Date("2022-08-30T15:11:55.514Z")
          }, 
          {
              "kpi_category" : [ 
                  "pipeline"
              ],
              "filters" : [ 
                  {
                      "type" : "tags",
                      "value" : []
                  }, 
                  {
                      "type" : "date",
                      "value" : null
                  }
              ],
              "dataPoints" : [],
              "tags" : [],
              "_id" : "630e28c731cb3a0014ed5a19",
              "kpi_identifier" : "opsera-deployment-frequency",
              "kpi_name" : "Deployment Frequency",
              "active" : true,
              "updatedAt" : new Date("2022-08-30T15:12:07.681Z")
          }, 
          {
            "kpi_category" : [],
            "filters" : [ 
                {
                    "type" : "tags",
                    "value" : []
                }, 
                {
                    "type" : "date",
                    "value" : null
                }
            ],
            "dataPoints" : [ 
            ],
            "tags" : [],
            "_id" : "630e28e431cb3a0014ed5a6e",
            "kpi_identifier" : "salesforce-components-chart",
            "kpi_name" : "Salesforce Components",
            "active" : true,
            "updatedAt" : new Date("2022-08-30T15:12:36.243Z")
          },
          {
              "kpi_category" : [ 
                  "pipeline"
              ],
              "filters" : [ 
                  {
                      "type" : "tags",
                      "value" : []
                  }, 
                  {
                      "type" : "date",
                      "value" : null
                  }, 
                  {
                      "type" : "goals"
                  }
              ],
              "dataPoints" : [],
              "tags" : [],
              "_id" : "630e28d231cb3a0014ed5a35",
              "kpi_identifier" : "salesforce-duration-by-stage",
              "kpi_name" : "Duration By Stage",
              "active" : true,
              "updatedAt" : new Date("2022-08-30T15:12:18.441Z")
          }, 
      ],
      "attributes" : {
          "persona" : ""
      },
      "roles" : [],
      "owner" : "60785c10ae42330133c55f7e",
      "owner_name" : "Deactivated User",
      "account" : "devqaaccc",
      "createdAt" : new Date("2022-08-30T15:11:36.617Z"),
      "updatedAt" : new Date("2022-08-30T15:12:36.242Z"),
      "__v" : 0
  },
    "roles": {
        "get_dashboards": {
            "id": "get_dashboards",
            "description": "Allowed to pull Dashboards",
            "allowedRoles": [
                "no_access_rules"
            ]
        },
        "get_dashboard_by_id": {
            "id": "get_dashboard_by_id",
            "description": "Allowed to get a specific Dashboard by ID",
            "allowedRoles": [
                "opsera_administrator",
                "site_administrator",
                "saas_user",
                "administrator",
                "manager",
                "owner",
                "user",
                "guest"
            ]
        },
        "create_dashboard": {
            "id": "create_dashboard",
            "description": "Allowed to create a Dashboard",
            "allowedRoles": [
                "no_access_rules"
            ]
        },
        "update_dashboard": {
            "id": "update_dashboard",
            "description": "Able to update a Dashboard",
            "allowedRoles": [
                "opsera_administrator",
                "site_administrator",
                "saas_user",
                "administrator",
                "manager",
                "owner"
            ]
        },
        "update_dashboard_filters": {
            "id": "update_dashboard_filters",
            "description": "Able to update a Dashboard's Filters",
            "allowedRoles": [
                "opsera_administrator",
                "site_administrator",
                "saas_user",
                "administrator",
                "manager",
                "owner",
                "user"
            ]
        },
        "edit_access_roles": {
            "id": "edit_access_roles",
            "description": "Able to update a Dashboard's Access Rules",
            "allowedRoles": [
                "opsera_administrator",
                "site_administrator",
                "saas_user",
                "administrator",
                "manager",
                "owner"
            ]
        },
        "delete_dashboard": {
            "id": "delete_dashboard",
            "description": "Able to delete a Dashboard",
            "allowedRoles": [
                "opsera_administrator",
                "site_administrator",
                "saas_user",
                "administrator",
                "owner"
            ]
        },
        "transfer_dashboard_ownership_to_new_user": {
            "id": "transfer_dashboard_ownership_to_new_user",
            "description": "Able to transfer a Dashboard's Ownership to another user",
            "allowedRoles": [
                "opsera_administrator",
                "site_administrator",
                "administrator",
                "owner"
            ]
        },
        "publish_dashboard_to_private_catalog": {
            "id": "publish_dashboard_to_private_catalog",
            "description": "Able to publish a Dashboard to your private catalog",
            "allowedRoles": [
                "opsera_administrator",
                "site_administrator",
                "saas_user",
                "administrator",
                "owner",
                "manager"
            ]
        },
        "add_dashboard_metric": {
            "id": "add_dashboard_metric",
            "description": "Allowed to add a metric to a Dashboard",
            "allowedRoles": [
                "opsera_administrator",
                "site_administrator",
                "saas_user",
                "manager",
                "administrator",
                "owner"
            ]
        },
        "update_dashboard_metric": {
            "id": "update_dashboard_metric",
            "description": "Allowed to update a Dashboard Metric, including its filters",
            "allowedRoles": [
                "opsera_administrator",
                "site_administrator",
                "saas_user",
                "manager",
                "administrator",
                "owner",
                "user"
            ]
        },
        "delete_dashboard_metric": {
            "id": "delete_dashboard_metric",
            "description": "Able to delete a Dashboard",
            "allowedRoles": [
                "opsera_administrator",
                "site_administrator",
                "saas_user",
                "administrator",
                "manager",
                "owner"
            ]
        }
    }
  };
  let dashboard = response.data;
  let dashboardModel = new DashboardModel(dashboard, dashboardMetadata);

  return (
    <div className={"max-content-width"}>
      <div className={"px-3 mt-3"}>
        <div className="d-flex align-items-left mb-2 marketingModulesTextLarger">{`Welcome to Opsera’s Unified Insights`}</div>
        <div>Unified Insights offers customers a top down view of the health and activities of all of the pipelines in the Opsera platform.  This is a small preview of the many charts and KPI’s available in the Opsera Analytics Marketplace.</div>
      </div>
      <DashboardViewer dashboardModel={dashboardModel}/>
    </div>
  );
}

FreeTrialInsightsLanding.propTypes = {};