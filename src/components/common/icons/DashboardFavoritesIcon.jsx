import React, {useState} from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/pro-light-svg-icons";
import {faStar as faStarSolid} from "@fortawesome/pro-solid-svg-icons";

function DashboardFavoritesIcon({dashboard, dashboardsActions, getAccessToken}) {
  const [favorite, setFavorite] = useState(dashboard.isFavorite);

  const changeFavorite = (rowData) => {
    rowData.isFavorite = !rowData.isFavorite;
    setFavorite(rowData.isFavorite);
    dashboardsActions.updateFavorite(rowData, getAccessToken);
  };

  return (
    <div className="text-center">
      <FontAwesomeIcon
        className={"opsera-gold"}
        icon={favorite ? faStarSolid : faStar}
        onClick={(e) => {
          console.log(e);
          changeFavorite(dashboard);
          e.stopPropagation();
        }}
      />
    </div>
  );
}

DashboardFavoritesIcon.propTypes = {
    dashboard: PropTypes.object,
    dashboardsActions: PropTypes.object,
    getAccessToken: PropTypes.func
  };

export default DashboardFavoritesIcon;