const Client = require("socket.io-client");

describe("test socket server", () => {
  let clientSocket;
  const PORT = process.env.PORT || 5000;

  beforeAll((done) => {
    clientSocket = new Client(`http://localhost:${PORT}`);
    clientSocket.on("connect", done);
  });

  afterAll(() => {
    clientSocket.close();
  });
  afterEach(() => {
    clientSocket.off("attendeesCount");
    clientSocket.off("loadSlide");
    clientSocket.off("sessionStatus");
  });

  test("should after start a presentation attendees count be 0", (done) => {
    clientSocket.off("attendeesCount");
    
    clientSocket.on("attendeesCount", (arg) => {
      clientSocket.off("attendeesCount");
      expect(arg).toBe(0);
      done();
    });
    clientSocket.emit("start", { loginCode: "Free2022" });
  });

  test("should upon join load Slide for attendee", (done) => {
    clientSocket.off("loadSlide");
    clientSocket.off("attendeesCount");

    clientSocket.on("loadSlide", (arg) => {
      clientSocket.off("loadSlide");
      expect(arg.question).toBe("1-What is your favorite color?");
      done();
    });
    clientSocket.on("attendeesCount", (arg) => {
      clientSocket.off("attendeesCount");
      expect(arg).toBe(1);
      done();
    });
    clientSocket.emit("join", { loginCode: "Free2022" });
  });

  test("should loadSlide with priority 2", (done) => {
    clientSocket.off("loadSlide");

    clientSocket.on("loadSlide", (arg) => {
      clientSocket.off("loadSlide");
      expect(arg.question).toBe("2-What is your favorite car?");
      done();
    });
    clientSocket.emit("getSlide", {  priority: 2 });
  });
});