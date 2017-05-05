package com.events.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.events.logging.Loggable;
import com.events.service.EmailService;

import java.util.Set;

@RestController
@RequestMapping(value = "/services/emails")
public class EmailRestService {

	@Autowired
	private EmailService emailService;
	
	@Loggable
	@RequestMapping(value = "/{id}", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public Set<String> sendEmailTemplate(@PathVariable Long id) {
		return emailService.sendEmail(id);
	}
	
}
