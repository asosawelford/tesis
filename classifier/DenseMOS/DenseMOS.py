import torch
import torch.nn as nn

class DenseMOS(nn.Module):
    def __init__(self, input_dim, hidden_dim, dropout_prob):
        super(DenseMOS, self).__init__()
        
        # First dense layer with 128 neurons, ReLU activation, and dropout
        self.layer1 = nn.Sequential(
            nn.Linear(input_dim, hidden_dim),  # Linear layer for dense transformation
            nn.ReLU(),  # ReLU activation
            nn.Dropout(dropout_prob),  # Dropout with 0.2
        )

        # Second dense layer with 128 neurons, ReLU activation, and dropout
        self.layer2 = nn.Sequential(
            nn.Linear(hidden_dim, hidden_dim),  # Another dense transformation
            nn.ReLU(),
            nn.Dropout(dropout_prob),
        )

        # Final dense layer for MOS score prediction
        self.output_layer = nn.Linear(hidden_dim, 1)  # Linear layer to predict MOS

    def forward(self, x):
        # Pass the input through the first dense layer
        x = self.layer1(x)

        # Pass through the second dense layer
        x = self.layer2(x)

        # Pass through the final dense layer to get the MOS score
        x = self.output_layer(x)  # Output layer

        # Constrain the output to the 1-5 range
        x = torch.sigmoid(x)  # Constrain between 0 and 1
        x = 1 + 4 * x  # Scale to 1-5

        return x

