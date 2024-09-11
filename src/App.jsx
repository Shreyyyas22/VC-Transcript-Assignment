import { useState } from "react";
import { motion } from "framer-motion";
import Header from "./components/Header";
import TranscriptEditor from "./components/TranscriptEditor"
import FloatingShape from "./components/motion/FloatingShape"

function App() {
  const [transcript, setTranscript] = useState([
    { word: 'Hello', start_time: 0, duration: 1000 },
    { word: 'world', start_time: 1000, duration: 1600 },
    { word: 'This', start_time: 1600, duration: 2100 },
    { word: 'is', start_time: 2100, duration: 2500 },
    { word: 'a', start_time: 2500, duration: 2900 },
    { word: 'test', start_time: 2900, duration: 3500 },
    { word: 'transcript', start_time: 3500, duration: 4100 },
    { word: 'for', start_time: 4100, duration: 4600 },
    { word: 'playback', start_time: 4600, duration: 5100 },
    { word: 'and', start_time: 5100, duration: 5600 },
    { word: 'editing', start_time: 5600, duration: 6100 },
    { word: 'features.', start_time: 6100, duration: 6600 },
    { word: 'It', start_time: 6600, duration: 7100 },
    { word: 'also', start_time: 7100, duration: 7600 },
    { word: 'supports', start_time: 7600, duration: 8100 },
    { word: 'real-time', start_time: 8100, duration: 8600 },
    { word: 'highlighting', start_time: 8600, duration: 9100 },
    { word: 'and', start_time: 9100, duration: 9600 },
    { word: 'text', start_time: 9600, duration: 10100 },
    { word: 'editing', start_time: 10100, duration: 10600 },
    { word: 'capabilities', start_time: 10600, duration: 11100 },
    { word: 'for', start_time: 11100, duration: 11600 },
    { word: 'an', start_time: 11600, duration: 11800 },
    { word: 'enhanced', start_time: 11800, duration: 12100 },
    { word: 'user', start_time: 12100, duration: 12600 },
    { word: 'experience.', start_time: 12600, duration: 13100 },
    { word: 'This', start_time: 13100, duration: 13600 },
    { word: 'project', start_time: 13600, duration: 13900 },
    { word: 'demonstrates', start_time: 13900, duration: 14200 },
    { word: 'the', start_time: 14200, duration: 14600 },
    { word: 'ability', start_time: 14600, duration: 14900 },
    { word: 'to', start_time: 14900, duration: 15100 },
    { word: 'play', start_time: 15100, duration: 15300 },
    { word: 'and', start_time: 15300, duration: 15600 },
    { word: 'edit', start_time: 15600, duration: 15900 },
    { word: 'a', start_time: 15900, duration: 16100 },
    { word: 'transcript', start_time: 16100, duration: 16400 },
    { word: 'in', start_time: 16400, duration: 16700 },
    { word: 'real-time.', start_time: 16700, duration: 17000 }
  ]);

  return (
    <>
      <div className="w-screen min-h-screen bg-gradient-to-br from-pink-950 via-pink-700 to-pink-500 flex items-center justify-center relative overflow-hidden">

      <Header />

      <FloatingShape color='bg-pink-500' size='w-64 h-64' top='-5%' left='5%' delay={1} />
			<FloatingShape color='bg-pink-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
			<FloatingShape color='bg-pink-600' size='w-32 h-32' top='20%' left='-5%' delay={2} />

      <motion.div
        className="w-full max-w-3xl p-8 bg-gray-800 rounded-lg shadow-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
      >
        <TranscriptEditor
          initialTranscript={transcript}
          setTranscript={setTranscript}
        />
      </motion.div>
      </div>
    </>
  );
}

export default App;
