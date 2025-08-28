package com.sanctuary.dto.table.response;

import lombok.Builder;
import lombok.Data;
import java.util.List;

@Data
@Builder
public class TableResponse <T> {

    private List<T> data;
    private int totalSize;

}
