package com.events.service.impl;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

import javax.annotation.Resource;
import javax.mail.Address;
import javax.mail.MessagingException;
import javax.mail.SendFailedException;
import javax.mail.internet.MimeMessage;

import com.events.common.EmailStatus;
import org.apache.velocity.app.VelocityEngine;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.convert.ConversionService;
import org.springframework.core.io.ResourceLoader;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.velocity.VelocityEngineUtils;

import com.events.common.EventConstants;
import com.events.common.EventType;
import com.events.config.ConversionConfig;
import com.events.domain.Event;
import com.events.repository.EventsRepository;
import com.events.service.EmailService;

@Service
public class EmailServiceImpl implements EmailService {

	private static final String SUBJECT_PREFIX = "COMING UP NEXT: ";

    @Resource
    private EventsRepository eventsRepository;
    
    @Autowired
    @Qualifier(ConversionConfig.CONVERSION_SERVICE)
    private ConversionService conversionService; 

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private VelocityEngine velocityEngine;
    
    @Autowired
    private ResourceLoader resourceLoader;

	@Override
	public Set<String> sendEmail(Long id) {
		Set<String> invalidIds = new HashSet<>();
		Event event = eventsRepository.findOne(id);
		SimpleDateFormat sdf = new SimpleDateFormat("dd MMMM, h:mm a");
		event.setFormattedDate(sdf.format(event.getEventDate().toDate()));
		List<String> emailRecipients = event.getInvitees().stream().map(e -> e.getUser().getPrimaryEmail()).collect(Collectors.toList());
		List<String> spotlightUsers = event.getSpotlight().stream().map(e -> e.getUser().getPrimaryEmail()).collect(Collectors.toList());
		Map<String, Object> model = new HashMap<>();
        model.put("event", event);
        MimeMessage mail = javaMailSender.createMimeMessage();
		try {
			MimeMessageHelper helper = new MimeMessageHelper(mail, true);
			File backgroundImage = getBackGroundImage(event.getType());
			File spotlightImage = getSpotlightImage(event);
			helper.setTo(emailRecipients.toArray(new String[emailRecipients.size()]));
			helper.setCc(spotlightUsers.toArray(new String[spotlightUsers.size()]));
            helper.setReplyTo(EventConstants.REPLY_TO_ADDRESS);
            helper.setFrom(EventConstants.FROM_ADDRESS);
			helper.setSubject(formSubject(event));
            helper.setText(VelocityEngineUtils.mergeTemplateIntoString(velocityEngine, EventConstants.EMAIL_TEMPLATE, "UTF-8", model), true);
            helper.addInline("backgroundImage", backgroundImage);
            helper.addInline("spotlightImage", spotlightImage);
			javaMailSender.send(mail);
		} catch (IOException e) {
			e.printStackTrace();
		} catch (MailSendException e) {
			SendFailedException sendFailedMessage = (SendFailedException) e.getFailedMessages().values().iterator().next();
			List<Address> invalidAddresses = Arrays.asList(sendFailedMessage.getInvalidAddresses());
			for (Address address: invalidAddresses) {
				invalidIds.add(address.toString());
			}
		} catch (MessagingException e) {
			e.printStackTrace();
		}
		deleteTempFile(id);
		return invalidIds;
	}
	
	private File getBackGroundImage(EventType eventType) throws IOException {
		File backgroundImage = null;
		switch(eventType) {
		case BIRTHDAY : 
			backgroundImage = resourceLoader.getResource(EventConstants.BIRTHDAY_BACKGROUND).getFile();
			break;
		case FAREWELL :
			backgroundImage = resourceLoader.getResource(EventConstants.FAREWELL_BACKGROUND).getFile();
			break;
		case MEETING  :
			backgroundImage = resourceLoader.getResource(EventConstants.MEETING_BACKGROUND).getFile();
			break;			
		}
		return backgroundImage;
	}

	private byte[] setDefaultProfilePic() throws IOException {
		return Files.readAllBytes(resourceLoader.getResource(EventConstants.DEFAULT_PROFILE_PIC).getFile().toPath());
	}

	/**
	 * Subject creation logic
	 *
	 * @param event
	 * @return
	 */
	private String formSubject(Event event) {
		StringBuilder subject = new StringBuilder();
		if (event.isTitleEqualsSubject()) {
			subject.append(event.getTitle());
		} else {
			if(new DateTime().toLocalDate().isBefore(event.getEventDate().toLocalDate())) {
				subject.append(SUBJECT_PREFIX);
			}
			switch(event.getType()) {
				case BIRTHDAY :
					subject.append(String.format("%s's Birthday Celebration", null != event.getSpotlight().iterator().next().getUser().getNickName() ? event.getSpotlight().iterator().next().getUser().getNickName() : event.getSpotlight().iterator().next().getUser().getFirstName()));
					break;
				case FAREWELL :
					subject.append(String.format("%s's Farewell", null != event.getSpotlight().iterator().next().getUser().getNickName() ? event.getSpotlight().iterator().next().getUser().getNickName() : event.getSpotlight().iterator().next().getUser().getFirstName()));
					break;
				case MEETING  :
					subject.append(String.format("%s's Meeting", null != event.getSpotlight().iterator().next().getUser().getNickName() ? event.getSpotlight().iterator().next().getUser().getNickName() : event.getSpotlight().iterator().next().getUser().getFirstName()));
					break;
			}
		}
		return subject.toString();
	}

	private File getSpotlightImage(Event event) throws IOException {
		File spotlightImage = null;
		switch(event.getType()) {
		case BIRTHDAY : 
			spotlightImage = Files.write(Paths.get(String.format("%s.jpg", event.getId())), null != event.getSpotlight().iterator().next().getUser().getProfileImage() ? event.getSpotlight().iterator().next().getUser().getProfileImage() : setDefaultProfilePic()).toFile();
			break;
		case FAREWELL :
			spotlightImage = Files.write(Paths.get(String.format("%s.jpg", event.getId())), null != event.getSpotlight().iterator().next().getUser().getProfileImage() ? event.getSpotlight().iterator().next().getUser().getProfileImage() : setDefaultProfilePic()).toFile();
			break;
		case MEETING  :
			spotlightImage = Files.write(Paths.get(String.format("%s.jpg", event.getId())), null != event.getSpotlight().iterator().next().getUser().getProfileImage() ? event.getSpotlight().iterator().next().getUser().getProfileImage() : setDefaultProfilePic()).toFile();
			break;			
		}
		return spotlightImage;
	}

	private void deleteTempFile(Long id) {
		try {
			Files.deleteIfExists(Paths.get(String.format("%s.jpg", id)));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	@Override
	@Scheduled(fixedRate = 300000)
	@Transactional(propagation = Propagation.REQUIRED)
	public void scheduledEmail() {
		List<Event> birthdays = eventsRepository.findByTypeAndEmailSent(EventType.BIRTHDAY, EmailStatus.NOT_SENT);
		for(Event birthday: birthdays) {
			if(birthday.getEventDate().withZone(new DateTime().getZone()).toLocalDate().equals(new DateTime().toLocalDate())) {
				this.sendEmail(birthday.getId());
				birthday.setEmailSent(EmailStatus.SENT);
				eventsRepository.save(birthday);
			}		
		}
	}

}
