import { Slide } from "../Interfaces/slideInterface";

export const defaultSlides: Slide[] = [
  {
    id: "1",
    hasOpen: true,
    sessionId: "123",
    question: "What is your favorite color?",
    priority: 1,
    options: [],
  },
  {
    id: "2",
    hasOpen: false,
    sessionId: "123",
    question: "What is your favorite food?",
    priority: 2,
    options: [],
  },
  {
    id: "3",
    hasOpen: false,
    sessionId: "123",
    question: "What is your favorite sport?",
    priority: 3,
    options: [],
  },
  {
    id: "4",
    hasOpen: false,
    sessionId: "123",
    question: "What is your favorite car?",
    priority: 4,
    options: [],
  },
];

export const LOGIN_CODE: string ="Free2022";
