import Avatar from "boring-avatars";
import React from "react";

const Friend = ({ clicked, setClicked, name }) => {
  let itemClass = "friend";
  if (clicked) {
    itemClass = "friendExpanded";
  }

  return (
    <div className={itemClass}>
      <Avatar
        size={30}
        name={name}
        variant="bauhaus"
        colors={["#295264", "#FAD9A6", "#BD2F28", "#89373D", "#142433"]}
      />
      <div className="friendInformation">{name}</div>
    </div>
  );
};

export default Friend;
