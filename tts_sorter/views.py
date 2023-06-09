from django.shortcuts import render
import json
from django.http import HttpResponse
import csv
import pickle
import config
from utilities import shuffle_filepaths
import random


# Create your views here.

def say_hello(request): 
    return HttpResponse('hello world')

def receive_form(request):
    """
    Receives form data from frontend and appends it to results.csv.
    """
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)

    # parse form data
    id_participant = 1
    age = body['age']
    sex = body['sex']
    country = body['country']
    if body['province'] != '' :
        province = body['province']
    else:
        province = 'NA'
    familiaridad = body['familiaridad']
    auriculares = body['auris']

    print(id_participant, age, sex, country, province, familiaridad, auriculares)
    json.dumps({})
    
        # Open the CSV file in append mode
    with open('participants.csv', 'a', newline='') as file:
        writer = csv.writer(file)

        # Write the variables to the CSV file
        writer.writerow([age, sex, country, province, familiaridad, auriculares])
    
    
    return HttpResponse( json.dumps({}), status=200)

def load_audios(request):
    new_paths = {}

    #iterate over each category of stimulus
    for letter in "ABCDE":
        #open the pickle file with the filepaths
        with open(config.base_dir + "\\" + letter + '.pickle', 'rb') as handle:
            filepaths = pickle.load(handle)
        try:
            new_paths[letter] = filepaths.pop() # Take the last element from the list
            # save filepaths as pickle file
            with open(config.base_dir + "\\" + letter + '.pickle', 'wb') as handle:
                pickle.dump(filepaths, handle, protocol=pickle.HIGHEST_PROTOCOL)
        except IndexError:
            shuffle_filepaths(letter=letter)
            with open(config.base_dir + "\\" + letter + '.pickle', 'rb') as handle:
                filepaths = pickle.load(handle)
            new_paths[letter] = filepaths.pop() # Take the last element from the list
            # save filepaths as pickle file
            with open(config.base_dir + "\\" + letter + '.pickle', 'wb') as handle:
                pickle.dump(filepaths, handle, protocol=pickle.HIGHEST_PROTOCOL)
    print(new_paths)
    values = list(new_paths.values())
    random.shuffle(values)
    shuffled_dict = {k: v for k, v in zip(new_paths.keys(), values)}
    print(shuffled_dict)

    return HttpResponse(json.dumps(shuffled_dict), status=200)
    
def receive_rate(request):
    """
    Receives stimulus rate data from frontend and appends it to results.csv.
    """
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    rate1fp = body['rate1fp'][30:]
    rate2fp = body['rate2fp'][30:]
    rate3fp = body['rate3fp'][30:]
    rate4fp = body['rate4fp'][30:]
    rate5fp = body['rate5fp'][30:]
    rate1 = body['rate1']
    rate2 = body['rate2']
    rate3 = body['rate3']
    rate4 = body['rate4']
    rate5 = body['rate5']
    print(rate1)

    json.dumps({})
    
        # Open the CSV file in append mode
    with open('results.csv', 'a', newline='') as file:
        writer = csv.writer(file)

        # Write the variables to the CSV file
        writer.writerow([rate1fp, rate1])
        writer.writerow([rate2fp, rate2])
        writer.writerow([rate3fp, rate3])
        writer.writerow([rate4fp, rate4])
        writer.writerow([rate5fp, rate5])
    
    return HttpResponse( json.dumps({}), status=200)


# #create an empty set to store the paths of the audios that have been chosen
# chosen_paths = set()
# #save it with pickle
# with open(config.base_dir + "\\" + 'chosen_paths.pickle', 'wb') as handle:
#     pickle.dump(chosen_paths, handle, protocol=pickle.HIGHEST_PROTOCOL)
