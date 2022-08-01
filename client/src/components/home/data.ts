export const data = [
  {
    id: 1,
    header: "Dashboard",
    title: "Slide Manager",
    link: "/dashboard",
    content: [
      {
        id: 1,
        text: `in this part, the admin could define a new slide
            for easy work, I consider default slides.`,
      },
    ],
  },
  {
    id: 2,
    header: "Presentation",
    title: "Play Presentation",
    link: "/presentation/",
    content: [
      {
        id: 1,
        text: "in this part, presenter share and show vote to attendees",
      },
      {
        id: 2,
        text: "Play Button: presentation begins to start, and the first question will appear (everywhere).",
      },
      {
        id: 3,
        text: "Showing the answer to the current question.",
      },
      {
        id: 4,
        text: "Next Button: Active Next question",
      },
      {
        id: 5,
        text: "Prevue Button: Back to prevue question",
      },
      {
        id: 6,
        text: "Stop: Stop Presentation",
      },
      {
        id: 7,
        text: "attendeesCount: Number of attendees which joined",
      },
      {
        id: 8,
        text: "answerCount: Number of answered for current question",
      },
    ],
  },
  {
    id: 3,
    header: "Attendee",
    title: "SendSteps.me",
    link: "/presentation/",
    content: [
      {
        id: 1,
        text: "Step 1: open a new tab(or more) and click on the Attendee page.",
      },
      {
        id: 2,
        text: "Step 2: when the presenter clicks the play button. The question will be shown here.",
      },
      {
        id: 3,
        text: "Step 3: attendee will answer the question while the presenter did't press the next button.",
      },
      {
        id: 4,
        text: "step 4: if the attendee close the page or loses connection, the number of attendee Count should be changed (on the presentation page)",
      },
      {
        id: 5,
        text: `step 5: if the presenter press the stop button or close their page, here should show this message "Session is paused"`,
      },
    ],
  },
];
