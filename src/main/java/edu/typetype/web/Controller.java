package edu.typetype.web;

import java.io.IOException;
import java.nio.charset.Charset;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.typetype.service.FingerSignalingDevice;

@RestController
public class Controller {
	
	@Autowired
	FingerSignalingDevice device;
	
	@RequestMapping("/getLessons")
	public String getLessons() throws IOException {
		return IOUtils.resourceToString("/lessons.json", Charset.forName("UTF-8"));
	}
	
	@RequestMapping("/fingerSignal")
	public void fingerSignal(String key) throws IllegalStateException, IOException {
		device.signal(key);
	}
	


}
