import React, { useState } from "react";
import { Select } from "@chakra-ui/react";

const PostFilter = ({ onFilterChange }) => {
  const [postTypeFilter, setPostTypeFilter] = useState("all");

  const handlePostTypeFilterChange = (event) => {
    setPostTypeFilter(event.target.value);
    onFilterChange(event.target.value); // Pass only the postTypeFilter value
  };

  console.log("postTypeFilter: ", postTypeFilter);

  return (
    <div>
      <Select value={postTypeFilter} onChange={handlePostTypeFilterChange}>
        <option value="all">All Posts</option>
        <option value="Samples">Looking for Samples</option>
        <option value="Mixing">Looking for Mixing</option>
        <option value="Mastering">Looking for Mastering</option>
        <option value="Vocals">Looking for Vocals</option>
        <option value="Guitarists">Looking for Guitarists</option>
        <option value="Bassists">Looking for Bassists</option>
        <option value="Drummers">Looking for Drummers</option>
        <option value="Pianists">Looking for Pianists</option>
        <option value="Synths">Looking for Synths</option>
        <option value="Other">Looking for Other</option>
      </Select>
    </div>
  );
};

export default PostFilter;