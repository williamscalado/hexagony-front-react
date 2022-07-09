import { FormLogin } from ".";
import { fireEvent, render, screen } from "../../../../test-utils";

it("renders without crash", () => {
	render(<FormLogin />);

	expect(screen.getByText("E-mail")).toBeInTheDocument();
	expect(screen.getByText("Password")).toBeInTheDocument();
});

it("shows validation errors", async () => {
	render(<FormLogin />);
	const button = screen.getByRole("button", { name: "Sign In" });

	fireEvent.click(button);

	await screen.findByText(/email is a required field/i);
	await screen.findByText(/password must be at least 8 characters/i);

	expect(screen.getByText(/email is a required field/i)).toBeInTheDocument();
	expect(
		screen.getByText(/password must be at least 8 characters/i)
	).toBeInTheDocument();
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
