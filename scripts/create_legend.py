import json

def create_category_legend(input_path, output_path):
    """
    Extracts unique categories from the food data and saves them to a legend file.
    """
    try:
        with open(input_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        unique_categories = []
        seen_categories = set()

        for item in data:
            category_en = item["category"]["en"]
            if category_en not in seen_categories:
                unique_categories.append(item["category"])
                seen_categories.add(category_en)
        
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(unique_categories, f, ensure_ascii=False, indent=4)
            
        print(f"Successfully created category legend with {len(unique_categories)} categories at {output_path}")

    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == '__main__':
    create_category_legend('../docs/roche_food_data_clean_i18n.json', '../docs/category_legend.json')
