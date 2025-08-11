import pypdf

def convert_pdf_to_text(pdf_path, output_txt_path):
    """
    Extracts text from a PDF file and saves it to a text file.

    Args:
        pdf_path (str): The path to the input PDF file.
        output_txt_path (str): The path to the output text file.
    """
    try:
        with open(pdf_path, 'rb') as pdf_file:
            reader = pypdf.PdfReader(pdf_file)
            num_pages = len(reader.pages)
            print(f"Reading {num_pages} pages from {pdf_path}...")

            with open(output_txt_path, 'w', encoding='utf-8') as txt_file:
                for page_num in range(num_pages):
                    page = reader.pages[page_num]
                    text = page.extract_text()
                    if text:
                        txt_file.write(f"--- Page {page_num + 1} ---\n")
                        txt_file.write(text)
                        txt_file.write("\n\n")
            
            print(f"Successfully converted PDF to text at: {output_txt_path}")

    except FileNotFoundError:
        print(f"Error: The file was not found at {pdf_path}")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == '__main__':
    PDF_FILE = '../docs/guia-roche-2018.pdf'
    OUTPUT_FILE = '../docs/guia-roche-raw.txt'
    convert_pdf_to_text(PDF_FILE, OUTPUT_FILE)
