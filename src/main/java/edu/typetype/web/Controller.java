package edu.typetype.web;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.typetype.service.FingerSignalingDevice;

@RestController
public class Controller {
	
	@Autowired
	FingerSignalingDevice device;
	
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
		device.signal(key);
		System.out.println("signal: "+key);
	}
	


}
