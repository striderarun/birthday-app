package com.events.common;

public class EventConstants {

    // Pagination
    public static final int PAGE_SIZE_DEFAULT = 20;
    public static final int PAGE_NUMBER_DEFAULT = 0;
    public static final String PAGE_SORT_DEFAULT = "eventDate";

    public static final String DATE_FORMAT_PATTERN = "dd-MMM-yy HH:mm:ss";

    //Groups
    public static final String GLOBAL_GROUP = "SALES";

    public static final String REPLY_TO_ADDRESS = "arun_mohan@apple.com";
    public static final String FROM_ADDRESS = "sales_events_team@donotreply.com";
    public static final String EMAIL_TEMPLATE = "emailTemplate.vm";

    //Image BackGrounds
    public static final String BIRTHDAY_BACKGROUND = "classpath:birthday-bg.jpg";
    public static final String FAREWELL_BACKGROUND = "classpath:farewell-bg.jpg";
    public static final String MEETING_BACKGROUND = "classpath:meeting-bg.jpg";
    public static final String DEFAULT_PROFILE_PIC = "classpath:profile.image.jpg";

    public static final String EMAIL_VALIDATOR_REGEX = "[^\\s@]+@[^\\s@]+\\.[^\\s@]+.";





}
