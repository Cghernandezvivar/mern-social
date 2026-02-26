// Import dependencies
import React from 'react';
// Import jest-dom for assertions
import '@testing-library/jest-dom';
// Import react-testing utilities
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// Import react-router to test Router
import { MemoryRouter } from 'react-router-dom';
// Import component to test
import Signup from '../user/Signup';
// Import API module to mock
import * as apiUser from '../user/api-user';
// Tell jest to mock the API module
jest.mock('../user/api-user');

// All the tests for the Signup
describe('Signup Edge Cases', () => {

	// Run before every test to clear mocks
	beforeEach(() => {
		jest.clearAllMocks();
	});

	// Test case 1: checks that there is no duplicate emails
	test('duplicate email shows error', async () => {

		// Mock API response for existing email
		apiUser.create.mockResolvedValue({
			error: "Email already exists"
		});
		// Render the component
		render( 
			<MemoryRouter>
			<Signup />
			</MemoryRouter>
		);
		// Fill in Name
		fireEvent.change(screen.getByLabelText(/Name/i), {
			target: {
				value: 'Test User'
			}
		});
		// Fill in Email
		fireEvent.change(screen.getByLabelText(/Email/i), {
			target: {
				value: 'existing@example.com'
			}
		});
		// Fill in Password
		fireEvent.change(screen.getByLabelText(/Password/i), {
			target: {
				value: 'password123'
			}
		});
		// Click Submit button
		fireEvent.click(screen.getByText(/Submit/i));

		// Wait for error message
		const errorMessage = await screen.findByText(/Email already exists/i);
		expect(errorMessage).toBeInTheDocument();
		// Wait for API call and make sure values are correct
		expect(apiUser.create).toHaveBeenCalledWith({
			name: 'Test User',
			email: 'existing@example.com',
			password: 'password123'
		});
	});

	// Test case 2: Checks correct email format is used
	test('invalid email format shows error', async () => {

		// Mock API response for invalid email
		apiUser.create.mockResolvedValue({
			error: "Invalid email format"
		});
		// Render component
		render( 
			<MemoryRouter>
			<Signup />
			</MemoryRouter>
		);
		// Fill in Name
		fireEvent.change(screen.getByLabelText(/Name/i), {
			target: {
				value: 'Test User'
			}
		});
		// Fill in Email
		fireEvent.change(screen.getByLabelText(/Email/i), {
			target: {
				value: 'invalidemail'
			}
		});
		// Fill in Password
		fireEvent.change(screen.getByLabelText(/Password/i), {
			target: {
				value: 'password123'
			}
		});
		// Click Submit button
		fireEvent.click(screen.getByText(/Submit/i));
		// Wait for error message
		const errorMessage = await screen.findByText(/Invalid email format/i);
		expect(errorMessage).toBeInTheDocument();
		// Wait for API call and make sure values are correct
		expect(apiUser.create).toHaveBeenCalledWith({
			name: 'Test User',
			email: 'invalidemail',
			password: 'password123'
		});
	});

	// Test case 3: Checks for successful signup 
	test('successful signup opens dialog', async () => {

		// Mock API response for successful signup
		apiUser.create.mockResolvedValue({
			name: "Test User",
			email: "new@example.com"
		});
		// Render the component
		render( 
			<MemoryRouter>
			<Signup />
			</MemoryRouter>
		);
		// Fill in Name
		fireEvent.change(screen.getByLabelText(/Name/i), {
			target: {
				value: 'Test User'
			}
		});
		// Fill in Email
		fireEvent.change(screen.getByLabelText(/Email/i), {
			target: {
				value: 'new@example.com'
			}
		});
		// Fill in Password
		fireEvent.change(screen.getByLabelText(/Password/i), {
			target: {
				value: 'password123'
			}
		});
		// Click Submit button
		fireEvent.click(screen.getByText(/Submit/i));
		// Wait for error message
		const errorMessage = await screen.findByText(/New account successfully created/i);
		expect(errorMessage).toBeInTheDocument();
		// Wait for API call and make sure values are correct
		expect(apiUser.create).toHaveBeenCalledWith({
			name: 'Test User',
			email: 'new@example.com',
			password: 'password123'
		});
	});

	// Test case 4: Checks missing fields show error
	test('missing fields shows error', async () => {
		// Mock API response for missing fields
		apiUser.create.mockResolvedValue({
			error: "All fields are required"
		});
		// Render the component
		render(
			<MemoryRouter>
			<Signup />
			</MemoryRouter>
		);
		// Click Submit button
		fireEvent.click(screen.getByText(/Submit/i));
		// Wait for error message
		const errorMessage = await screen.findByText(/All fields are required/i);
		expect(errorMessage).toBeInTheDocument();
		// Wait for API call and make sure values are correct
		expect(apiUser.create).toHaveBeenCalledWith({
			name: undefined,
			email: undefined,
			password: undefined
		});
	});

	// Test case 5: Checks if password is short
	test('short password shows error', async () => {
		// Mock API response for short password
		apiUser.create.mockResolvedValue({
			error: "Password must be at least 6 characters"
		});
		// Render the component
		render(
			<MemoryRouter>
			<Signup />
			</MemoryRouter>
		);
		// Fill in Name
		fireEvent.change(screen.getByLabelText(/Name/i), {
			target: { 
				value: 'Test User'
			}
		});
		// Fill in Email
		fireEvent.change(screen.getByLabelText(/Email/i), {
			target: { 
				value: 'user@example.com'
			}
		});
		// Fill in Password
		fireEvent.change(screen.getByLabelText(/Password/i), {
			target: {
				value: '123'
			}
		});
		// Click Submit button
		fireEvent.click(screen.getByText(/Submit/i));
		// Wait for error message
		const errorMessage = await screen.findByText(/Password must be at least 6 characters/i);
		expect(errorMessage).toBeInTheDocument();
		// Wait for API call and make sure values are correct
		expect(apiUser.create).toHaveBeenCalledWith({
			name: 'Test User',
			email: 'user@example.com',
			password: '123'
		});
	});
});
