# Source code and adittional results of INTERSPEECH 2025 paper 'A Dataset for Automatic Assessment of TTS Quality in Spanish'* 
*(link to paper coming soon)

This repository stores the code related to the development of INTERSPEECH 2025 paper 'A Dataset for Automatic Assessment of TTS Quality in Spanish'. The most relevant file can be found at analysis/subjective_results_corrected.csv. This file contains the results of the subjective evaluations of text-to-speech systems—a total of 4,326 unique audio ratings provided by 92 evaluators. The structure of this file is as follows:

+ **participant_id**: Unique identifier for the evaluator.
+ **age**, **gender_participant**, **country**, **province**: Sociodemographic data of the evaluator.
+ **education**: Level of familiarity with synthetic voices.
+ **stimuli**: Code of the evaluated audio.
+ **stimuli_service**: Service that generated the audio.
+ **gender_stimuli**: Gender of the synthetic voice.
+ **dialect**: Dialect of the synthetic voice.

Repository Structure

The repository is divided into the following main folders:

+ analysis: Contains preprocessing and statistical analysis scripts for the data collected in the subjective test.
+ backend: Contains scripts for the database and web server.
+ classifier: Contains training and evaluation scripts for the DenseMOS classifiers developed in the thesis, including the training, validation, and test splits used.
+ embeddings: Contains scripts for extracting embeddings from the evaluated audios.
+ frontend: Contains scripts for the web interface.
+ NISQA: Link to the NISQA repository.
+ NISQA_analysis: Contains fine-tuning and evaluation scripts for NISQA models.
+ write-up: Contains reference files and figures used in the thesis, as well as a .zip file with the LaTeX code of the thesis.

Evaluated Audios
Audio dataset will be made available shortly
