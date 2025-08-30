package com.sanctuary.util;

import org.springframework.stereotype.Component;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class DtoMapper {

    private List<Field> getAllFields(Class<?> clazz) {
        List<Field> fields = new ArrayList<>();
        while (clazz != null && clazz != Object.class) {
            fields.addAll(Arrays.asList(clazz.getDeclaredFields()));
            clazz = clazz.getSuperclass();
        }
        return fields;
    }


    public <T, D> D map(T source, Class<D> targetClass) {
        if (source == null) return null;

        try {
            D target = targetClass.getDeclaredConstructor().newInstance();

            List<Field> sourceFields = getAllFields(source.getClass());
            List<Field> targetFields = getAllFields(targetClass);

            for (Field sourceField : sourceFields) {
                for (Field targetField : targetFields) {
                    if (sourceField.getName().equals(targetField.getName())) {
                        sourceField.setAccessible(true);
                        targetField.setAccessible(true);

                        Object value = sourceField.get(source);

                        if (sourceField.getType().equals(targetField.getType())) {
                            targetField.set(target, value);
                        } else if (targetField.getType().equals(String.class)) {
                            targetField.set(target, value != null ? value.toString() : null);
                        }

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
        return sourceList.parallelStream()
                .map(source -> map(source, targetClass))
                .collect(Collectors.toList());
    }
}