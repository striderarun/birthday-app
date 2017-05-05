package com.events.config;

import java.util.Arrays;

import org.dozer.DozerBeanMapper;
import org.dozer.Mapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.web.SpringBootServletInitializer;
import org.springframework.boot.orm.jpa.EntityScan;
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
public class ApplicationConfig extends SpringBootServletInitializer {

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(ApplicationConfig.class);
	}

	@Bean
	public Mapper mapper() {
		Mapper mapper = new DozerBeanMapper(Arrays.asList("classpath:dozer-bean-mappings.xml"));
		return mapper;
	}
	
	public static void main(String[] args) {
		SpringApplication.run(ApplicationConfig.class, args);
	}

}
