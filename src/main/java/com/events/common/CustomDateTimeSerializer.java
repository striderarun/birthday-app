package com.events.common;

import java.io.IOException;

import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;


public class CustomDateTimeSerializer extends StdSerializer<DateTime> {

	private static final long serialVersionUID = 1L;

	public CustomDateTimeSerializer() {
        super(DateTime.class);
    }

    @Override
    public void serialize(DateTime value, JsonGenerator jgen, SerializerProvider provider) throws IOException {
        DateTimeFormatter formatter = DateTimeFormat.forPattern(EventConstants.DATE_FORMAT_PATTERN);
        jgen.writeString(formatter.print(value));
    }

}