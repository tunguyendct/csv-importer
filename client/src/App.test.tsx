/* eslint-disable testing-library/no-wait-for-side-effects */
/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import {
  render,
  screen,
  RenderResult,
  waitFor,
  fireEvent,
} from "@testing-library/react";
import App from "./App";
import { MESSAGE } from "./constants/response";

describe("File Upload", () => {
  let appComponent: RenderResult;
  let container: HTMLElement;

  beforeEach(() => {
    appComponent = render(<App />);
    container = appComponent.container;
  });

  it("should render form submit", () => {
    expect(container.querySelector("form[method='post']")).toBeInTheDocument();
  });

  it("should render a file input in form", async () => {
    expect(
      container.querySelector("form[method='post'] input[type='file']")
    ).toBeInTheDocument();
  });

  it("should render a submit button in form", () => {
    expect(
      container.querySelector("form[method='post'] button[type='submit']")
    ).toBeInTheDocument();
  });

  it("should not show preview if no file has been selected", () => {
    expect(screen.queryByTestId("file-name")).not.toBeInTheDocument();
  });

  it("should update file name element when select csv file", async () => {
    expect(screen.queryByTestId("file-name")).not.toBeInTheDocument();

    const fileInput = container.querySelector(
      "form[method='post'] input[type='file']"
    );

    const file = new File(["test file content"], "data.csv", {
      type: "text/csv",
    });

    if (!fileInput) return false;

    await waitFor(() => {
      fireEvent.change(fileInput, {
        target: { files: [file] },
      });
    });
    const fileName = file.name;

    expect(screen.getByTestId("file-name")).toBeInTheDocument();
    expect(screen.getByTestId("file-name").innerHTML).toBe(fileName);
  });

  it("should show type error when select wrong type file", async () => {
    const fileInput = container.querySelector(
      "form[method='post'] input[type='file']"
    );

    const file = new File(["Test file content"], "data.txt", {
      type: "text/plain",
    });

    if (!fileInput) return false;

    await waitFor(() => {
      fireEvent.change(fileInput, {
        target: { files: [file] },
      });
    });

    expect(screen.queryByTestId("file-name")).not.toBeInTheDocument();
    expect(screen.getByText(MESSAGE.WRONG_TYPE)).toBeInTheDocument();
  });

  it("should show type error when select over 1MB file", async () => {
    const fileInput = container.querySelector(
      "form[method='post'] input[type='file']"
    );

    const file = new File([""], "data.csv", {
      type: "text/csv",
    });
    Object.defineProperty(file, "size", { value: 1024 * 1024 + 1 });

    if (!fileInput) return false;

    await waitFor(() => {
      fireEvent.change(fileInput, {
        target: { files: [file] },
      });
    });

    expect(screen.queryByTestId("file-name")).not.toBeInTheDocument();
    expect(screen.getByText(MESSAGE.OVER_SIZE)).toBeInTheDocument();
  });
});
