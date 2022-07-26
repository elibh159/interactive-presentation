const users = [];

const addUser = async (socketId, userType, sessionId) => {
  return new Promise((resolve, reject) => {
    const exist = users.find(
      (user) => user.sessionId === sessionId && user.socketId === socketId
    );
    if (exist) {
      return;
    }
    const newId =
      users.reduce((acc, item) => (acc = acc > item.id ? acc : item.id), 0) + 1;

    const user = { socketId, userType, userId: newId, sessionId };
    users.push(user);
    resolve(user);
  });
};

const editUser = async (socketId, userType, userId, sessionId) => {
  return new Promise((resolve, reject) => {
    const index = users.findIndex((user) => user.socketId === socketId);
    if (index !== -1) {
      users[index] = { socketId, userType, userId, sessionId };
      resolve(user);
    } else {
      reject("not found this object");
    }
  });
};

const removeUser = async (socketId) => {
  return new Promise((resolve, reject) => {
    const index = users.findIndex((user) => user.socketId === socketId);
    if (index !== -1) {
      resolve(users.splice(index, 1)[0]);
    } else {
      reject("not found this object");
    }
  });
};

const getUser = async (socketId) => {
  return new Promise((resolve, reject) => {
    const user = users.find((user) => user.socketId === socketId);
    if (user) {
      resolve(user);
    } else {
      reject("not found this object");
    }
  });
};

const getUserAttendeeCount = async (sessionId) => {
  return new Promise((resolve, reject) => {
    const attendeeCount = users.reduce(
      (n, item) =>
        item.sessionId === sessionId && item.userType === "attendee"
          ? n + 1
          : n,
      0
    );
    resolve(attendeeCount);
  });
};

const getUserPresenterCount = async (sessionId) => {
  return new Promise((resolve, reject) => {
    const presenterCount = users.reduce(
      (n, item) =>
        item.sessionId === sessionId && item.userType === "presenter"
          ? n + 1
          : n,
      0
    );
    resolve(presenterCount);
  });
};

export {
  addUser,
  editUser,
  removeUser,
  getUser,
  getUserAttendeeCount,
  getUserPresenterCount,
};
