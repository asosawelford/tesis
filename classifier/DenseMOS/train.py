from tqdm.auto import tqdm
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader
from torchsummary import summary

from extract_wav2vec import wav2vec_embeddings, save_embeddings
from MOSDataset import MOSDataset
from DenseMOS import DenseMOS

if __name__=="__main__":
    # extract embeddings for train set
    model_name = 'facebook/wav2vec2-base-960h'

    path_to_train_csv = '/home/aleph/tesis/classifier/train_set.csv'
    train_embeddings = wav2vec_embeddings(path_to_train_csv, model_name)

    path_to_test_csv = '/home/aleph/tesis/classifier/test_set.csv'
    test_embeddings = wav2vec_embeddings(path_to_test_csv, model_name)

    # save the embeddings
    path_to_save_train_embeddings = '/home/aleph/tesis/classifier/train_set_embeddings.csv'
    path_to_save_test_embeddings = '/home/aleph/tesis/classifier/test_set_embeddings.csv'
    save_embeddings(train_embeddings, path_to_save_train_embeddings)
    save_embeddings(test_embeddings, path_to_save_test_embeddings)

    # Create the training and testing DataLoader
    train_dataset = MOSDataset(path_to_save_train_embeddings)
    train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True, num_workers=2)

    test_dataset = MOSDataset(path_to_save_test_embeddings)
    test_loader = DataLoader(test_dataset, batch_size=32, shuffle=False, num_workers=2)


    # Define the model parameters
    input_dim = 768  # Single 768-dimensional input
    hidden_dim = 128  # Hidden dimension for dense layers
    dropout_prob = 0.2  # Dropout probability
    batch_size = 32  # Batch size for training (TODO CAPAZ SOBRA?)

    # Instantiate the DenseMOS model
    dense_mos = DenseMOS(input_dim, hidden_dim, dropout_prob)
    print(summary(dense_mos, input_size=(768,), device='cpu'))

    # define loss and optimizer
    loss_fn = nn.MSELoss()
    optimizer = optim.Adam(dense_mos.parameters(), lr=1e-4)

    # Train the model
    num_epochs = 100

    # Track training and validation loss
    train_losses = []
    val_losses = []

    # track the best validation loss
    best_val_loss = float('inf')

    for epoch in range(num_epochs):
        # Training phase with progress bar
        dense_mos.train()  # Set model to training mode
        train_loss = 0.0  # Initialize the training loss

        # Use tqdm for progress tracking
        with tqdm(total=len(train_loader), desc=f"Epoch {epoch + 1}/{num_epochs}") as pbar:
            for inputs, targets in train_loader:
                optimizer.zero_grad()  # Zero out the gradients

                outputs = dense_mos(inputs)  # Forward pass
                loss = loss_fn(outputs, targets)  # Compute the loss
                loss.backward()  # Backpropagation

                # Gradient clipping
                torch.nn.utils.clip_grad_norm_(dense_mos.parameters(), 1.0) #TODO?

                optimizer.step()  # Update the weights

                train_loss += loss.item()  # Accumulate the loss

                pbar.update(1)  # Update the progress bar

        train_loss /= len(train_loader)  # Average loss over all batches
        train_losses.append(train_loss)  # Save the training loss

        # Validation phase
        dense_mos.eval()  # Set model to evaluation mode
        val_loss = 0.0  # Initialize the validation loss

        with torch.no_grad():
            for inputs, targets in test_loader:
                outputs = dense_mos(inputs)  # Forward pass
                loss = loss_fn(outputs, targets)  # Calculate loss
                val_loss += loss.item()  # Accumulate the validation loss

        val_loss /= len(test_loader)  # Average validation loss over all batches
        val_losses.append(val_loss)

        print(f"Epoch {epoch + 1}/{num_epochs}, Training Loss: {train_loss:.4f}, Validation Loss: {val_loss:.4f}")

        # Save the best model based on validation loss
        if val_loss < best_val_loss:
            best_val_loss = val_loss
            # Save the model (optional)
            torch.save(dense_mos.state_dict(), "best_model.pth")
