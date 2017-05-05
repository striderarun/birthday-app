package com.events.specification;

import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.events.domain.Event;
import com.events.domain.Event_;
import com.google.common.collect.Lists;



public class EventsSpecification  {

	public EventsSpecification() {
        
	}
	
	public static Specification<Event> specForFindByMonthAndYear(final int month, final int year) {
        return new Specification<Event>() {

            @Override
            public Predicate toPredicate(Root<Event> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
            	List<Predicate> predicates = Lists.newArrayList();
            	predicates.add(builder.equal(root.get(Event_.month), month));
            	predicates.add(builder.equal(root.get(Event_.year), year));
                return builder.and(predicates.toArray(new Predicate[predicates.size()]));            	
            }
        };
    }
	
}
