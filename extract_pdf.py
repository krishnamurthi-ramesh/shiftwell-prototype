import fitz
import sys
sys.stdout.reconfigure(encoding='utf-8')

doc = fitz.open(r'E:\Hugohub\Hubspark Product Intern Case Study 2027.pdf')
for i, page in enumerate(doc):
    print(f"=== PAGE {i+1} ===")
    print(page.get_text())
