from pypdf import PdfReader

try:
    reader = PdfReader("final_odevi.pdf")
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
    
    with open("requirements.txt", "w", encoding="utf-8") as f:
        f.write(text)
    print("Successfully wrote requirements.txt")
except Exception as e:
    print(f"Error reading PDF: {e}")
