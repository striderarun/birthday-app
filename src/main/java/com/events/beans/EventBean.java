package com.events.beans;

import java.io.Serializable;
import java.util.Set;

import javax.validation.constraints.NotNull;

import com.events.common.EmailStatus;
import org.joda.time.DateTime;

import com.events.common.CustomDateTimeDeserializer;
import com.events.common.CustomDateTimeSerializer;
import com.events.common.EventType;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

public class EventBean implements Serializable {

    private static final long serialVersionUID = 1L;

	private Long id;
	private EventType type;
	
	@NotNull
	@JsonSerialize(using = CustomDateTimeSerializer.class)
    @JsonDeserialize(using = CustomDateTimeDeserializer.class)
	private DateTime eventDate;
	
	@NotNull
	private String description;
	
	@NotNull
	private String title;
	
	@NotNull
	private String venue;
	
	private String groupName;

	private byte[] eventImage;

	private EmailStatus emailStatus;

	private boolean titleEqualsSubject;
	
	private Set<Long> spotlight;
	
	private Set<Long> invitees;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public EventType getType() {
		return type;
	}

	public void setType(EventType type) {
		this.type = type;
	}

	public DateTime getEventDate() {
		return eventDate;
	}

	public void setEventDate(DateTime eventDate) {
		this.eventDate = eventDate;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getVenue() {
		return venue;
	}

	public void setVenue(String venue) {
		this.venue = venue;
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public byte[] getEventImage() {
		return eventImage;
	}

	public void setEventImage(byte[] eventImage) {
		this.eventImage = eventImage;
	}

	public Set<Long> getSpotlight() {
		return spotlight;
	}

	public void setSpotlight(Set<Long> spotlight) {
		this.spotlight = spotlight;
	}

	public Set<Long> getInvitees() {
		return invitees;
	}

	public void setInvitees(Set<Long> invitees) {
		this.invitees = invitees;
	}

	public EmailStatus getEmailStatus() {
		return emailStatus;
	}

	public void setEmailStatus(EmailStatus emailStatus) {
		this.emailStatus = emailStatus;
	}

	public boolean isTitleEqualsSubject() {
		return titleEqualsSubject;
	}

	public void setTitleEqualsSubject(boolean titleEqualsSubject) {
		this.titleEqualsSubject = titleEqualsSubject;
	}
}