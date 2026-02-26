export const create = jest.fn((userData) => {
	if (!userData.name || !userData.email || !userData.password) {
		return Promise.resolve({
			error: "All fields are required"
		});
	}
	if (userData.email === "existing@example.com")
	{
		return Promise.resolve({
			error: "Email already exists"
		});
	}
	if (!userData.email.includes("@"))
	{
		return Promise.resolve({
			error: "Invalid email format"
		});
	}
	if (userData.password.length < 6)
	{
		return Promise.resolve({
			error: "Password must be at leats 6 characters long"
		});
	}
	return Promise.resolve({
		name: userData.name,
		email: userData.email
	});
});
