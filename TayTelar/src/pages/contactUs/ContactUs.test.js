import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContactUs from './ContactUs';

// Test rendering
test('renders ContactUs component', () => {
    render(<ContactUs />);
    
    expect(screen.getByText(/Contact Details/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Full Name\*/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email\*/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Subject\*/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Message\*/i)).toBeInTheDocument();
});

// Test form input changes and validation
test('validates and shows error messages for invalid inputs', async () => {
    render(<ContactUs />);
    
    // Submit without filling out the form
    fireEvent.click(screen.getByText(/Submit Now/i));
    
    // Check for validation error messages
    expect(await screen.findByText(/Full name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Subject is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Message is required/i)).toBeInTheDocument();
    
    // Fill out the form with invalid data
    fireEvent.change(screen.getByPlaceholderText(/Full Name\*/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/Email\*/i), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByPlaceholderText(/Subject\*/i), { target: { value: 'Test Subject' } });
    fireEvent.change(screen.getByPlaceholderText(/Message\*/i), { target: { value: 'Test Message' } });
    
    // Submit the form again
    fireEvent.click(screen.getByText(/Submit Now/i));
    
    // Check for specific validation error
    expect(await screen.findByText(/Invalid email address/i)).toBeInTheDocument();
});

// Test form submission with valid inputs
test('submits form with valid inputs', () => {
    const consoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});
    render(<ContactUs />);
    
    // Fill out the form with valid data
    fireEvent.change(screen.getByPlaceholderText(/Full Name\*/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/Email\*/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Subject\*/i), { target: { value: 'Test Subject' } });
    fireEvent.change(screen.getByPlaceholderText(/Message\*/i), { target: { value: 'Test Message' } });
    
    // Submit the form
    fireEvent.click(screen.getByText(/Submit Now/i));
    
    // Check console log for form submission
    expect(consoleLog).toHaveBeenCalledWith({
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        subject: 'Test Subject',
        message: 'Test Message',
    });
    
    consoleLog.mockRestore();
});
