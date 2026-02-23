export const signin = jest.fn((credentials) => {
	if (credentials.email === "valid@example.com" && credentials.password === "validPassword") 
	{
		return Promise.resolve(
			{ 
				token: "fake-jwt-token", 
				user: 
				{ 
					email: "valid@example.com" 
				} 
			} 
		);
	}
	else 
	{
		return Promise.resolve({ error: "Invalid credentials" });
	}
});

export const signup = jest.fn((userData) => {
	if (userData.email === "existing@example.com")
	{
		return Promise.resolve({ error: "User already exists" });
	}
	else 
	{
		return Promise.resolve({ email: userData.email });
	}
});

export const signout = jest.fn(() => Promise.resolve());
