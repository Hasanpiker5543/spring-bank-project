package com.bankapp.service;

import com.bankapp.dto.TransferRequest;
import com.bankapp.model.Account;
import com.bankapp.model.Transaction;
import com.bankapp.model.TransactionType;
import com.bankapp.repository.AccountRepository;
import com.bankapp.repository.TransactionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
public class TransferService {
    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;

    public TransferService(AccountRepository accountRepository, TransactionRepository transactionRepository) {
        this.accountRepository = accountRepository;
        this.transactionRepository = transactionRepository;
    }

    @Transactional
    public void transfer(TransferRequest request) {
        Account fromAccount = accountRepository.findById(request.fromAccountId()).orElseThrow();
        String destination = request.toAccountNumber().trim();
        Account toAccount = accountRepository.findByAccountNumber(destination)
                .or(() -> accountRepository.findFirstByClientPhone(destination))
                .or(() -> accountRepository.findFirstByClientUsernameIgnoreCase(destination))
                .orElseThrow();
        BigDecimal amount = request.amount();

        if (fromAccount.getId().equals(toAccount.getId())) {
            throw new IllegalArgumentException("Source and destination accounts must be different.");
        }

        if (amount == null || amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Amount must be positive.");
        }

        if (fromAccount.getBalance().compareTo(amount) < 0) {
            throw new IllegalArgumentException("Insufficient balance.");
        }

        fromAccount.setBalance(fromAccount.getBalance().subtract(amount));
        toAccount.setBalance(toAccount.getBalance().add(amount));
        accountRepository.save(fromAccount);
        accountRepository.save(toAccount);

        Transaction debit = new Transaction();
        debit.setAccount(fromAccount);
        debit.setType(TransactionType.DEBIT);
        debit.setAmount(amount);
        transactionRepository.save(debit);

        Transaction credit = new Transaction();
        credit.setAccount(toAccount);
        credit.setType(TransactionType.CREDIT);
        credit.setAmount(amount);
        transactionRepository.save(credit);
    }
}
