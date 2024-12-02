let users = [];

const findUser = (currentUser) => {
  const userName = currentUser.name;
  const room = currentUser.room;

  return users.find((user) => user.name === userName && user.room === room);
};

const addUser = (currentUser) => {
  const isUserExist = findUser(currentUser);

  if (!isUserExist) {
    users.push(currentUser);
  }

  const user = isUserExist || currentUser;

  return {
    isExist: !!isUserExist,
    user,
  };
};

module.exports = { addUser, findUser };
