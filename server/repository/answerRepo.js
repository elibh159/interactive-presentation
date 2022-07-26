var answers = [];

const upsertAnswerBySlideId = async (slideId, sessionId, value) => {
  return new Promise((resolve, reject) => {
    const answerIndex = answers.findIndex(
      (answer) => answer.slideId === slideId
    );
    if (answerIndex === -1) {
      const newId =
        answers.reduce(
          (acc, item) => (acc = acc > item.id ? acc : item.id),
          0
        ) + 1;
      const answer = { id: newId, slideId, sessionId, value };
      answers.push(answer);
      resolve(answer);
    } else {
      answers[answerIndex].value = value;
      answers[answerIndex].sessionId = sessionId;
      resolve(answers[answerIndex]);
    }
  });
};

const addAnswer = async ( slideId, sessionId, value ) => {
  return new Promise((resolve, reject) => {
    const newId =
      answers.reduce((acc, item) => (acc = acc > item.id ? acc : item.id), 0) +
      1;
    const answer = { id: newId, slideId, sessionId, value };
    answers.push(answer);
    resolve(answer);
  });
};

const editAnswer = async ({ id, slideId, sessionId, value }) => {
  return new Promise((resolve, reject) => {
    const index = answers.findIndex((answer) => answer.id === id);
    if (index !== -1) {
      answers[index] = { id: newId, slideId, sessionId, value };
      resolve(answer);
    } else {
      reject("not found this object");
    }
  });
};

const removeAnswer = async (id) => {
  return new Promise((resolve, reject) => {
    const index = answers.findIndex((answer) => answer.id === id);
    if (index !== -1) {
      resolve(answers.splice(index, 1)[0]);
    } else {
      reject("not found this object");
    }
  });
};

const getAnswer = async (id) => {
  return new Promise((resolve, reject) => {
    const answer = answers.find((answer) => answer.id === id);
    resolve(answer);
  });
};

const getAnswerCount = async (sessionId, slideId) => {
  return new Promise((resolve, reject) => {
    const answerCount = answers.reduce(
      (n, item) => (item.sessionId === sessionId && item.slideId===slideId ? n + 1 : n),
      0
    );
    resolve(answerCount); 
  });
};

const filterAnswerSession = async (slideId) => {
  //Session
  return new Promise((resolve, reject) => {
    const answer = answers.filter((answer) => answer.slideId === slideId);
    resolve(answer);
  });
};

export {
  addAnswer,
  upsertAnswerBySlideId,
  editAnswer,
  removeAnswer,
  getAnswer,
  filterAnswerSession,
  getAnswerCount,
};
