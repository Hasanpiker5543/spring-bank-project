package com.bankapp.service;

import com.bankapp.model.Client;
import com.bankapp.repository.ClientRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientService {
    private final ClientRepository clientRepository;

    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    public List<Client> findAll() {
        return clientRepository.findAll();
    }

    public Client create(Client client) {
        return clientRepository.save(client);
    }

    public Client update(Long id, Client input) {
        Client client = clientRepository.findById(id).orElseThrow();
        client.setUsername(input.getUsername());
        client.setPhone(input.getPhone());
        return clientRepository.save(client);
    }

    public void delete(Long id) {
        clientRepository.deleteById(id);
    }
}
