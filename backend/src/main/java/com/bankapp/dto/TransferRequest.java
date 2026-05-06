package com.bankapp.dto;

import java.math.BigDecimal;

public record TransferRequest(Long fromAccountId, String toAccountNumber, BigDecimal amount) {
}
