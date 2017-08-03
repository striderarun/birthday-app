package com.events.config;

import java.io.IOException;
import java.util.Arrays;
import java.util.Properties;

import org.apache.velocity.app.VelocityEngine;
import org.dozer.DozerBeanMapper;
import org.dozer.Mapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.aspectj.EnableSpringConfigured;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@ComponentScan(basePackages = "com.events")
@EntityScan(basePackages = "com.events.domain")
@EnableJpaRepositories(basePackages = "com.events.repository")
@EnableTransactionManagement
@EnableSpringConfigured
@EnableAutoConfiguration
@EnableScheduling
@SpringBootApplication
public class ApplicationConfig {

	@Bean
	public Mapper mapper() {
		Mapper mapper = new DozerBeanMapper(Arrays.asList("classpath:dozer-bean-mappings.xml"));
		return mapper;
	}

	@Bean
	public VelocityEngine velocityEngine(){
		Properties properties = new Properties();
		try {
			properties.load(this.getClass().getResourceAsStream("/application.properties"));
		} catch (IOException e) {
			e.printStackTrace();
		}
		return new VelocityEngine(properties);
	}

	public static void main(String[] args) {
		SpringApplication.run(ApplicationConfig.class, args);
	}

}
