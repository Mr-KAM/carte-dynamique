import matplotlib.pyplot as plt
import pandas as pd
import geopandas as gpd 
from map_function import plot_choropleth
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# csv_path = "./data_model.csv"
shapefile_path = "/Users/macbookair/Desktop/CartographieMETFPA/carte-dynamique/backend/map with streamlit/data/shp/Limite des région 2018.shp"

gdf = gpd.read_file(shapefile_path)

# Join data from dataframe B with dataframe A
merged = None

@app.post("/upload-csv")
def upload_csv(file: UploadFile=File(...)):
    df = pd.read_csv(file.file)
    global merged
    merged = pd.merge(df, gdf, left_on='region', right_on='Name', how='inner')
    return {"message": "CSV reçu et fusionné avec succès ✅"}


@app.get("/generate-map")
async def generate_map():
    global merged
    if merged is None:
        return {"error": "Aucune donnée CSV reçue. Veuillez d'abord uploader un fichier."}
    img_bytes = plot_choropleth(merged, 
                                column_to_plot="data", 
                                label_column="Name", 
                                title='Carte des régions selon la donnée',
                                cmap='GnBu_r')
    return StreamingResponse(img_bytes, media_type="image/png")