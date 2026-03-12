package com.todo.app.dto;

public class AuthResponse {

    private String token;
    private String username;
    private String email;
    private String message;

    public AuthResponse() {}
    public AuthResponse(String token, String username, String email, String message) {
        this.token = token; this.username = username; this.email = email; this.message = message;
    }
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public static Builder builder() { return new Builder(); }
    public static class Builder {
        private String token, username, email, message;
        public Builder token(String token) { this.token = token; return this; }
        public Builder username(String username) { this.username = username; return this; }
        public Builder email(String email) { this.email = email; return this; }
        public Builder message(String message) { this.message = message; return this; }
        public AuthResponse build() { return new AuthResponse(token, username, email, message); }
    }
}
