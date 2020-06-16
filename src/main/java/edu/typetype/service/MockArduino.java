package edu.typetype.service;

import java.io.IOException;
import java.util.Set;

import org.firmata4j.Consumer;
import org.firmata4j.I2CDevice;
import org.firmata4j.IODevice;
import org.firmata4j.IODeviceEventListener;
import org.firmata4j.Pin;
import org.firmata4j.PinEventListener;
import org.firmata4j.fsm.Event;

public class MockArduino implements IODevice {
	
	public static class MockPin implements Pin {

		@Override
		public IODevice getDevice() {
			return null;
		}

		@Override
		public byte getIndex() {
			return 0;
		}

		@Override
		public Mode getMode() {
			return null;
		}

		@Override
		public void setMode(Mode mode) throws IOException, IllegalArgumentException {
		}

		@Override
		public void setServoMode(int minPulse, int maxPulse) throws IOException, IllegalArgumentException {
		}

		@Override
		public boolean supports(Mode mode) {
			return false;
		}

		@Override
		public Set<Mode> getSupportedModes() {
			return null;
		}

		@Override
		public long getValue() {
			return 0;
		}

		@Override
		public void setValue(long value) throws IOException, IllegalStateException {
		}

		@Override
		public void addEventListener(PinEventListener listener) {
		}

		@Override
		public void removeEventListener(PinEventListener listener) {
		}

		@Override
		public void removeAllEventListeners() {
		}
		
	}

	@Override
	public void start() throws IOException {
	}

	@Override
	public void stop() throws IOException {
	}

	@Override
	public void ensureInitializationIsDone() throws InterruptedException {
	}

	@Override
	public boolean isReady() {
		return true;
	}

	@Override
	public Set<Pin> getPins() {
		return null;
	}

	@Override
	public int getPinsCount() {
		return 0;
	}

	@Override
	public Pin getPin(int index) {
		return new MockPin();
	}

	@Override
	public I2CDevice getI2CDevice(byte address) throws IOException {
		return null;
	}

	@Override
	public void addEventListener(IODeviceEventListener listener) {

	}

	@Override
	public void removeEventListener(IODeviceEventListener listener) {

	}

	@Override
	public String getProtocol() {
		return null;
	}

	@Override
	public void addProtocolMessageHandler(String messageType, Consumer<Event> handler) {

	}

	@Override
	public void sendMessage(String message) throws IOException {

	}

	@Override
	public void sendMessage(byte... msg) throws IOException {

	}

}
