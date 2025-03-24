package com.speproject.careconnect;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class CareconnectApplication {

	public static void main(String[] args) {
		SpringApplication.run(CareconnectApplication.class, args);
	}

}
