package edu.typetype.web;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.Charset;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
	
	private static final String LESSON_FILE = "lesson.json"; 
	private static final String COMPLETED_FILE_PREFIX = "completed.json"; 
	
	@RequestMapping("/getLessons")
	public Map<String,Object> getLessons() throws IOException {
		try(InputStream in = new FileInputStream(dataDir+"/"+LESSON_FILE)) {
			Map<String,Object> result = new HashMap<String, Object>();
			result.put("data", IOUtils.toString(in, Charset.forName("UTF-8")));
			result.put("completed", getCompletedLessons());
			return result;
			
		}
	}
	
	@RequestMapping("/getCompletedLessons")
	public String[] getCompletedLessons() throws IOException {
		try(InputStream in = new FileInputStream(dataDir+COMPLETED_FILE_PREFIX)) {
			return json.readValue(IOUtils.toString(in, Charset.forName("UTF-8")), String[].class);
		} catch (FileNotFoundException e) {
			return new String[0];
		}
	}
	
	@RequestMapping("/markLessonCompleted")
	public void markLessonCompleted(String lessonId) throws IOException {
		List<String> lessons = Arrays.asList(getCompletedLessons());
		lessons.add(lessonId);
		try(OutputStream out = new FileOutputStream(dataDir+COMPLETED_FILE_PREFIX)) {
			IOUtils.write(json.writeValueAsString(lessons.toArray()), out, Charset.forName("UTF-8"));
		}
	}
	
	@RequestMapping("/fingerSignal")
	public void fingerSignal(String key) throws IllegalStateException, IOException {
		device.signal(key);
	}
	
}
