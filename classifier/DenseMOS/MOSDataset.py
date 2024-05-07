"""Custom dataset to read embeddings and MOS scores from a CSV"""
# from numpy import array
# from numpy import float32
import numpy as np
import pandas as pd

# torch
import torch
from torch.utils.data import Dataset

class MOSDataset(Dataset):
    def __init__(self, csv_file):
        # Load the CSV file
        self.data = pd.read_csv(csv_file)

    def __len__(self):
        return len(self.data)  # Total number of samples in the dataset

    def __getitem__(self, idx):
        # Get the embeddings and MOS scores for the given index
        embeddings_str = self.data.iloc[idx]['embeddings']
        mos_score = self.data.iloc[idx]['mos']

        # Convert the string of embeddings to a tensor
        embeddings = np.array(eval(embeddings_str))  # Convert from string to numpy array TODO?
        embeddings_tensor = torch.tensor(embeddings, dtype=torch.float32)  # Convert to PyTorch tensor

        # Average the embeddings over the sequence dimension (assuming they are 2D arrays)
        feature_vector = embeddings_tensor.mean(dim=0)  # Average over the time axis

        # MOS score should be a single value
        mos_tensor = torch.tensor([mos_score], dtype=torch.float32)  # Convert to tensor

        return feature_vector, mos_tensor
