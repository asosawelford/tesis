# wav2vec
import os
import numpy as np
import pandas as pd
import torch
from tqdm.auto import tqdm
from transformers import Wav2Vec2FeatureExtractor, Wav2Vec2Model, Wav2Vec2Config
import librosa

def wav2vec_embeddings(path_to_csv, output_dir, model_name='facebook/wav2vec2-base-960h'):
    """Extracts embeddings from audio files given a specific Wav2Vec2 model.
    Extracts all layers, stacks and saves them as a numpy array.
    Expects csv file with a column named "stimuli" containing paths to audio files."""

    os.makedirs(output_dir, exist_ok=True)

    config = Wav2Vec2Config.from_pretrained(model_name, output_hidden_states=True)
    feature_extractor = Wav2Vec2FeatureExtractor.from_pretrained(model_name)
    model = Wav2Vec2Model(config)

    #load data
    metadata_df = pd.read_csv(path_to_csv)

    # iterate over each path in "stimuli" column
    for _, row in tqdm(metadata_df.iterrows()):
        audio_file = row['stimuli']
        input_audio, sample_rate = librosa.load(audio_file, sr=16000)
        inputs = feature_extractor(input_audio, return_tensors="pt", sampling_rate=sample_rate)

        with torch.no_grad():
            outputs= model(**inputs)

        all_layer_embeddings = outputs.hidden_states

        # Concatenate hidden states from all layers and take the mean across the sequence
        # first layer --> output of the CNN layers with an added positional embedding
        embeddings = torch.cat(all_layer_embeddings, dim=0)
        embeddings = embeddings.mean(dim=1)

        # Save embeddings as numpy array
        embeddings = embeddings.squeeze().detach().numpy()
        file_name = os.path.basename(audio_file).split('.')[0]
        file_folder = os.path.basename(os.path.dirname(audio_file).split('/')[-1])
        os.makedirs(os.path.join(output_dir, f'{file_folder}'), exist_ok=True)

        np.save(os.path.join(output_dir, f'{file_folder}', f'{file_name}.npy'), embeddings)

        # free up memory
        del embeddings

if __name__ == '__main__':
    # extract embeddings for dev set
    path_to_dev_csv = '/home/aleph/tesis/classifier/dev.csv'
    path_to_dev_embeddings = '/home/aleph/tesis/classifier/embeddings/dev'
    wav2vec_embeddings(path_to_dev_csv, path_to_dev_embeddings)

    # extract embeddings for test set
    path_to_test_csv = '/home/aleph/tesis/classifier/test.csv'
    path_to_test_embeddings = '/home/aleph/tesis/classifier/embeddings/test'
    wav2vec_embeddings(path_to_test_csv, path_to_test_embeddings)

    # extract embeddings for train set
    path_to_train_csv = '/home/aleph/tesis/classifier/train_merged.csv'
    path_to_train_embeddings = '/home/aleph/tesis/classifier/embeddings/train'
    wav2vec_embeddings(path_to_train_csv, path_to_train_embeddings)
