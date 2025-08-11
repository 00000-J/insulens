import json
import re

# --- Part 1: Configuration & Dictionaries ---

CATEGORY_TRANSLATIONS = {
    "Farináceos": "Starchy Foods", "Frutas": "Fruits", "Verduras": "Vegetables",
    "Fruta seca grasa": "Nuts and Healthy Fats", "Platos elaborados": "Prepared Dishes",
    "Platos regionales": "Regional Dishes", "Dulces y postres": "Sweets and Desserts",
    "Bebidas alcohólicas": "Alcoholic Beverages", "Lácteos": "Dairy",
    "Productos vegetarianos": "Vegetarian Products", "Platos pediatría": "Pediatric Dishes",
    "Unknown": "Unknown"
}

MANUAL_TRANSLATIONS = {
    "a d a m i a s n Et u n o D": {"es": ["Ensaimada", "Donut"], "en": ["Ensaimada", "Donut"]},
    "Helado vainilla e t a l o c o h C  e d  l e t s a Pa n e l a d g a M": {"es": ["Helado de vainilla", "Pastel de Chocolate", "Magdalena"], "en": ["Vanilla Ice Cream", "Chocolate Cake", "Madeleine"]},
    "Tarta de Santiago Tarta de manzana": {"es": ["Tarta de Santiago", "Tarta de manzana"], "en": ["Santiago Cake", "Apple Pie"]},
    "Vino tintoCava brut": {"es": ["Vino tinto", "Cava brut"], "en": ["Red Wine", "Cava Brut"]},
    "Coñac s a t u r f  e d  r o c i Lo l l i j a r a C": {"es": ["Coñac", "Licor de frutas", "Carajillo"], "en": ["Cognac", "Fruit Liqueur", "Carajillo"]},
    "Queso fresco natural Leche semidesnatada": {"es": ["Queso fresco natural", "Leche semidesnatada"], "en": ["Fresh Cheese", "Semi-skimmed Milk"]},
    "Queso en lonchasQueso manchego semi": {"es": ["Queso en lonchas", "Queso manchego semi"], "en": ["Sliced Cheese", "Semi-cured Manchego Cheese"]},
    "Flan de huevo Natillas": {"es": ["Flan de huevo", "Natillas"], "en": ["Egg Flan", "Custard"]},
    "Actimel Petit suise": {"es": ["Actimel", "Petit suise"], "en": ["Actimel", "Petit Suisse"]},
    "Seitán  l a t e g e v  a s e u g r u b m a Hu f o T": {"es": ["Seitán", "Hamburguesa vegetal", "Tofu"], "en": ["Seitan", "Veggie Burger", "Tofu"]},
    "Alcachofas Coliflor": {"es": ["Alcachofas", "Coliflor"], "en": ["Artichokes", "Cauliflower"]},
    "Ensalada verde Ensalada mixta": {"es": ["Ensalada verde", "Ensalada mixta"], "en": ["Green Salad", "Mixed Salad"]},
    "Judía verde Tomate": {"es": ["Judía verde", "Tomate"], "en": ["Green Bean", "Tomato"]},
    "Croquetas Empanadillas Calamares romana": {"es": ["Croquetas", "Empanadillas", "Calamares a la romana"], "en": ["Croquettes", "Turnovers", "Fried Squid Rings"]},
    "KetchupHamburguesa FAST FOOD": {"es": ["Ketchup", "Hamburguesa"], "en": ["Ketchup", "Hamburger"]},
}

# --- Part 2: Improved Parsing Function ---

