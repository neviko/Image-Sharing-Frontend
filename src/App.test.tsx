import React from "react";
import { render, screen } from "@testing-library/react";
// import App from "./App";
import FileSharing from "./components/FileSharing";

test("renders learn react link", () => {
  render(<FileSharing />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
