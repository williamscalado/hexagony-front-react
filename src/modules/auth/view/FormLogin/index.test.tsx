import { FormLogin } from ".";
import { fireEvent, render, screen } from "../../../../test-utils";

it("renders without crash", () => {
	render(<FormLogin />);

	expect(screen.getByText("E-mail")).toBeInTheDocument();
	expect(screen.getByText("Password")).toBeInTheDocument();
});

it("should change e-mail and password input values", () => {
	render(<FormLogin />);

	const emailInput = screen.getByTestId("email");
	fireEvent.change(emailInput, { target: { value: "john@doe.com" } });
	expect(emailInput).toHaveValue("john@doe.com");

	const passwordInput = screen.getByTestId("password");
	fireEvent.change(passwordInput, { target: { value: "12345678" } });
	expect(passwordInput).toHaveValue("12345678");
});
