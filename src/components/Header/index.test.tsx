import { render, screen } from "../../test-utils";
import { Header } from ".";

it("renders without crash", () => {
	render(<Header />);
	expect(screen.getByText("Albums")).toBeInTheDocument();
});