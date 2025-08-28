package com.sanctuary.service.transaction;

import com.sanctuary.dto.payment.TransactionDto;
import com.sanctuary.dto.payment.TransactionStatsDto;
import com.sanctuary.dto.table.request.Pagination;
import com.sanctuary.dto.table.response.TableResponse;

public interface ITransactionService {

    TransactionStatsDto getTransactionStats();

    TableResponse<TransactionDto> getAllTransactions(Pagination pagination);
}
