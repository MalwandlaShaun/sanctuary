package com.sanctuary.controller;

import com.sanctuary.dto.payment.TransactionDto;
import com.sanctuary.dto.payment.TransactionStatsDto;
import com.sanctuary.dto.table.request.Pagination;
import com.sanctuary.dto.table.response.TableResponse;
import com.sanctuary.service.transaction.ITransactionService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/transaction")
@RequiredArgsConstructor
@Tag(name = "Transaction API", description = "Operations related to transactions")
public class TransactionController {

    private final ITransactionService transactionService;

    @GetMapping("admin/stats")
    public TransactionStatsDto getTransactionStats(){
        return transactionService.getTransactionStats();
    }

    @PostMapping("all")
    public ResponseEntity<TableResponse<TransactionDto>> getAllTransactions(@RequestBody Pagination pagination){
        return ResponseEntity.ok(transactionService.getAllTransactions(pagination));
    }
}
