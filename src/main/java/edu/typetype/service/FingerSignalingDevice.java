package edu.typetype.service;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

import org.firmata4j.IODevice;
import org.firmata4j.Pin.Mode;
import org.firmata4j.firmata.FirmataDevice;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class FingerSignalingDevice {
	
	private IODevice arduino;
	
	private ScheduledExecutorService timer = Executors.newSingleThreadScheduledExecutor();
	
	@Value("${typetype.delayBeforeSignal}")
	private long delayBeforeSignal;
	
	@Value("${typetype.signalLength}")
	private long signalLength;
	
	@Value("${arduino.pinIdOffset}")
	private int pinIdOffset;
	
	@Value("${arduino.portName}")
	private String devicePortName;
	
	private static final Map<String, Integer> keyToPin = new HashMap<String, Integer>();
	private static final String KEYS = "asdfjkl;";

	
	@PostConstruct
	private void init() throws IllegalArgumentException, IOException, InterruptedException {
		arduino = new FirmataDevice(devicePortName);
		arduino.start();
		arduino.ensureInitializationIsDone();
		for (int i=0; i<KEYS.length(); i++) {
			keyToPin.put(""+KEYS.charAt(i), pinIdOffset+i);
			arduino.getPin(pinIdOffset+i).setMode(Mode.OUTPUT);
		}
	}

	@PreDestroy
	private void destroy() throws IOException {
		arduino.stop();
	}
	
	public void signal(String key) throws IllegalStateException, IOException {
		timer.schedule(() -> {
			setPin(key, 1);
			timer.schedule(() -> setPin(key, 0), signalLength, TimeUnit.MILLISECONDS);
		}, delayBeforeSignal, TimeUnit.MILLISECONDS);
		System.out.println("signal: "+key);
	}
	
	private void setPin(String key, long val) {
		int pin = keyToPin.get(key);
		try {
			arduino.getPin(pin).setValue(val);
		} catch (Exception e) {
			e.printStackTrace();
		} 
	}
}
