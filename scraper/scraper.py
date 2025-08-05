import pandas as pd
from bs4 import BeautifulSoup
import requests
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util.retry import Retry
from http.client import RemoteDisconnected
from datetime import datetime
import time
import random
from tqdm import tqdm
import os

# ---- Config ----
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36"
}
session = requests.Session()
retries = Retry(total=5, backoff_factor=1, status_forcelist=[500, 502, 503, 504])
session.mount("https://", HTTPAdapter(max_retries=retries))

# ---- Scraper Function ----
def scrape(start_date="2023-01-01", output_path="docs/data/all_data.json"):
    date_list = pd.date_range(start=start_date, end=datetime.today()).strftime('%Y-%m-%d').tolist()
    full_data = []

    for date in tqdm(date_list, desc="Scraping"):
        url = f"https://www.gov.br/planalto/pt-br/acompanhe-o-planalto/agenda-do-presidente-da-republica-lula/agenda-do-presidente-da-republica/{date}"
        
        try:
            time.sleep(random.uniform(1, 3))
            resp = session.get(url, headers=headers, timeout=(30, 35))
            resp.raise_for_status()

            doc = BeautifulSoup(resp.text, "html.parser")
            results = doc.find("ul", attrs={"class": "list-compromissos"})
            if not results:
                continue

            items = results.find_all("li")
            for item in items:
                compromisso = item.find(class_="compromisso-titulo")
                inicio = item.find(class_="compromisso-inicio")
                local = item.find(class_="compromisso-local")
                participantes_div = item.find(class_="compromisso-participantes")

                if participantes_div:
                    participantes_list = participantes_div.find_all("li")
                    participantes = " ".join(li.get_text(strip=True) for li in participantes_list)
                else:
                    participantes = "sem informação na agenda"

                row = {
                    "url": url,
                    "data": date,
                    "compromisso": compromisso.get_text(strip=True) if compromisso else "",
                    "inicio": inicio.get_text(strip=True) if inicio else "",
                    "local": local.get_text(strip=True) if local else "",
                    "participantes": participantes,
                }
                full_data.append(row)

        except RemoteDisconnected as e:
            print(f"Remote disconnect at {url}: {e}")
        except requests.exceptions.HTTPError as e:
            if e.response.status_code != 404:
                print(f"HTTP error at {url}: {e}")
        except Exception as e:
            print(f"Unexpected error on {url}: {e}")

    # Create output folder if needed
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    # Save to JSON
    df = pd.DataFrame(full_data)
    df = df.dropna(subset=['compromisso', 'inicio', 'local'])
    df.to_json(output_path, orient="records", force_ascii=False, indent=2)
    print(f"Scraping complete. {len(df)} records saved to {output_path}.")

# ---- Run script ----
if __name__ == "__main__":
    scrape()
