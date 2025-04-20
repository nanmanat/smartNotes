import torch
from pyannote.audio import Pipeline
import whisper  # Or your chosen Thai ASR library/model
import librosa
import numpy as np

# --- Speaker Diarization ---
pipeline = Pipeline.from_pretrained(
    "pyannote/speaker-diarization-3.1",
    use_auth_token="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"
)
device = torch.device("mps")
for model in pipeline._models.values():
    model.to(device)

audio_path = "edited.wav"  # Replace with your Thai audio file
diarization = pipeline(audio_path)

# --- Speech-to-Text (Conceptual - Replace with actual Thai ASR) ---
# Example using Whisper (may not be optimal for Thai)
try:
    # Load audio using librosa, ensuring 16kHz sampling rate
    audio, sr = librosa.load(audio_path, sr=16000, mono=True)
    whisper_model = whisper.load_model("medium")  # Or a larger model
    transcription = whisper_model.transcribe(audio, language="th")["text"]
    print("Full Transcription:", transcription)
except Exception as e:
    print(f"Error with Whisper (or ASR): {e}")
    transcription = None

# --- Combining Diarization and Transcription (Basic Approach) ---
if diarization and transcription:
    words = transcription.split()  # Simple word-based splitting (can be improved)
    word_index = 0

    for turn, _, speaker in diarization.itertracks(yield_label=True):
        start_time = turn.start
        end_time = turn.end
        speaker_text = []

        # This is a very basic and likely inaccurate way to associate words with speakers.
        # A more sophisticated approach would involve timestamps from the ASR output.
        estimated_words = int((end_time - start_time) * 2) # Heuristic: ~2 words/second
        for _ in range(estimated_words):
            if word_index < len(words):
                speaker_text.append(words[word_index])
                word_index += 1
            else:
                break

        print(f"{start_time:.1f}s - {end_time:.1f}s: Speaker {speaker}: {' '.join(speaker_text)}")
elif not transcription:
    print("Transcription was not successful.")
elif not diarization:
    print("Diarization was not successful.")