package com.events.service;

import java.util.Set;

public interface EmailService {

	Set<String> sendEmail(Long id);
	
	void scheduledEmail();
}
