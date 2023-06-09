from django.shortcuts import render
import json
from django.http import HttpResponse
import csv
import pickle
import config
from utilities import shuffle_filepaths


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
    return HttpResponse(json.dumps(new_paths), status=200)
    
def receive_rate(request):
    """
    Receives stimulus rate data from frontend and appends it to results.csv.
    """
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    rate1 = body['rate1']
    print(rate1)

    json.dumps({})
    
        # Open the CSV file in append mode
    with open('results.csv', 'a', newline='') as file:
        writer = csv.writer(file)

        # Write the variables to the CSV file
        writer.writerow([rate1])
    
    
    return HttpResponse( json.dumps({}), status=200)


# #create an empty set to store the paths of the audios that have been chosen
# chosen_paths = set()
# #save it with pickle
# with open(config.base_dir + "\\" + 'chosen_paths.pickle', 'wb') as handle:
#     pickle.dump(chosen_paths, handle, protocol=pickle.HIGHEST_PROTOCOL)
