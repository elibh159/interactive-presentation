import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import http from "http";

import {
  addUser,
  getUser,
  removeUser,
  getUserAttendeeCount,
  getUserPresenterCount,
} from "./repository/userRepo.js";
import {
  addAnswer,
  filterAnswerSession,
  getAnswerCount,
} from "./repository/answerRepo.js";
import { getSlideByPriority, getOpenSlide } from "./repository/slideRepo.js";
import { getSessionByCode } from "./repository/sessionRepo.js";
import router from "./routes/index.js";
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));
const service = http.createServer(app);
const io = new Server(service, { cors: { origin: "*" } });

app.get("/", (req, res) => {
  res.send("Server started :)");
});
app.use("/api", router);

function getSessionId(socket) {
  const rooms = [...socket.rooms];
  const items = rooms.filter((m) => m.indexOf("session") !== -1);
  if (items.length > 0) {
    return +items[0].replace("session_", "");
  }
  return undefined;
}

io.on("connection", (socket) => {
  socket.on("start", async ({ loginCode }) => {
    try {
      const { id: sessionId, title } = await getSessionByCode(loginCode);

      socket.join([`session_${sessionId}`, `presenter_${sessionId}`]);

      const attendeesCount = io.sockets.adapter.rooms.get(
        `attendee_${sessionId}`
      ).size;

      io.to(`presenter_${sessionId}`).emit("attendeesCount", attendeesCount);

      io.to(`attendee_${sessionId}`).emit("sessionStatus", true);

      await addUser(socket.id, "presenter", sessionId);
    } catch (error) {
      console.error("start ", error);
    }
  });

  socket.on("join", async ({ loginCode }) => {
    try {
      const { id: sessionId, title } = await getSessionByCode(loginCode);
      socket.join([`session_${sessionId}`, `attendee_${sessionId}`]);

      const attendeesCount = io.sockets.adapter.rooms.get(
        `attendee_${sessionId}`
      ).size;

      io.to(`presenter_${sessionId}`).emit("attendeesCount", attendeesCount);

      const slide = await getOpenSlide(sessionId);

      if (slide) socket.emit("loadSlide", slide);

      await addUser(socket.id, "attendee", sessionId);
    } catch (error) {
      console.error("join ", error);
    }
  });

  socket.on("getSlide", async ({ priority }) => {
    try {
      const sessionId = getSessionId(socket);
      const slide = await getSlideByPriority(sessionId, priority);
      if (slide) {
        io.to(`session_${sessionId}`).emit("loadSlide", slide);
        const answerCount = await getAnswerCount(sessionId, slide.id);
        io.to(`presenter_${sessionId}`).emit("answerCount", answerCount);
      }
    } catch (error) {
      console.error("getSlide ", error);
    }
  });

  socket.on("setAnswer", async ({ slideId, answer }) => {
    try {
      const sessionId = getSessionId(socket);
      await addAnswer(slideId, sessionId, answer);
      const answerCount = await getAnswerCount(sessionId, slideId);
      io.to(`presenter_${sessionId}`).emit("answerCount", answerCount);
    } catch (error) {
      console.error("setAnswer ", error);
    }
  });

  socket.on("getAnswers", async ({ slideId }) => {
    try {
      const sessionId = getSessionId(socket);
      const answers = await filterAnswerSession(slideId);
      io.to([`presenter_${sessionId}`]).emit("loadAnswer", answers);
    } catch (error) {
      console.error("getAnswers ", error);
    }
  });

  socket.on("setSessionStatus", async (status) => {
    try {
      const sessionId = getSessionId(socket);
      io.to(`session_${sessionId}`).emit("sessionStatus", status);
    } catch (error) {
      console.error("setSessionStatus ", error);
    }
  });

  socket.on("disconnect", async (reason) => {
    try {
      const user = await getUser(socket.id);
      const sessionId = user.sessionId;
      await removeUser(socket.id);

      const attendeesCount = await getUserAttendeeCount(sessionId);
      const presenterCount = await getUserPresenterCount(sessionId);

      io.to(`presenter_${sessionId}`).emit("attendeesCount", attendeesCount);

      if (presenterCount === 0)
        io.to(`session_${sessionId}`).emit("sessionStatus", false);
    } catch (error) {
      console.error("disconnect", reason);
    }
  });
});

service.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
