# interactive-presentation
The aim of this project is that provide an interactive solution for presentation. Show question/vote in slide, and attendees could send the answer.


## Running The App locally
To run the app, follow these steps.

1. Ensure that NodeJS is installed.
2. Install npm.
3. From the project folder, execute the following commands:

client:
`npm install` 
`yarn start`

server: 
`npm install`
`npm start`

## A React single page application (SPA) built with the following technologies:

- React with TypeScript (`yarn create react-app my-app --template typescript`)
- Redux Toolkit
- Socket.io-client
- Reactstrap
- Node.js
- Express.js
- Socket.io
- Jest

## Application features: 
`Dashboard:`
- in this part, the admin could define a new slide
for easy work, I consider default slides.

`presentation:`
- in this part, presenter share and show vote to attendees.
- Play Button: presentation begins to start, and the first question will appear (everywhere).
- Show Answer: Showing the answer to the current question.
- Next Button: Active Next question.
- Prevue Button: Back to prevue question.
- Stop: Stop Presentation.
- attendeesCount: Number of attendees which joined.
- answerCount: Number of answered for current question.

`Attendee:`
- Step 1: open a new tab(or more) and click on the Attendee page.
- Step 2: when the presenter clicks the play button. The question will be shown here.
- Step 3: attendee will answer the question while the presenter did't press the next button.
- step 4: if the attendee close the page or loses connection, the number of attendee Count should be changed (on the presentation page).
- step 5: if the presenter press the stop button or close their page, here should show this message "Session is paused".


