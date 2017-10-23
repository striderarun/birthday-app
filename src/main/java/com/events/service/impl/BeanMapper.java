package com.events.service.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.dozer.Mapper;
import org.dozer.MappingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.google.common.collect.Iterables;

@Component
public class BeanMapper {

	@Autowired
	private Mapper mapper;
	
	public <T> List<T> mapIterable(Iterable<?> sourceCollection, Class<T> destinationClass, String mapperId) {
        List<T> destList;
        if (sourceCollection == null) {
            destList = null;
        } else if (Iterables.isEmpty(sourceCollection)) {
            destList = Collections.emptyList();
        } else {
            destList = new ArrayList<>();
            for (Object sourceObj : sourceCollection) {
                T destObj = mapper.map(sourceObj, destinationClass, mapperId);
                destList.add(destObj);
            }
        }
        return destList;
    }

	public <T> T map(Object source, Class<T> destinationClass, String mapperId) throws MappingException {
        T destinationObj = null;
        if (source != null) {
            destinationObj = mapper.map(source, destinationClass, mapperId);
        }
        return destinationObj;
    }
}
