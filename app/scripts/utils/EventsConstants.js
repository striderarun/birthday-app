/**
 * @description the constants maintained throughout the events application
 * @author Akshay Abraham
 *
 */

angular.module('sales-events')
    .constant('eventsConstants', (function() {
        return {
            BIRTHDAY: "BIRTHDAY",
            BIRTHDAY_DESCRIPTION: "Join us as we celebrate <xyz>'s birthday and make it as special as possible.",
            BIRTHDAY_TITLE: "Happy birthday <xyz>",
            CONFIRM_DELETE: "Are you sure you want to delete this event?",
            CONFIRM_REMINDER: "Are you sure you want to send a reminder?",
            CREATE_NEW_EVENT: "Create new event",
            CREATE_NEW_USER: "Create new user",
            DATE_SAVE_FORMAT: "DD-MMM-YYYY HH:mm:ss",
            DELETE_SUCCESS: "Delete successful",
            DUMMY_NAME: "<xyz>",
            ERROR_ENCOUNTERED: "Oops! An error has occurred",
            FAREWELL: "FAREWELL",
            FAREWELL_DESCRIPTION: "Life takes us to new places every now and then. And now it's <xyz>'s turn. Join us as we bid farewell to a beloved co-worker and friend.",
            FAREWELL_TITLE: "Farewell <xyz>",
            IMAGE_UPLOAD_SUCCESS: "Image successfully uploaded",
            LIST_DATE_FORMAT: "Do MMMM, h:mm a",
            MEETING: "MEETING",
            MEETING_DESCRIPTION: "Please attend the meeting being conducted by <xyz> to discuss a few important matters.",
            MEETING_TITLE: "Meeting today",
            MONTH_FORMAT: "MMMM YYYY",
            NO: "No",
            OKAY: "Awesome!",
            REDIRECT_TO_LIST_VIEW: "Redirect to list view",
            REMINDER_SENT: "A reminder has been sent to all event invitees",
            SAVE_SUCCESS: "Save successful",
            SH_T: "Sh*t",
            UPLOAD_IMAGE_FOR: "Upload <xyz>'s photo",
            YES: "Yes"

        };
    })()).constant('eventsUrls', (function() {
        var REST_URL_PREFIX = "services",
            EMAILS = "/emails",
            EVENTS = "/events",
            GROUPS = "/groups",
            USERS = "/users",
            RESOURCES = "styles/images";

        return {
            EMAILS_SEND_REMINDER: REST_URL_PREFIX + EMAILS + "/<eventId>",
            EVENTS_DELETE: REST_URL_PREFIX + EVENTS + "?id=<eventId>",
            EVENTS_FETCH: REST_URL_PREFIX + EVENTS + "?month=<month>&year=<year>",
            EVENTS_FETCH_BY_ID: REST_URL_PREFIX + EVENTS + "/<eventId>",
            EVENTS_SAVE: REST_URL_PREFIX + EVENTS,
            GROUPS_FETCH: REST_URL_PREFIX + GROUPS,
            GROUPS_SAVE: REST_URL_PREFIX + GROUPS,
            RESOURCES_DEFAULT_PROFILE_IMAGE: RESOURCES + "/profile.image.jpg",
            REST_URL_BASE: "http://localhost:8081/app/",
            USERS_FETCH: REST_URL_PREFIX + USERS,
            USERS_SAVE: REST_URL_PREFIX + USERS,
            USERS_UPLOAD_PROFILE_IMAGE: REST_URL_PREFIX + USERS + "/<userId>/image"
        };
    })()).constant('routes', (function() {
        return {
            UPCOMING_EVENTS: "upcoming-events",
            UPLOAD_PROFILE_IMAGE: "add.upload-profile-image"
        };
})());