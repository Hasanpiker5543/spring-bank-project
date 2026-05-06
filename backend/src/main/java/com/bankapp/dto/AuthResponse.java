package com.bankapp.dto;

import com.bankapp.model.AppUser;

public record AuthResponse(Long id, String username, String role, Long clientId) {
    public static AuthResponse from(AppUser user) {
        Long clientId = user.getClient() == null ? null : user.getClient().getId();
        return new AuthResponse(user.getId(), user.getUsername(), user.getRole(), clientId);
    }
}
