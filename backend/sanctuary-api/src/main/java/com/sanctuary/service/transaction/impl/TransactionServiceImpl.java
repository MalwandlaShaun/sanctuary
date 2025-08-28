package com.sanctuary.service.transaction.impl;

import com.sanctuary.dto.payment.TransactionDto;
import com.sanctuary.dto.payment.TransactionStatsDto;
import com.sanctuary.dto.table.request.Pagination;
import com.sanctuary.dto.table.response.TableResponse;
import com.sanctuary.model.transaction.Transaction;
import com.sanctuary.repository.TransactionRepository;
import com.sanctuary.service.transaction.ITransactionService;
import com.sanctuary.util.DtoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements ITransactionService {

    private final TransactionRepository transactionRepository;

    private final DtoMapper dtoMapper;


    @Override
    public TransactionStatsDto getTransactionStats() {
        return TransactionStatsDto.builder()
                .totalRevenue(0)
                .failedTransactions(0)
                .pendingPayouts(0)
                .processedPayments(0)
                .build();
    }

    public TableResponse<TransactionDto> getAllTransactions(Pagination pagination) {

        PageRequest request = PageRequest.of(pagination.getPage(), pagination.getPageSize());

        Page<Transaction> transactions = transactionRepository.findAll(request);

        return TableResponse.<TransactionDto>builder()
                .data(dtoMapper.mapList(transactions.getContent(),TransactionDto.class))
                .totalSize(transactions.getSize())
                .build();
    }


}
