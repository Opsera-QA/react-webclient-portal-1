import React from "react"

function UserInfo({ user }) {
  return (
    <div className="grid-striped">
      <div className="p-2 mt-2">
        <div className="row mt-1">
          <div className="col-md col-header-text">User Info</div>
        </div>
        <div className="row">
          <div className="col-md"><span className="text-muted">Name:</span> {user.firstName} {user.lastName}</div>
          <div className="col-md"><span className="text-muted">Email:</span>{user.email}</div>
          <div className="col-md"><span className="text-muted">organization Name:</span>{user.organizationName}</div>
          <div className="col-md"><span className="text-muted">Domain:</span> {user.domain}</div>
        </div>
      </div>
    </div>
  )
}
export default UserInfo
