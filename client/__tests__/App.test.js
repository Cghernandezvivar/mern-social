import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import App from "../App";

test("App renders without crashing", () => {
	render(<App />);
	expect(screen.getByText("Welcome to the MERN Social home page.")).toBeInTheDocument();
});
