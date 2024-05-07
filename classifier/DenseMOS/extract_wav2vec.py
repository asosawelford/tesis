# wav2vec
import pandas as pd
import torch
from tqdm.auto import tqdm
from transformers import Wav2Vec2FeatureExtractor, Wav2Vec2Model
import librosa


# define function for extracting embeddings
def wav2vec_embeddings(path_to_csv, model_name):
    """Extracts embeddings from audio files given a specific Wav2Vec2 model.
    Last hidden state is averaged to get a single embedding per audio file."""
    feature_extractor = Wav2Vec2FeatureExtractor.from_pretrained(model_name)
    model = Wav2Vec2Model.from_pretrained(model_name)
    metadata_df = pd.read_csv(path_to_csv)
    # Create a new column to store embeddings
    metadata_df['embeddings'] = None
    # iterate over each path in "stimuli" column
    for index, row in tqdm(metadata_df.iterrows()):
        audio_file = row['stimuli']
        input_audio, sample_rate = librosa.load(audio_file, sr=16000)
        inputs = feature_extractor(input_audio, return_tensors="pt", sampling_rate=sample_rate)
        with torch.no_grad():
            outputs= model(inputs.input_values)
        embeddings = outputs.last_hidden_state
        embeddings = embeddings.mean(dim=1)
        embeddings = embeddings.squeeze().detach().numpy()
        metadata_df.at[index, 'embeddings'] = [embeddings]
          
    return metadata_df

def save_embeddings(embeddings_df, path_to_save):
    """Saves the embeddings to a csv file."""
    embeddings_df.to_csv(path_to_save, index=False)
    print(f"Embeddings saved at {path_to_save}")
