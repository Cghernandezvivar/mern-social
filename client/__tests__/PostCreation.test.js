// Import dependencies
import React from 'react';
// Import jest-dom for assertions
import '@testing-library/jest-dom';
// Import react-testing utilities
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// Import react-router to test Router
import { MemoryRouter } from 'react-router-dom';
// Import components
import { remove, like, unlike } from '../post/api-post.js'
// Import component to test
import Post from '../post/Post';
// Import API module to mock
import * as apiPost from '../post/api-post';
// Tell jest to mock the API module
jest.mock('../post/api-post');

// Tell jest to mock the auth-helper
jest.mock('../auth/auth-helper', () => ({
	__esModule: true,
	default: {
		isAuthenticated: jest.fn(() => ({
			user: {
				_id: '12345',
				name: 'Test User'
			},
			token: 'fake-jwt-token'
		}))
	}
}));

// All the tests for Post
describe('Post component', () => {

	// Place holder data used in all tests
	const mockPost = {
		_id: 'post123',
		text: 'Test Content',
		likes: [],
		comments: [],
		postedBy: {
			// This id has to be the same as the current user
			_id: '12345',
			name: 'Test User'
		},
		created: new Date()
	};
	// Verify parent callback is triggered
	const mockOnRemove = jest.fn();

	// Run before every test to clear mock
	beforeEach(() => {
		jest.clearAllMocks();
	});

	// Test case 1: Check that post creation renders correctly
	test('render post creation form', () => {
		// Render the component
		render(
			<MemoryRouter>
			<Post post={mockPost} onRemove={mockOnRemove} />
			</MemoryRouter>
		);
		// Verify that Text appears
		expect(screen.getByText('Test Content')).toBeInTheDocument();
		// Verify that Img appears
		expect(screen.getAllByRole('img')[0]).toHaveAttribute('src', '/api/users/photo/12345');
		// Verify that Username appears
		expect(screen.getByText('Test User')).toBeInTheDocument();
		// Verify that Like/Unlike appears
		expect(screen.getByLabelText(/Like|Unlike/)).toBeInTheDocument();
		// Verify that Comment button appears
		expect(screen.getByLabelText('Comment')).toBeInTheDocument();
	});

	// Test case 2: Check that like API is called.
	test('like API is called when button is clicked', async () => {
		// Mock API response for likes
		apiPost.like.mockResolvedValue({
			likes: ['12345']
		});
		// Render the component
		render(
			<MemoryRouter>
			<Post post={mockPost} onRemove={mockOnRemove} />
			</MemoryRouter>
		);
		// Find the Like button
		const  likeButton = screen.getByLabelText(/Like|Unlike/);
		// Click Like button
		fireEvent.click(likeButton);
		// Wait for like API call to be called
		await waitFor(() => {
			expect(apiPost.like).toHaveBeenCalled();
		});
	});

	// Test case 3: Check that the remove API is called
	test('remove API is called when delete button is called', async () => {
		// Mock API response for remove
		apiPost.remove.mockResolvedValue({});
		// Render the component
		render(
			<MemoryRouter>
			<Post post={mockPost} onRemove={mockOnRemove} />
			</MemoryRouter>
		);
		// Delete button appears
		const deleteButton = screen.getAllByRole('button')[0];
		// Click delete button
		fireEvent.click(deleteButton);
		// Wait for remove API to be called
		await waitFor(() => {
			expect(apiPost.remove).toHaveBeenCalled();
		});
		// Wait for callback to be completed
		await waitFor(() => {
			expect(mockOnRemove).toHaveBeenCalledWith(mockPost);
		});
	});

	// Test case 4: Check that current user is the one deleting
	test('delete button does not render if not the user', async () => {
		// Reset the Modules to allow new mock here only
		jest.resetModules();
		// Do this specific Mock to uses another User
		jest.doMock('../auth/auth-helper', () => ({
			_esModule: true,
			default: {
				isAuthenticated: jest.fn(() => ({
					user: {
						// Make sure this id is not the same as the current user
						_id: '11111',
						name: 'Dif User'
					},
					token: 'fake-jwt-token'
				}))
			}
		}));
		// Import component after new mock
		const PostComponent = require('../post/Post').default;
		// Render the component
		render(
			<MemoryRouter>
			<Post post={mockPost} onRemove={mockOnRemove} />
			</MemoryRouter>
		);
		// All buttons
		const buttons = screen.getAllByRole('button');
		// Verify there is no delete button
		buttons.forEach(button => {
			expect(button).not.toHaveAttribute('aria-label', 'Delete');
		});
	});
});
