import { render, screen } from "@testing-library/react";
import FileSharing from "../components/FileSharing";

describe("test", () => {
  it("should render all input fields correctly", () => {
    render(<FileSharing />);

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
    expect(screen.getAllByRole("input")).toHaveLength(2);
    expect(screen.getAllByPlaceholderText("expiration")).toBeInTheDocument();
  });
});
