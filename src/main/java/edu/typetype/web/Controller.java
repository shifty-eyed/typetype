package edu.typetype.web;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import javax.annotation.PostConstruct;

import org.firmata4j.IODevice;
import org.firmata4j.Pin.Mode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {
	
	@Autowired
	IODevice device;
	
	private ScheduledExecutorService timer = Executors.newSingleThreadScheduledExecutor(); 
	
	@PostConstruct
	private void init() throws IllegalArgumentException, IOException {
		device.getPin(13).setMode(Mode.OUTPUT);
	}
	
	@RequestMapping("/getLessons")
	public Map<String,String> getLessons() {
		Map<String,String> items = new HashMap<String, String>();
		items.put("Lesson1", "aq sw de fr gt hy ju ki lo ;p");
		items.put("Lesson2", "z x c v b n m , . l");
		items.put("Lesson3", "Spring boot comes with Jackson out-of-the-box which will take care of un-marshaling JSON request body to Java objects");
		return items;
	}
	
	@RequestMapping("/fingerSignal")
	public void fingerSignal(String key) throws IllegalStateException, IOException {
		setPin(1);
		timer.schedule(() -> setPin(0), 500, TimeUnit.MILLISECONDS);
		System.out.println("signal: "+key);
	}
	
	private void setPin(long val) {
		try {
			device.getPin(13).setValue(val);
		} catch (Exception e) {
			e.printStackTrace();
		} 
	}

}
