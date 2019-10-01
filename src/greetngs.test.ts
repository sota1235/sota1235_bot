import { sayGoodBye, sayHello } from "./greetings";

test("sayGoodBye", () => {
  expect(sayGoodBye("World")).toBe("GoodBye, World");
});

test("sayHello", () => {
  expect(sayHello("World")).toBe("Hello, World");
});