def parse_guide_accurately(input_path):
    with open(input_path, 'r', encoding='utf-8') as f:
        raw_lines = f.readlines()

    cleaned_lines = []
    for line in raw_lines:
        if 'GUIA - ROCHE CARBOHIDRATOS OK' in line or line.startswith('--- Page'):
            continue
        line = line.strip()
        if not line:
            continue
        cleaned_lines.append(line)

    foods_raw = []
    current_category = "Unknown"
    data_buffer = []
    notes_buffer = ""

    categories = list(CATEGORY_TRANSLATIONS.keys())

    for line in cleaned_lines:
        if line in categories:
            current_category = line
            continue

        if line.startswith('PESO'):
            data_buffer.append({'weight_raw': line})
        elif line.startswith('HIDRATOS DE CARB') and data_buffer:
            data_buffer[-1]['carbs_raw'] = line
        elif line.startswith('RACIÓN HIDRATOS') and data_buffer:
            data_buffer[-1]['rations_raw'] = line
        elif line.startswith('*'):
            notes_buffer += " " + line
        elif data_buffer:
            foods_raw.append({
                "name": line, "category": current_category,
                "data": data_buffer, "notes": notes_buffer.strip()
            })
            data_buffer, notes_buffer = [], ""
    return foods_raw

# --- Part 3: Cleaning and Translation Function ---

def parse_value(raw_str):
    if not raw_str: return 0
    cleaned_str = raw_str.replace(',', '.')
    numbers = re.findall(r'[\d.]+', cleaned_str)
    return float(numbers[0]) if numbers else 0

def clean_and_translate(raw_data):
    clean_data = []
    items_to_skip = ["Guía práctica", "Material utilizado", "Biscote", "Unknown", "2 R", "1 R", "DE CARBONO 0,15 R", "RACIÓN HIDR. DE CARBONO 0,5-1 R", "Agua 90 ml", "x5", "DE CARBONO 0,02 R", "DE CARBONO 1,2 R", "DE CARBONO 2,5R"]

    for item in raw_data:
        if item["name"] in items_to_skip:
            continue

        if item["name"] in MANUAL_TRANSLATIONS:
            translations = MANUAL_TRANSLATIONS[item["name"]]
            for i in range(len(translations["es"])):
                new_item = {
                    "name": {"es": translations["es"][i], "en": translations["en"][i]},
                    "category": {"es": item["category"], "en": CATEGORY_TRANSLATIONS.get(item["category"], "Unknown")},
                    "portions": []
                }
                if i < len(item["data"]):
                    portion = item["data"][i]
                    new_item["portions"].append({
                        "weight": parse_value(portion.get("weight_raw")),
                        "carbs": parse_value(portion.get("carbs_raw")),
                        "rations": parse_value(portion.get("rations_raw"))
                    })
                clean_data.append(new_item)
        else:
            new_item = {
                "name": {"es": item["name"], "en": item["name"].title()},
                "category": {"es": item["category"], "en": CATEGORY_TRANSLATIONS.get(item["category"], "Unknown")},
                "portions": [
                    {"weight": parse_value(p.get("weight_raw")), "carbs": parse_value(p.get("carbs_raw")), "rations": parse_value(p.get("rations_raw"))}
                    for p in item.get("data", [])
                ]
            }
            clean_data.append(new_item)
    return clean_data

# --- Part 4: Main Execution ---

if __name__ == '__main__':
    print("Step 1: Parsing raw data with improved logic...")
    raw_food_data = parse_guide_accurately('../docs/guia-roche-raw.txt')

    print("Step 2: Cleaning and translating data...")
    final_data = clean_and_translate(raw_food_data)
    
    final_data_path = '../docs/roche_food_data_clean_i18n.json'
    with open(final_data_path, 'w', encoding='utf-8') as f:
        json.dump(final_data, f, ensure_ascii=False, indent=4)
    print(f"Step 2 Complete: Saved {len(final_data)} items to {final_data_path}")

    print("Step 3: Generating category legend...")
    unique_categories = {item['category']['en']: item['category'] for item in final_data}.values()
    
    legend_path = '../docs/category_legend.json'
    with open(legend_path, 'w', encoding='utf-8') as f:
        json.dump(list(unique_categories), f, ensure_ascii=False, indent=4)
    print(f"Step 3 Complete: Saved {len(unique_categories)} categories to {legend_path}")
