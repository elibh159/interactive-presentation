const slides = [
  {
    id: 1,
    priority: 1,
    sessionId: 1,
    question: "1-What is your favorite color?",
    hasOpen: false,
  },
  {
    id: 2,
    priority: 2,
    sessionId: 1,
    question: "2-What is your favorite car?",
    hasOpen: false,
  },
  {
    id: 3,
    priority: 3,
    sessionId: 1,
    question: "3-What is your favorite food?",
    hasOpen: false,
  },
  {
    id: 4,
    priority: 4,
    sessionId: 1,
    question: "4-What is your favorite sport?",
    hasOpen: false,
  },
];

const addSlide = async ({ sessionId, question, priority, hasOpen = 0 }) => {
  return new Promise((resolve, reject) => {
    const newId =
      slides.reduce((acc, item) => (acc = acc > item.id ? acc : item.id), 0) +
      1;
    const slide = { id: newId, sessionId, question, priority, hasOpen };
    slides.push(slide);
    resolve(slide);
  });
};

const editSlide = async ({ id, question, priority, hasOpen = 0 }) => {
  return new Promise((resolve, reject) => {
    const index = slides.findIndex((slide) => slide.id === id);
    if (index !== -1) {
      slides[index].id = newId;
      slides[index].sessionId = sessionId;
      slides[index].question = question;
      slides[index].priority = priority;
      slides[index].hasOpen = hasOpen;
      resolve(slide);
    } else {
      reject("not found this object");
    }
  });
};

const removeSlide = async ({ id }) => {
  return new Promise((resolve, reject) => {
    const index = slides.findIndex((slide) => slide.id === +id);
    slides = [
      ...slides
        .filter((m) => m.id !== id)
        .sort(function (a, b) {
          return a.priority - b.priority;
          s;
        })
        .map((item, index) => {
          item.priority = index + 1;
          return item;
        }),
    ];

    if (index !== -1) {
      resolve(slides);
    } else {
      reject("not found this object");
    }
  });
};

const getSlide = async (id) => {
  return new Promise((resolve, reject) => {
    const slide = slides.find((slide) => slide.id === id);
    resolve(slide);
  });
};
const getOpenSlide = async (sessionId) => {
  return new Promise((resolve, reject) => {
    const slide = slides.find(
      (slide) => slide.hasOpen && slide.sessionId === sessionId
    );

    resolve(slide);
  });
};

const getSlideByPriority = async (sessionId, priority) => {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < slides.length; i++) {
      const element = slides[i];
      if (element.sessionId === sessionId) {
        if (element.priority === priority) {
          element.hasOpen = true;
        } else element.hasOpen = false;
      }
    }
    const slide = slides.find(
      (slide) => slide.priority === priority && slide.sessionId === sessionId
    );

    resolve(slide);
  });
};

const filterSlideSession = async (sessionId) => {
  return new Promise((resolve, reject) => {
    const slide = slides.filter((slide) => slide.sessionId === sessionId);
    resolve(slide);
  });
};

export {
  addSlide,
  editSlide,
  removeSlide,
  getSlide,
  getOpenSlide,
  getSlideByPriority,
  filterSlideSession,
};
