package org.dtux.trap;

import brave.sampler.Sampler;
import de.codecentric.boot.admin.server.config.EnableAdminServer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@SpringBootApplication
@Configuration
public class IngraApplication {

	private static Logger logger = LoggerFactory.getLogger(IngraApplication.class.getName());

	public static void main(String[] args) {

		SpringApplication.run(IngraApplication.class, args);

		logger.info("Initialize API => {}.", IngraApplication.class.getName());
	}

	@Bean
	public Sampler defaultSampler() {
		return Sampler.ALWAYS_SAMPLE;
	}
}
