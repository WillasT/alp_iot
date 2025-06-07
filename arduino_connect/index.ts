import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';
import { db } from '../src/lib/firebase'; 
import { ref, push } from 'firebase/database';

// Define the serial port configuration
const port = new SerialPort({
  path: "/dev/cu.usbmodem1301",
  baudRate: 9600,
});

// Setup the parser for reading serial input line-by-line
const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

// Listen for each line of input from Arduino
parser.on('data', (line: string) => {
  const trimmed = line.trim();
  console.log('Received:', trimmed);

  // Push to Firebase Realtime Database
  push(ref(db, 'morse'), { //tunggu ian
    value: trimmed,
    timestamp: Date.now()
  })
  .then(() => {
    console.log('Pushed to Firebase:', trimmed);
  })
  .catch((err: unknown) => {
    console.error('Error pushing to Firebase:', err);
  });
});

console.log('Listening to Arduino on /dev/cu.usbmodem2101...');
