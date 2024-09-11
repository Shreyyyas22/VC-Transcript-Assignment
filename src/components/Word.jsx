function Word({ word, isActive, index, onClick }) {
  return (
    <span
      onClick={onClick}
      className={`break-words rounded-lg p-1 text-xl text-white border-2 ${
        isActive === index ? "border-yellow-400" : "border-transparent"
      }`}
    >
      {word.word}
    </span>
  );
}

export default Word;
