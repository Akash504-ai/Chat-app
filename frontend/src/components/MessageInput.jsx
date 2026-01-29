import { useRef, useState, useEffect } from "react";
import { Image, Send, X, Paperclip, Mic, StopCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useChatStore } from "../store/useChatStore";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [audioData, setAudioData] = useState(null);
  const [recording, setRecording] = useState(false);

  const fileRef = useRef(null);
  const imageRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const typingTimeoutRef = useRef(null);

  const {
    sendMessage,
    sendGroupMessage,
    selectedChatType,
    startTyping,
    stopTyping,
  } = useChatStore();

  useEffect(() => {
    return () => {
      clearTimeout(typingTimeoutRef.current);
      stopTyping();
    };
  }, []);

  // =====================
  // IMAGE
  // =====================
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Select an image");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  // =====================
  // FILE
  // =====================
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setFileData({
        base64: reader.result,
        name: file.name,
        type: file.type,
        size: file.size,
      });
    };
    reader.readAsDataURL(file);
  };

  // =====================
  // AUDIO
  // =====================
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (e) => {
      audioChunksRef.current.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      const reader = new FileReader();
      reader.onload = () => setAudioData(reader.result);
      reader.readAsDataURL(blob);
    };

    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  // =====================
  // TYPING HANDLER
  // =====================
  const handleTyping = (value) => {
    setText(value);

    if (!value.trim()) {
      stopTyping();
      return;
    }

    startTyping();

    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      stopTyping();
    }, 1200);
  };

  // =====================
  // SEND
  // =====================
  const handleSend = async (e) => {
    e.preventDefault();
    if (!text && !imagePreview && !fileData && !audioData) return;

    stopTyping();

    const payload = {
      text: text.trim(),
      image: imagePreview,
      audio: audioData,
      file: fileData,
    };

    if (selectedChatType === "group") {
      await sendGroupMessage(payload);
    } else {
      await sendMessage(payload);
    }

    setText("");
    setImagePreview(null);
    setFileData(null);
    setAudioData(null);
  };

  return (
    <div className="border-t border-base-300 p-3">
      {/* PREVIEWS */}
      <div className="mb-2 flex flex-wrap gap-2">
        {imagePreview && (
          <Preview onRemove={() => setImagePreview(null)}>
            <img src={imagePreview} className="h-16 w-16 rounded" />
          </Preview>
        )}

        {fileData && (
          <Preview onRemove={() => setFileData(null)}>
            📄 {fileData.name}
          </Preview>
        )}

        {audioData && (
          <Preview onRemove={() => setAudioData(null)}>
            🔊 Voice message
          </Preview>
        )}
      </div>

      <form onSubmit={handleSend} className="flex items-center gap-2">
        <input
          value={text}
          onChange={(e) => handleTyping(e.target.value)}
          onBlur={stopTyping}
          className="input input-bordered flex-1"
          placeholder="Type a message..."
        />

        <input
          ref={imageRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageChange}
        />

        <input ref={fileRef} type="file" hidden onChange={handleFileChange} />

        <button
          type="button"
          onClick={() => imageRef.current.click()}
          className="btn btn-ghost"
        >
          <Image size={20} />
        </button>

        <button
          type="button"
          onClick={() => fileRef.current.click()}
          className="btn btn-ghost"
        >
          <Paperclip size={20} />
        </button>

        {!recording ? (
          <button
            type="button"
            onClick={startRecording}
            className="btn btn-ghost"
          >
            <Mic size={20} />
          </button>
        ) : (
          <button
            type="button"
            onClick={stopRecording}
            className="btn btn-error"
          >
            <StopCircle size={20} />
          </button>
        )}

        <button type="submit" className="btn btn-primary">
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

const Preview = ({ children, onRemove }) => (
  <div className="flex items-center gap-2 rounded bg-base-200 px-2 py-1">
    {children}
    <button onClick={onRemove}>
      <X size={14} />
    </button>
  </div>
);

export default MessageInput;
