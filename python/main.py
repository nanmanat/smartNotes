import torch
from pyannote.audio import Pipeline
import speech_recognition as sr  # For ASR
import librosa  # For audio loading
import numpy as np
import re  # For cleaning

# --- Speaker Diarization ---
pipeline = Pipeline.from_pretrained(
    "pyannote/speaker-diarization-3.1",
    use_auth_token="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"
)
device = torch.device("mps")  # Or "cuda" if you have a GPU
for model in pipeline._models.values():
    model.to(device)


def diarize_audio(audio_path):
    """
    Performs speaker diarization on the given audio file.

    Args:
        audio_path (str): Path to the audio file.

    Returns:
        pyannote.core.Annotation: Diarization result.  Returns None on error.
    """
    try:
        diarization = pipeline(audio_path)
        return diarization
    except Exception as e:
        print(f"Error during diarization: {e}")
        return None


def transcribe_audio(audio_path):
    """
    Transcribes the audio file using SpeechRecognition for Thai.

    Args:
        audio_path (str): Path to the audio file.

    Returns:
        str: Transcription text. Returns None on error.
    """
    recognizer = sr.Recognizer()
    try:
        with sr.AudioFile(audio_path) as source:
            audio_data = recognizer.record(source)  # Read the entire audio file

        # Use Google Speech Recognition with Thai language code 'th-TH'
        transcription_text = recognizer.recognize_google(audio_data, language="th-TH")
        return transcription_text

    except FileNotFoundError:
        print(f"Error: Audio file not found at {audio_path}")
        return None
    except ValueError:
        print(
            "Error: Unsupported audio file format.  Please use a .wav or .flac file with speech_recognition."
        )
        return None
    except sr.UnknownValueError:
        print("SpeechRecognition could not understand audio")
        return None
    except sr.RequestError as e:
        print(
            f"Could not request results from Google Speech Recognition service; {e}"
        )
        return None
    except Exception as e:
        print(f"Error during transcription: {e}")
        return None


def combine_diarization_and_transcription(diarization, transcription, audio_path):
    """
    Combines diarization and transcription results, aligning speaker segments with transcribed text.

    This function aligns transcribed text from SpeechRecognition with speaker turns
    from pyannote.audio.  It divides the transcribed text based on the timing of
    speaker turns.

    Args:
        diarization (pyannote.core.Annotation): Diarization result from `diarize_audio`.
        transcription (str):  Transcription text from SpeechRecognition.
        audio_path (str): Path to the audio file (needed for duration).

    Returns:
        list: A list of dictionaries, where each dictionary contains:
            - 'start_time': Start time of the speaker turn.
            - 'end_time': End time of the speaker turn.
            - 'speaker': Speaker label.
            - 'text':  The transcribed text, aligned as accurately as possible.
    """
    if diarization is None or transcription is None:
        return []

    # Get the total duration of the audio file.
    audio_duration = librosa.get_duration(path=audio_path)

    combined_results = []
    words = transcription.split()  # Split the transcription into words
    word_index = 0

    for turn, _, speaker in diarization.itertracks(yield_label=True):
        start_time = turn.start
        end_time = turn.end
        speaker_text = []

        # Estimate the number of words spoken in the current turn.  This is a rough
        # approximation, and accuracy may vary.  A more sophisticated approach would
        # require word-level timestamps from the ASR system, which SpeechRecognition
        # does not provide.
        estimated_words = int((end_time - start_time) / audio_duration * len(words))

        for _ in range(estimated_words):
            if word_index < len(words):
                speaker_text.append(words[word_index])
                word_index += 1
            else:
                break  # Stop if we've used all the words

        combined_results.append({
            "start_time": start_time,
            "end_time": end_time,
            "speaker": speaker,
            "text": " ".join(speaker_text)
        })
    return combined_results


if __name__ == "__main__":
    audio_file = "sample.wav"  # Replace with your Thai audio file

    # 1. Diarize the audio
    diarization_result = diarize_audio(audio_file)

    # 2. Transcribe the audio
    transcription_result = transcribe_audio(audio_file)

    # 3. Combine diarization and transcription
    if diarization_result is not None and transcription_result is not None:
        combined_data = combine_diarization_and_transcription(
            diarization_result, transcription_result, audio_file
        )
        for item in combined_data:
            print(
                f"{item['start_time']:.1f}s - {item['end_time']:.1f}s: Speaker {item['speaker']}: {item['text']}"
            )
    elif transcription_result is None:
        print("Transcription failed.  Diarization and combination not attempted.")
    elif diarization_result is None:
        print("Diarization failed. Combination not attempted.")
    else:
        print("Both Diarization and Transcription failed.")
