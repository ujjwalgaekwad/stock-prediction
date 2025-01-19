const addUsernameInTag = (tag, username) => {
  const addedUserTag = username + "/" + tag;
  return addedUserTag;
};

const removeUsernameTag = (
  tag,
  username
) => {
  if (username) return tag.replace(username + "/", "");
  const removedUserTag = tag.split("/").pop();
  return removedUserTag;
};

export { removeUsernameTag, addUsernameInTag };
