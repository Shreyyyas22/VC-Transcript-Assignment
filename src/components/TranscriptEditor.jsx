import { useState, useEffect, useRef } from "react";
import Word from "./Word";
import PlaybackControls from "./PlaybackControls";
import TextEditor from "./TextEditor";

function TranscriptEditor({ initialTranscript, setTranscript }) {
  const synth = window.speechSynthesis;

  const [currentTime, setCurrentTime] = useState(0);
  const [isActive, setIsActive] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedWord, setEditedWord] = useState(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isActive == null || isActive === -1) return;

    const speakIt = new SpeechSynthesisUtterance(
      initialTranscript[isActive].word
    );
    speakIt.rate = 2.0; 
    synth.speak(speakIt);

    return () => {
      synth.cancel(); 
    };
  }, [isActive]);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentTime((prevTime) => {
        const newTime = prevTime + 50;

        const activeWordIndex = initialTranscript.findIndex(
          (word) =>
            newTime >= word.start_time &&
            newTime < word.start_time + word.duration
        );

        if (activeWordIndex !== -1) {
          setIsActive(activeWordIndex);
        } else {
          setIsPlaying(false);
          setIsActive(null);
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setCurrentTime(0);
        }

        return newTime;
      });
    }, 50);

    intervalRef.current = interval;

    return () => clearInterval(interval);
  }, [isPlaying, initialTranscript]);

  const startPlayback = () => {
    if (intervalRef.current) return;
    setIsPlaying(true);
  };

  const stopPlayback = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPlaying(false);
    setIsActive(null);
    setCurrentTime(0);
  };

  const handleWordClick = (index) => {
    setEditingIndex(index);
    setEditedWord(initialTranscript[index].word);
  };

  const handleInputChange = (e) => {
    if (e.target.value === "") {
      alert("You cannot delete a word");
      return;
    }
    setEditedWord(e.target.value);
  };

  const handleSubmit = () => {
    if (editingIndex !== null && editedWord !== null) {
      const updatedTranscript = [...initialTranscript];
      updatedTranscript[editingIndex] = {
        ...updatedTranscript[editingIndex],
        word: editedWord
      };
      setTranscript(updatedTranscript);
    }
    setEditingIndex(null);
    setEditedWord(null);
  };

  return (
    <div className="flex gap-4">
      <div className="w-1/2 flex flex-col gap-2">
        <span className="p-2 rounded-lg text-white w-fit bg-gray-500">
          {(currentTime / 1000).toFixed(1)}s
        </span>
        <div className="flex flex-wrap gap-1">
          {initialTranscript.map((eachWord, index) => (
            <div key={index} className="relative">
              <Word
                index={index}
                word={eachWord}
                isActive={isActive}
                onClick={() => handleWordClick(index)}
              />
              {editingIndex === index && (
                <TextEditor
                  value={editedWord ?? ""}
                  onChange={handleInputChange}
                  onSubmit={handleSubmit}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex text-white items-center justify-center">
          <PlaybackControls
            isPlaying={isPlaying}
            startPlayback={startPlayback}
            stopPlayback={stopPlayback}
          />
        </div>
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <img
          src="https://images.unsplash.com/file-1720553250263-3b4f25a93c9cimage?w=416&dpr=2&auto=format&fit=crop&q=60"
          alt="Decorative"
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}

export default TranscriptEditor;
