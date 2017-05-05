package com.events.common;

import java.io.IOException;

import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.JsonToken;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.deser.std.StdScalarDeserializer;

/**
 * Custom deserializer for the {@link DateTime}
 */
public class CustomDateTimeDeserializer extends StdScalarDeserializer<DateTime> {

    private static final long serialVersionUID = 1L;

    public CustomDateTimeDeserializer() {
        super(DateTime.class);
    }

    @Override
    public DateTime deserialize(JsonParser jsonParser,
            DeserializationContext deserializationContext) throws IOException, JsonProcessingException {
        JsonToken currentToken = jsonParser.getCurrentToken();
        if (currentToken == JsonToken.VALUE_STRING) {
            String dateTimeAsString = jsonParser.getText().trim();
            DateTimeFormatter formatter = DateTimeFormat.forPattern(EventConstants.DATE_FORMAT_PATTERN);
            return formatter.parseDateTime(dateTimeAsString);
        }
        throw deserializationContext.mappingException(handledType());
    }

}
