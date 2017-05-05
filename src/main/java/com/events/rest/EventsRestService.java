package com.events.rest;

import java.io.IOException;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.events.beans.EventBean;
import com.events.common.EventConstants;
import com.events.logging.Loggable;
import com.events.service.EventsService;

@RestController
@RequestMapping(value = "/services/events")
public class EventsRestService {

	@Autowired
	private EventsService eventsService;
	
	@Loggable
	@RequestMapping(method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public Page<EventBean> getEvents(@PageableDefault(
			page = EventConstants.PAGE_NUMBER_DEFAULT,
            size = EventConstants.PAGE_SIZE_DEFAULT,
            sort = { EventConstants.PAGE_SORT_DEFAULT },
            direction = Direction.ASC) Pageable pageable, @RequestParam Integer month, @RequestParam Integer year) {
		return eventsService.getEvents(month, year, pageable);
	}

	@Loggable
	@RequestMapping(value= "/{id}", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public EventBean getEvent(@PathVariable Long id) {
		return eventsService.getEvent(id);
	}

	@Loggable
	@RequestMapping(method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.CREATED)
	public EventBean createEvent(@RequestBody @NotNull @Valid EventBean eventBean) {
		return eventsService.createEvent(eventBean);
	}

	@Loggable
	@RequestMapping(method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.OK)
	public EventBean updateEvent(@RequestBody @NotNull @Valid EventBean eventBean) {
		eventsService.removeAttendees(eventBean);
		return eventsService.createEvent(eventBean);
	}
	
	@Loggable
	@RequestMapping(method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.OK)
	public void deleteEvent(@RequestParam Long id) {
		eventsService.deleteEvent(id);
	}
	
	@Loggable
	@RequestMapping(value = "/{id}/image", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public void uploadProfileImage(@PathVariable Long id, @RequestParam("image") MultipartFile image) throws IOException {
		eventsService.uploadEventImage(id, image.getBytes());
	}
	
	@Loggable
	@RequestMapping(value = "/{id}/image", method = RequestMethod.GET, produces = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE})
	@ResponseStatus(HttpStatus.OK)
	public byte[] getProfileImage(@PathVariable Long id) {
		return eventsService.getEventImage(id);
	}
	
}
