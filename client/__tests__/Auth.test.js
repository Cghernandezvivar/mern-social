// Import dependencies
import React from 'react';
// Import jest-dom for assertions
import '@testing-library/jest-dom';
// Import react-testing utilities
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// Import react-router to test Router
import { MemoryRouter } from 'react-router-dom';
// Import component to test
import Signin from '../auth/Signin'; 
// Import API module to mock
import * as apiAuth from '../auth/api-auth';
// Tell jest to mock the API module
jest.mock('../auth/api-auth');


// All the tests for the Signin
describe('Signin component', () => {

	//Run befor every test tp clear mocks
	beforeEach(() => {
		jest.clearAllMocks();
	});

	// Test 1: Check that signin renders correctly
	test('render Signin form', () => {
		render(
			<MemoryRouter initialEntries={[{ pathname: '/signin', state: {} }]}>
			<Signin location= {{ state: { from: '/' } }} />
			</MemoryRouter>
		);
		// Check the Email is in Doc
		expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
		// Check the Password is in Doc
		expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
		// Check the Submit button is in Doc
		expect(screen.getByText(/Submit/i)).toBeInTheDocument();
	});

	// Test 2: Successful login
	test('successful login redirects', async () => {
		// Mock API response for successful login
		apiAuth.signin.mockResolvedValue({
			token: '123',
			user: { 
				_id: '1', 
				name: 'Test User' 
			}
		});
		// Render the component
		render(
			<MemoryRouter initialEntries={[{pathname: '/signin', state: {} }]}>
			<Signin location= {{ state: { from: '/' } }} />
			</MemoryRouter>
		);		
		// Fill in Email
		fireEvent.change(screen.getByLabelText(/Email/i), {
			target: { 
				value: 'valid@example.com'
			}
		});
		// Fill in Password
		fireEvent.change(screen.getByLabelText(/Password/i), {
			target: {
				value: 'validPassword'
			}
		});
		// Click Submit button
		fireEvent.click(screen.getByText(/Submit/i));

		// Wait for API call and make sure values are correct
		await waitFor(() => {
			expect (apiAuth.signin).toHaveBeenCalledWith({
				email: 'valid@example.com',
				password: 'validPassword'
			});	
		});
	});

	// Test 3: Failed login
	test('failed login shows error', async () => {
		// Mock API response for failed login
		apiAuth.signin.mockResolvedValue({
			error: 'Invalid credentials'
		});
		// Render component
		render(
			<MemoryRouter initialEntries={[{pathname: '/signin', state: {} }]}>
			<Signin location= {{ state: { from:'/' } }} />
			</MemoryRouter>
		);
		// Fill in Wrong Email
		fireEvent.change(screen.getByLabelText(/Email/i), {
			target: {
				value: 'wrong@example.com'
			}
		});
		// Fill in Wrong Password
		fireEvent.change(screen.getByLabelText(/Password/i), {
				target: {
					value: 'wrongPassword'
				}
			});
		// Click Submit button
		fireEvent.click(screen.getByText(/Submit/i));

		// Wait for error message
		const errorMessage = await screen.findByText(/Invalid credentials/i);
		expect(errorMessage).toBeInTheDocument();

		// Wait for API call and make sure values are wrong
		expect(apiAuth.signin).toHaveBeenCalledWith({
			email: 'wrong@example.com',
			password: 'wrongPassword'
		});
	});
});
