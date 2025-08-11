import json
import re

CATEGORY_TRANSLATIONS = {
    "Farináceos": "Starchy Foods", "Frutas": "Fruits", "Verduras": "Vegetables",
    "Fruta seca grasa": "Nuts and Healthy Fats", "Platos elaborados": "Prepared Dishes",
    "Platos regionales": "Regional Dishes", "Dulces y postres": "Sweets and Desserts",
    "Bebidas alcohólicas": "Alcoholic Beverages", "Lácteos": "Dairy",
    "Productos vegetarianos": "Vegetarian Products", "Platos pediatría": "Pediatric Dishes",
    "Unknown": "Unknown"
}

# Manually defined translations for combined/messy items
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

def parse_value(raw_str):
    """Extracts the first number (int or float) from a string."""
    if not raw_str:
        return 0
    # Handle comma as decimal separator
    cleaned_str = raw_str.replace(',', '.')
    numbers = re.findall(r'[\d.]+', cleaned_str)
    return float(numbers[0]) if numbers else 0

def clean_and_translate_data(input_path, output_path):
    with open(input_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    clean_data = []
    
    # Filter out non-food items by name
    items_to_skip = ["Guía práctica", "Material utilizado", "Biscote", "Unknown", "2 R", "1 R", "DE CARBONO 0,15 R", "RACIÓN HIDR. DE CARBONO 0,5-1 R", "Agua 90 ml", "x5"]

    for item in data:
        if item["name"] in items_to_skip:
            continue

        # Handle combined/reversed items first
        if item["name"] in MANUAL_TRANSLATIONS:
            translations = MANUAL_TRANSLATIONS[item["name"]]
            num_items = len(translations["es"])
            for i in range(num_items):
                new_item = {
                    "name": {"es": translations["es"][i], "en": translations["en"][i]},
                    "category": {"es": item["category"], "en": CATEGORY_TRANSLATIONS.get(item["category"], "Unknown")},
                    "portions": []
                }
                # Distribute the portion data among the split items
                if i < len(item["data"]):
                    portion = item["data"][i]
                    new_item["portions"].append({
                        "weight": parse_value(portion.get("weight_raw")),
                        "carbs": parse_value(portion.get("carbs_raw")),
                        "rations": parse_value(portion.get("rations_raw"))
                    })
                clean_data.append(new_item)
        else:
            # Handle simple items that just need translation
            new_item = {
                "name": {"es": item["name"], "en": ""}, # Placeholder for auto-translation
                "category": {"es": item["category"], "en": CATEGORY_TRANSLATIONS.get(item["category"], "Unknown")},
                "portions": []
            }
            for portion in item.get("data", []):
                new_item["portions"].append({
                    "weight": parse_value(portion.get("weight_raw")),
                    "carbs": parse_value(portion.get("carbs_raw")),
                    "rations": parse_value(portion.get("rations_raw"))
                })
            
            # Simple title case for English name as a placeholder
            new_item["name"]["en"] = item["name"].title()
            clean_data.append(new_item)
            
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(clean_data, f, ensure_ascii=False, indent=4)
        
    print(f"Successfully cleaned and translated data. Saved {len(clean_data)} items to {output_path}")

if __name__ == '__main__':
    clean_and_translate_data('../docs/roche_food_data.json', '../docs/roche_food_data_clean_i18n.json')
