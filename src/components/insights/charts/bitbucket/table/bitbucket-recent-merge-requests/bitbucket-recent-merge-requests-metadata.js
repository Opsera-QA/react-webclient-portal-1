const BitbucketMostActiveContributorsMetadata = {
  idProperty: "_id",
  type: "Bitbucket Pending Merge Requests",
  fields: [
    {
      label: "Author",
      id: "AuthorName",
      // class: "cell-center no-wrap-inline",
      // Cell: (props) => {
      //     return props.value ?  <>
      //     <div>
      //       <span style={{ fontWeight: "bold" }}>{props.value} &nbsp;</span>
      //       <span
      //         title="Number of commits"
      //         style={{
      //           boxSizing: "border-box",
      //           fontSize: "12px",
      //           margin: "1px",
      //           lineHeight: "20px",
      //           padding: "3px",
      //           border: "1px solid #dbdbdb",
      //           borderRadius: "100px",
      //           fontWeight: "400",
      //         }}
      //         className=""
      //       >
      //         {/* commits: {value["TotalCommits"]} */}
      //       </span>
      //     </div>
      //     <span style={{ color: "grey" }}>
      //       {/* {value["MergeRequestTitle"].length > 70
      //         ? value["MergeRequestTitle"].substring(0, 50) + "..."
      //         : value["MergeRequestTitle"]} */}
      //     </span>
      //   </> :  "unknown";
      //   }
      // },
    },
    {
      label: "Reviewer",
      id: "AssigneeName",
    },
    {
      label: "Merge Request Title",
      id: "MergeRequestTitle",
    },
    {
      label: "Merge Time (H)",
      id: "MergeRequestTimeTaken",
    },
    // {
    //   label: "Push Time (H)",
    //   id: "PushCodeTime",
    // },
    {
      label: "Branch",
      id: "BranchName",
    },
    {
      label: "Project",
      id: "ProjectName",
    },
  ],
  newObjectFields: {},
};

export default BitbucketMostActiveContributorsMetadata;
