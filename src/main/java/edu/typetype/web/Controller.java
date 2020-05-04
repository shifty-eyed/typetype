package edu.typetype.web;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {
	
	@RequestMapping("/index2")
	public String index() {
		return "Greetings from Spring Boot!";
	}

}
