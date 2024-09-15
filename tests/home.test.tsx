import { render, screen } from "@testing-library/react";
import { ReactNode } from "react";
import { vi } from "vitest";
import HomePage from "../app/page";

vi.mock("@clerk/nextjs/server", () => {
  return {
    auth: async () => {
      new Promise((resolve, _) => {
        resolve("asdfghjkl")
      });
    },
    ClerkProvider: ({ children }: { children: ReactNode }) => (
      <div>{children}</div>
    ),
    useUser: () => ({
      isSignedIn: true,
      user: {
        id: "user_2NNEqL2nrIRdJ194ndJqAHwEfxC",
        fullName: "Charles Harris",
      },
    }),
  };
});

vi.mock("next/font/google", () => {
  return {
    Inter: () => ({
      className: "inter",
    }),
  };
});

test("Home", async () => {
  render(await HomePage());
  expect(screen.getByText("getting started")).toBeTruthy();
});
