package com.bankapp.service;

import com.bankapp.model.Account;
import com.bankapp.repository.AccountRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountService {
    private final AccountRepository accountRepository;

    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public List<Account> findAll() {
        return accountRepository.findAll();
    }

    public Account create(Account account) {
        return accountRepository.save(account);
    }

    public Account update(Long id, Account input) {
        Account account = accountRepository.findById(id).orElseThrow();
        account.setAccountNumber(input.getAccountNumber());
        account.setBalance(input.getBalance());
        account.setClient(input.getClient());
        return accountRepository.save(account);
    }

    public void delete(Long id) {
        accountRepository.deleteById(id);
    }
}
