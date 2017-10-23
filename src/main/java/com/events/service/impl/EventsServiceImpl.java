package com.events.service.impl;

import com.events.beans.EventBean;
import com.events.config.ConversionConfig;
import com.events.domain.Event;
import com.events.logging.Loggable;
import com.events.repository.EventsRepository;
import com.events.service.EventsService;
import com.events.specification.EventsSpecification;
import org.apache.velocity.app.VelocityEngine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.convert.ConversionService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;


@Service
public class EventsServiceImpl implements EventsService {

    @Resource
    private EventsRepository eventsRepository;

    @Autowired
    private BeanMapper mapper;
    
    @Autowired
    @Qualifier(ConversionConfig.CONVERSION_SERVICE)
    private ConversionService conversionService; 

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private VelocityEngine velocityEngine;

    @Loggable
    @Override
    public Page<EventBean> getEvents(Integer month, Integer year, Pageable pageable) {
        Specification<Event> eventSpec = EventsSpecification.specForFindByMonthAndYear(month, year);
        Page<Event> events= eventsRepository.findAll(eventSpec, pageable);
        List<EventBean> eventBeans = mapper.mapIterable(events, EventBean.class, "fetch");
        return new PageImpl<EventBean>(eventBeans, pageable, events.getTotalElements());
    }

    @Loggable
    @Override
    public EventBean getEvent(Long id) {
        Event event = eventsRepository.findOne(id);
        return mapper.map(event, EventBean.class, "fetch");
    }

    @Loggable
    @Override
    public EventBean createEvent(EventBean eventBean) {
    	Event event = conversionService.convert(eventBean, Event.class);
        event = eventsRepository.save(event);
        return mapper.map(event, EventBean.class, "create");
    }

    @Loggable
    @Override
    public EventBean removeAttendees(EventBean eventBean) {
        Event event = eventsRepository.findOne(eventBean.getId());
        event.getSpotlight().clear();
        event.getInvitees().clear();
        event = eventsRepository.save(event);
        return mapper.map(event, EventBean.class, "create");
    }

    @Loggable
    @Override
    public void deleteEvent(Long id) {
        eventsRepository.delete(id);
    }
    
    @Override
	public void uploadEventImage(Long id, byte[] image) {
		Event event = eventsRepository.findOne(id);
		event.setEventImage(image);
		eventsRepository.save(event);
	}

	@Override
	public byte[] getEventImage(Long id) {
		Event event = eventsRepository.findOne(id);
		return event.getEventImage();
	}

}
