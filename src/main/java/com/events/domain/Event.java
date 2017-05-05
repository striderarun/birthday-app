package com.events.domain;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

import com.events.common.EmailStatus;
import org.apache.commons.collections.CollectionUtils;
import org.hibernate.annotations.Type;
import org.joda.time.DateTime;

import com.events.common.EventType;

@Entity
@Table(name="EVENT")
@SequenceGenerator(name = "EVENT_SEQ", sequenceName = "EVENT_SEQ", allocationSize = 1)
public class Event implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "EVENT_SEQ")
    private Long id;

    @Enumerated(EnumType.STRING)
    private EventType type;

    @Type(type = "org.jadira.usertype.dateandtime.joda.PersistentDateTime")
    private DateTime eventDate;

    private String description;
    private String title;
    private String venue;
    private Integer month;
    private Integer year;

    @Enumerated(EnumType.STRING)
    private EmailStatus emailSent;

    @Column(columnDefinition = "CHAR")
    @Type(type = "yes_no")
    private boolean titleEqualsSubject;

    @OneToOne
    @JoinColumn(name = "GROUP_ID")
    private Group group;
    
    @Lob
    private byte[] eventImage;

    @OneToMany(cascade = { CascadeType.ALL }, orphanRemoval=true, mappedBy = "event")
    private Set<EventSpotlight> spotlight;
    
    @OneToMany(cascade = { CascadeType.ALL }, orphanRemoval=true, mappedBy = "event")
    private Set<EventInvitees> invitees;

    @Transient
    private String formattedDate;

    public String getFormattedDate() {
        return formattedDate;
    }

    public void setFormattedDate(String formattedDate) {
        this.formattedDate = formattedDate;
    }

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

    public DateTime getEventDate() {
		return eventDate;
	}

	public void setEventDate(DateTime eventDate) {
		this.eventDate = eventDate;
	}

	public Integer getMonth() {
        return month;
    }

    public void setMonth(Integer month) {
        this.month = month;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

	public Group getGroup() {
		return group;
	}

	public void setGroup(Group group) {
		this.group = group;
	}

	public byte[] getEventImage() {
		return eventImage;
	}

	public void setEventImage(byte[] eventImage) {
		this.eventImage = eventImage;
	}

	public Set<EventSpotlight> getSpotlight() {
        if(CollectionUtils.isEmpty(spotlight)) {
            spotlight = new HashSet<>();
        }
		return spotlight;
	}

	public Set<EventInvitees> getInvitees() {
        if(CollectionUtils.isEmpty(invitees)) {
            invitees = new HashSet<>();
        }
		return invitees;
	}

    public void setSpotlight(Set<EventSpotlight> spotlight) {
        this.spotlight = spotlight;
    }

    public void setInvitees(Set<EventInvitees> invitees) {
        this.invitees = invitees;
    }

    public EmailStatus getEmailSent() {
        return emailSent;
    }

    public void setEmailSent(EmailStatus emailSent) {
        this.emailSent = emailSent;
    }

    public boolean isTitleEqualsSubject() {
        return titleEqualsSubject;
    }

    public void setTitleEqualsSubject(boolean titleEqualsSubject) {
        this.titleEqualsSubject = titleEqualsSubject;
    }
}