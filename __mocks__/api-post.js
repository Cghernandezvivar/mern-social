export const createPost = jest.fn((postData) => {
	return Promise.resolve({
		success: true
	});
});
