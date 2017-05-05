package com.events.repository;

import java.util.List;

import com.events.common.EmailStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.events.common.EventType;
import com.events.domain.Event;

public interface EventsRepository extends JpaRepository<Event, Long>, JpaSpecificationExecutor<Event> {

	List<Event> findByTypeAndEmailSent(EventType type, EmailStatus emailStatus);
}
