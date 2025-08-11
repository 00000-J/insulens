import re
import json

def parse_roche_guide(txt_path, output_json_path):
    """
    Parses the text from the Roche guide to extract food data using a
    line-by-line processing approach.
    """
    try:
        with open(txt_path, 'r', encoding='utf-8') as f:
            raw_lines = f.readlines()

        print("Cleaning and parsing text...")

        # First, clean the lines by removing headers, footers, and empty lines
        cleaned_lines = []
        for line in raw_lines:
            if 'GUIA - ROCHE CARBOHIDRATOS OK' in line or line.startswith('--- Page'):
                continue
            line = line.strip()
            if not line:
                continue
            cleaned_lines.append(line)

        foods = []
        current_food = None
        current_category = "Unknown"
        
        categories = [
            "Farináceos", "Frutas", "Verduras", "Fruta seca grasa",
            "Platos elaborados", "Platos regionales", "Dulces y postres",
            "Bebidas alcohólicas", "Lácteos", "Productos vegetarianos",
            "Platos pediatría"
        ]

        for line in cleaned_lines:
            if line in categories:
                current_category = line
                # When a new category starts, the previous food item is finished.
                if current_food and current_food.get("data"):
                    foods.append(current_food)
                current_food = None
                continue

            if line.startswith('PESO'):
                # When we see PESO, it's a new data block for the current food.
                if not current_food:
                    # This handles cases where data appears before a named food.
                    current_food = {'name': 'Unknown', 'category': current_category, 'data': []}
                current_food['data'].append({'weight_raw': line})
            
            elif line.startswith('HIDRATOS DE CARB'):
                if current_food and current_food['data']:
                    current_food['data'][-1]['carbs_raw'] = line
            
            elif line.startswith('RACIÓN HIDRATOS'):
                if current_food and current_food['data']:
                    current_food['data'][-1]['rations_raw'] = line

            elif line.startswith('*'):
                if current_food:
                    if 'notes' not in current_food:
                        current_food['notes'] = ""
                    current_food['notes'] += " " + line

            else:
                # Any other line is assumed to be a food name.
                # This means the previous food item is complete.
                if current_food and current_food.get("data"):
                    foods.append(current_food)
                
                current_food = {
                    'name': line,
                    'category': current_category,
                    'data': []
                }
        
        # Make sure to append the very last food item processed
        if current_food and current_food.get("data"):
            foods.append(current_food)

        with open(output_json_path, 'w', encoding='utf-8') as f:
            json.dump(foods, f, ensure_ascii=False, indent=4)
            
        print(f"Successfully parsed guide and saved {len(foods)} items to {output_json_path}")

    except Exception as e:
        print(f"An error occurred: {e}")
        import traceback
        traceback.print_exc()


if __name__ == '__main__':
    INPUT_FILE = '../docs/guia-roche-raw.txt'
    OUTPUT_FILE = '../docs/roche_food_data.json'
    parse_roche_guide(INPUT_FILE, OUTPUT_FILE)
