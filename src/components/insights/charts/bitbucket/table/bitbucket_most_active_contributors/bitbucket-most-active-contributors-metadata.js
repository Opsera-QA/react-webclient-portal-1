const BitbucketMostActiveContributorsMetadata = {
  idProperty: "_id",
  type: "Bitbucket Most Active Contributors",
  fields: [
    // {
    //   label: "Run",
    //   id: "run_count",
    // },
    // {
    //   Header: "Author Name",
    //   accessor: "AuthorName",
    //   // class: "cell-center no-wrap-inline",
    //   Cell: (props) => {
    //     return (
    //       <div style={{ display: "flex", flexWrap: "nowrap" }}>
    //         <div>
    //           <FontAwesomeIcon icon={faStar} className="cell-icon green" />
    //         </div>
    //         <div className="ml-1">{props.value}</div>
    //       </div>
    //     );
    //   },
    // },
    {
      label: "Total Contributions (Commits)",
      id: "commitCount",
    },
  ],
  newObjectFields: {},
};

export default BitbucketMostActiveContributorsMetadata;
