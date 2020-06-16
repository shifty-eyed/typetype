package edu.typetype.web;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.Charset;
import java.util.Arrays;
import java.util.Collection;
import java.util.LinkedHashSet;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import edu.typetype.service.FingerSignalingDevice;

@RestController
public class Controller {
	
	@Autowired
	FingerSignalingDevice device;
	
	@Value("${typetype.data.dir}")
	private String dataDir;
	
	private static final ObjectMapper json = new ObjectMapper(); 
	
	private static final String LESSON_FILE = "lessons.json"; 
	private static final String COMPLETED_FILE_PREFIX = "completed.json"; 
	
	@RequestMapping("/getLessons")
	public String getLessons() throws IOException {
		try(InputStream in = new FileInputStream(dataDir+"/"+LESSON_FILE)) {
			String cmplLessons = getCompletedLessons();
			return String.format("{\"data\":%s, \"completed\":%s}", 
					IOUtils.toString(in, Charset.forName("UTF-8")), cmplLessons.isEmpty() ? "\"\"" : cmplLessons);
		}
	}
	
	//@RequestMapping("/getCompletedLessons")
	public String getCompletedLessons() throws IOException {
		try(InputStream in = new FileInputStream(dataDir+"/"+COMPLETED_FILE_PREFIX)) {
			return IOUtils.toString(in, Charset.forName("UTF-8"));
		} catch (FileNotFoundException e) {
			return "";
		}
	}
	
	@RequestMapping("/markLessonCompleted")
	public void markLessonCompleted(String lessonId) throws IOException {
		String[] cmplLessons = json.readValue(getCompletedLessons(), String[].class);
		Collection<String> lessons = new LinkedHashSet<String>(Arrays.asList(cmplLessons));
		lessons.add(lessonId);
		try(OutputStream out = new FileOutputStream(dataDir+"/"+COMPLETED_FILE_PREFIX)) {
			IOUtils.write(json.writeValueAsString(lessons.toArray()), out, Charset.forName("UTF-8"));
		}
	}
	
	@RequestMapping("/fingerSignal")
	public void fingerSignal(String key) throws IllegalStateException, IOException {
		device.signal(key);
	}
	
}
