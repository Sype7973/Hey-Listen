import React, { useState } from "react";
import { Select } from "@chakra-ui/react";


const PostFilter = ({ onFilterChange }) => {
  const [postTypeFilter, setPostTypeFilter] = useState("all");
// handles filtering posts
  const handlePostTypeFilterChange = (event) => {
    const selectedValue = event.target.value;
    setPostTypeFilter(selectedValue);
    onFilterChange(selectedValue); // Pass only the postTypeFilter value
  };

  console.log("postTypeFilter: ", postTypeFilter);

  return (
    <div>
      <Select m={2} value={postTypeFilter} onChange={handlePostTypeFilterChange}>
        <option value="all">All Posts</option>
        <option value="Need Artist">Looking for Artists</option>
        <option value="Need Producer">Looking for Producers</option>
        <option value="Need Sample">Looking for Samples</option>
        <option value="Need Mixing">Looking for Mixing</option>
        <option value="Need Mastering">Looking for Mastering</option>
        <option value="Need Vocals">Looking for Vocals</option>
        <option value="Need Guitarist">Looking for Guitarists</option>
        <option value="Need Bassist">Looking for Bassists</option>
        <option value="Need Drummer">Looking for Drummers</option>
        <option value="Need Pianist">Looking for Pianists</option>
        <option value="Need Synth">Looking for Synths</option>
        <option value="Need Other">Looking for Other</option>
      </Select>
    </div>
  );
};

export default PostFilter;