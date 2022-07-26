const sessions = [
  {
    id: 1,
    code: "Free2022",
    title: "New Sendsteps",
  },
];

const addSession = async ({ code, title }) => {
  return new Promise((resolve, reject) => {
    const newId =
      sessions.reduce((acc, item) => (acc = acc > item.id ? acc : item.id), 0) +
      1;
    const session = { id: newId, code, title };
    sessions.push(session);
    resolve(session);
  });
};

const editSession = async ({ id, code, title }) => {
  return new Promise((resolve, reject) => {
    const index = sessions.findIndex((session) => session.id === id);
    if (index !== -1) {
      sessions[index] = { id: newId, code, title };
      resolve(session);
    } else {
      reject("not found this object");
    }
  });
};

const removeSession = async (id) => {
  return new Promise((resolve, reject) => {
    const index = sessions.findIndex((session) => session.id === id);
    if (index !== -1) {
      resolve(sessions.splice(index, 1)[0]);
    } else {
      reject("not found this object");
    }
  });
};

const getSessionById = async (id) => {
  return new Promise((resolve, reject) => {
    var session = sessions.find((session) => session.id === id);
    resolve(session);
  });
};

const getSessionByCode = async (code) => {
  return new Promise((resolve, reject) => {
    var session = sessions.find((session) => session.code === code);
    resolve(session);
  });
};

export {
  addSession,
  editSession,
  removeSession,
  getSessionById,
  getSessionByCode,
};
