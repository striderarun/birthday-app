package com.events.converters;

import java.util.HashSet;
import java.util.Set;

import javax.annotation.Resource;

import com.events.common.EmailStatus;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import com.events.beans.EventBean;
import com.events.domain.Event;
import com.events.domain.EventInvitees;
import com.events.domain.EventSpotlight;
import com.events.domain.User;
import com.events.repository.GroupRepository;
import com.events.service.impl.BeanMapper;

/**
 * Converter class for converting EventBean to Event
 */
@Component
public class EventBeanToEventConverter implements Converter<EventBean, Event> {

    @Autowired
    private BeanMapper mapper;
    
    @Resource 
    private GroupRepository groupRepository;

    @Override
    public Event convert(EventBean eventBean) {
    	Event event = mapper.map(eventBean, Event.class, "create");
    	event.setMonth(eventBean.getEventDate().getMonthOfYear());
        event.setYear(eventBean.getEventDate().getYear());
        if (CollectionUtils.isNotEmpty(eventBean.getInvitees())) {
        	for(Long invitee: eventBean.getInvitees()) {
        		EventInvitees eventInvitee = new EventInvitees();
        		eventInvitee.setEvent(event);
        		
        		User user = new User();
        		user.setId(invitee);
        		
        		eventInvitee.setUser(user);
				event.getInvitees().add(eventInvitee);
			}
        }
        
        if (CollectionUtils.isNotEmpty(eventBean.getSpotlight())) {
        	for(Long spotlight: eventBean.getSpotlight()) {
        		EventSpotlight eventSpotlight = new EventSpotlight();
        		eventSpotlight.setEvent(event);
        		
        		User user = new User();
        		user.setId(spotlight);
        		
        		eventSpotlight.setUser(user);
				event.getSpotlight().add(eventSpotlight);
        	}
        }
		if (null == event.getEmailSent()) {
			event.setEmailSent(EmailStatus.NOT_SENT);
		}
        return event;
    }

    
}
