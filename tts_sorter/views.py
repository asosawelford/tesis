from django.shortcuts import render
import json

# Create your views here.

def receive_form(request):
    """
    Receives form data from frontend and appends it to results.csv.
    """
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    # Read last id_participant from results.csv and increment by 1
    # csv_file = open('results.csv', 'r')
    # last_id = csv_file.readlines()[-1].split(',')[0]
    # new_id = int(last_id) + 1
    # csv_file.close()

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
    auriculares = body['auriculares']

    print(id_participant, age, sex, country, province, familiaridad, auriculares)
    

    # Append new data to results.csv
    csv_file = open('results.csv', 'a')
    

    