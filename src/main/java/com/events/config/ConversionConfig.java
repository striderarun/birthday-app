package com.events.config;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ConversionServiceFactoryBean;
import org.springframework.core.convert.ConversionService;
import org.springframework.core.convert.converter.Converter;

import com.events.converters.EventBeanToEventConverter;
import com.events.converters.UserBeanToUserConverter;

/**
 * Configuration class to define all converters
 */
@Configuration
public class ConversionConfig {

    private static final String CONVERSION_FACTORY = "eventConversionFactory";
    public static final String CONVERSION_SERVICE = "eventConversionService";

    @Autowired
    private EventBeanToEventConverter eventBeanToEventConverter;
    
    @Autowired
    private UserBeanToUserConverter userBeanToUserConverter;
    

    @Bean(name = CONVERSION_FACTORY)
    public ConversionServiceFactoryBean conversionServiceFactoryBean() {
        ConversionServiceFactoryBean factoryBean = new ConversionServiceFactoryBean();
        Set<Converter<?, ?>> converters = new HashSet<Converter<?, ?>>();
        converters.add(eventBeanToEventConverter);
        converters.add(userBeanToUserConverter);
        factoryBean.setConverters(converters);
        return factoryBean;
    }

    @Bean(name = CONVERSION_SERVICE)
    public ConversionService getConversionService(@Qualifier(CONVERSION_FACTORY) ConversionServiceFactoryBean conversionServiceFactoryBean) {
        return conversionServiceFactoryBean.getObject();
    }

}