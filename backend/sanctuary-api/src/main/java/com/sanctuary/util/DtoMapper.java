package com.sanctuary.util;

import org.springframework.stereotype.Component;

import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class DtoMapper {

    public <T, D> D map(T source, Class<D> targetClass) {
        if (source == null) return null;
        
        try {
            D target = targetClass.getDeclaredConstructor().newInstance();
            
            Field[] sourceFields = source.getClass().getDeclaredFields();
            Field[] targetFields = targetClass.getDeclaredFields();
            
            for (Field sourceField : sourceFields) {
                for (Field targetField : targetFields) {
                    if (sourceField.getName().equals(targetField.getName()) && 
                        sourceField.getType().equals(targetField.getType())) {
                        
                        sourceField.setAccessible(true);
                        targetField.setAccessible(true);
                        
                        Object value = sourceField.get(source);
                        targetField.set(target, value);
                        break;
                    }
                }
            }
            
            return target;
        } catch (Exception e) {
            throw new RuntimeException("Failed to map " + source.getClass().getSimpleName() + 
                                     " to " + targetClass.getSimpleName(), e);
        }
    }
    
    public <T, D> List<D> mapList(List<T> sourceList, Class<D> targetClass) {
        return sourceList.stream()
                .map(source -> map(source, targetClass))
                .collect(Collectors.toList());
    }
}