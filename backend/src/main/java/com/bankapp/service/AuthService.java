package com.bankapp.service;

import com.bankapp.dto.AuthResponse;
import com.bankapp.dto.LoginRequest;
import com.bankapp.dto.RegisterRequest;
import com.bankapp.model.AppUser;
import com.bankapp.model.Client;
import com.bankapp.repository.AppUserRepository;
import com.bankapp.repository.ClientRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {
    private final AppUserRepository appUserRepository;
    private final ClientRepository clientRepository;

    public AuthService(AppUserRepository appUserRepository, ClientRepository clientRepository) {
        this.appUserRepository = appUserRepository;
        this.clientRepository = clientRepository;
    }

    public AuthResponse login(LoginRequest request) {
        AppUser user = appUserRepository.findByUsername(request.username())
                .orElseThrow(() -> new IllegalArgumentException("Invalid username or password."));

        if (!user.getPassword().equals(request.password())) {
            throw new IllegalArgumentException("Invalid username or password.");
        }

        return AuthResponse.from(user);
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (appUserRepository.existsByUsername(request.username())) {
            throw new IllegalArgumentException("Username already exists.");
        }

        Client client = new Client();
        client.setUsername(request.username());
        client.setPhone(request.phone());
        clientRepository.save(client);

        AppUser user = new AppUser();
        user.setUsername(request.username());
        user.setPassword(request.password());
        user.setRole("CLIENT");
        user.setClient(client);
        appUserRepository.save(user);

        return AuthResponse.from(user);
    }
}
