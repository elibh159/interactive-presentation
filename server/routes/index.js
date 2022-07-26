import express from "express";
import {
  addSlide,
  editSlide,
  removeSlide,
  filterSlideSession,
} from "../repository/slideRepo.js";

import { getSessionByCode } from "../repository/sessionRepo.js";

const router = express.Router();

//http://localhost:5000/api/slides/Free2022
router.get("/slides/:loginCode", async (req, res) => {
  const loginCode = req.params.loginCode;
  const { id: sessionId } = await getSessionByCode(loginCode);
  const slides = await filterSlideSession(sessionId);
  res.send({ slides });
});

router.post("/slides/:loginCode", async (req, res) => {
  try {
    const loginCode = req.params.loginCode;
    const { id: sessionId } = await getSessionByCode(loginCode);

    const { question, priority } = req.body;

    const data = await addSlide({
      sessionId,
      question,
      priority,
    });

    return res.status(200).json({
      success: true,
      message: "Slide created",
      data: data,
    });
  } catch (error) {
    res.status(500);
    res.json(error);
  }
});

router.put("/slides/:slideId", async (req, res) => {
  try {
    const id = req.body.id;
    const { question, priority } = req.body;

    await editSlide({
      id,
      question,
      priority,
    });

    return res.status(200).json({
      success: true,
      message: "Slide updated",
    });
  } catch (error) {
    res.status(500);
    res.json(error);
  }
});

router.delete("/slides/:slideId", async (req, res) => {
  try {
    const id = req.params.slideId;

    await removeSlide({
      id,
    });

    return res.status(200).json({
      success: true,
      message: "Slide updated",
    });
  } catch (error) {
    res.status(500);
    res.json(error);
  }
});

export default router;
