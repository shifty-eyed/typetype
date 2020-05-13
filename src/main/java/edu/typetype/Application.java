package edu.typetype;

import java.io.IOException;

import javax.annotation.PreDestroy;

import org.firmata4j.IODevice;
import org.firmata4j.firmata.FirmataDevice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Application {
	
	@Autowired
	IODevice device;
	
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Bean
	public IODevice device(ApplicationContext ctx) throws IOException, InterruptedException {
		IODevice dev = new FirmataDevice("COM3");
		dev.start();
		dev.ensureInitializationIsDone();
		return dev;
	}
	
	@PreDestroy
	private void destroy() throws IOException {
		device.stop();
	}

}
