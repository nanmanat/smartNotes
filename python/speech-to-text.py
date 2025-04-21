import speech_recognition as sr

def thai_speech_to_text(audio_file_path):
    """
    Converts Thai speech from an audio file to text using the SpeechRecognition library.

    This function takes the path to an audio file, processes it using Google's
    speech recognition with Thai language support, and prints the transcribed text.
    It handles potential errors such as file not found, unsupported format,
    network issues, and unrecognizable speech.

    Args:
        audio_file_path (str): The path to the audio file.  Must be a supported format (e.g., .wav, .mp3).
    """
    # Create a recognizer object
    r = sr.Recognizer()

    # Load the audio file
    try:
        with sr.AudioFile(audio_file_path) as source:
            audio = r.record(source)  # Read the entire audio file
    except FileNotFoundError:
        print(f"Error: Audio file not found at {audio_file_path}")
        return  # Exit the function if the file doesn't exist
    except ValueError:
        print(f"Error: Unsupported audio file format.  Please use a .wav or .mp3 file.")
        return
    except Exception as e:
        print(f"Error loading audio file: {e}")
        return

    try:
        # Recognize speech using Google Speech Recognition with Thai language code 'th-TH'
        print("Recognizing...")
        text = r.recognize_google(audio, language="th-TH")  # Specify Thai language
        print("You said:", text)  # Print the transcribed text
        return text

    except sr.UnknownValueError:
        # Handle the case where the speech is unintelligible
        print("Google Speech Recognition could not understand audio")
    except sr.RequestError as e:
        # Handle network errors or issues with the Google Speech Recognition service
        print(f"Could not request results from Google Speech Recognition service; {e}")
    except Exception as e:
        # Handle other potential errors
        print(f"An unexpected error occurred: {e}")

if __name__ == "__main__":
    # Get the audio file path from the user
    audio_file = input("Enter the path to your Thai audio file: ")
    thai_speech_to_text(audio_file)
    # Example usage (replace with your actual file path)
    # thai_speech_to_text("path/to/your/audiofile.wav")  #  Use .wav or .mp3
