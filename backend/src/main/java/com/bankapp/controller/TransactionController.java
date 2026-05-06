package com.bankapp.controller;

import com.bankapp.model.Transaction;
import com.bankapp.repository.TransactionRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {
    private final TransactionRepository transactionRepository;

    public TransactionController(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    @GetMapping
    public List<Transaction> findAll() {
        return transactionRepository.findAll();
    }

    @GetMapping("/recent")
    public List<Transaction> recent() {
        return transactionRepository.findTop8ByOrderByDateDesc();
    }

    @GetMapping("/account/{accountId}")
    public List<Transaction> byAccount(@PathVariable Long accountId) {
        return transactionRepository.findByAccountIdOrderByDateDesc(accountId);
    }
}
