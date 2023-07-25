import React, { useState } from "react";
import { Select } from "@chakra-ui/react";

const PostFilter = ({ onFilterChange }) => {
  const [userTypeFilter, setUserTypeFilter] = useState("all");
  const [postTypeFilter, setPostTypeFilter] = useState("all");

  const handleUserTypeFilterChange = (event) => {
    setUserTypeFilter(event.target.value);
    onFilterChange(event.target.value, postTypeFilter);
  };

  const handlePostTypeFilterChange = (event) => {
    setPostTypeFilter(event.target.value);
    onFilterChange(userTypeFilter, event.target.value);
  };

  console.log(userTypeFilter);
    console.log(postTypeFilter);

  return (
    <div>
      <Select value={userTypeFilter} onChange={handleUserTypeFilterChange}>
        <option value="all">All Users</option>
        <option value="Artists">Artists</option>
        <option value="Producers">Producers</option>
      </Select>

      <Select value={postTypeFilter} onChange={handlePostTypeFilterChange}>
        <option value="all">All Posts</option>
        <option value="Looking for Artists">Looking for Artists</option>
        <option value="Looking for Producers">Looking for Producers</option>
        <option value="Looking for Samples">Looking for Samples</option>
        <option value="Looking for Mixing">Looking for Mixing</option>
        <option value="Looking for Mastering">Looking for Mastering</option>
        <option value="Looking for Vocals">Looking for Vocals</option>
        <option value="Looking for Guitarists">Looking for Guitarists</option>
        <option value="Looking for Bassists">Looking for Bassists</option>
        <option value="Looking for Drummers">Looking for Drummers</option>
        <option value="Looking for Pianists">Looking for Pianists</option>
        <option value="Looking for Synths">Looking for Synths</option>
        <option value="Looking for Other">Looking for Other</option>
      </Select>
    </div>
  );
};

export default PostFilter;