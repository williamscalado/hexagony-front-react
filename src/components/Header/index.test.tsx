import { Header } from ".";
import { render, screen } from "../../test-utils";

it("renders without crash", () => {
	render(<Header />);
	expect(screen.getAllByDisplayValue("menuMock").length > 1);
});
