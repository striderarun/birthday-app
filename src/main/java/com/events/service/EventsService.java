package com.events.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.events.beans.EventBean;

public interface EventsService {

	Page<EventBean> getEvents(Integer month, Integer year, Pageable pageable);

	EventBean getEvent(Long id);
	
	EventBean createEvent(EventBean eventBean);

	EventBean removeAttendees(EventBean eventBean);

	void deleteEvent(Long id);
	
	void uploadEventImage(Long id, byte[] image);
	
	byte[] getEventImage(Long id);
}
