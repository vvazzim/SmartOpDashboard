import csv
import json

csv_file_path = 'path/to/your/interventions.csv'
json_file_path = 'path/to/your/interventions.json'

data = []

with open(csv_file_path, mode='r', encoding='utf-8-sig') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    for row in csv_reader:
        # Convert roomNumber to integer
        row['roomNumber'] = int(row['roomNumber'])
        data.append(row)

with open(json_file_path, mode='w', encoding='utf-8') as json_file:
    json.dump(data, json_file, indent=4)
