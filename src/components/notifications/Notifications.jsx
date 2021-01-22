import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable, faEnvelope } from "@fortawesome/pro-light-svg-icons";
import NotificationsView from "./NotificationsView";
import NotificationActivityLogsTable from "./notification_details/activity_logs/NotificationActivityLogsTable";

function Notifications() {
  const { tab } = useParams();
  const [activeTab, setActiveTab] = useState(tab ? tab : "notifications");

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();
    setActiveTab(tabSelection);
  };

  const getTab = (handleTabClick, tabName, icon, text) => {
    return (
      <li className="nav-item" style={{ minWidth: "5em", textAlign: "center" }}>
          <a className={"nav-link " + (activeTab === tabName ? "active" : "")} href="#"
             onClick={handleTabClick(tabName)}><FontAwesomeIcon icon={icon} fixedWidth size="lg"/><span
            className="ml-1 d-none d-lg-inline">{text}</span></a>
      </li>
    );
  };

  const getView = () => {
    switch (activeTab) {
      case "notifications":
        return <NotificationsView />;
      case "activity":
        return <NotificationActivityLogsTable allLogs={true} />;
      default:
        return null;
    }
  }

  return (
    <>
    <div className="max-content-width">
      {/*<BreadcrumbTrail destination={"pipelines"}/>*/}
      <div className="title-text-5 mb-2">Notifications</div>
      <>
        <div className="alternate-tabs">
          <ul className="nav nav-tabs">
            {getTab(handleTabClick, "notifications", faEnvelope, "Notification Policies", "Notification Policies")}
            {getTab(handleTabClick, "activity", faTable, "Activity Logs", "Activity Logs")}
          </ul>
        </div>
        <div className="content-block-collapse pt-2">
          {getView()}
        </div>
      </>
    </div>
  </>
  );
}

export default Notifications;