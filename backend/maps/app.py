import matplotlib.pyplot as plt
import pandas as pd
import geopandas as gpd
from map_function import plot_choropleth
from fastapi import FastAPI, UploadFile, File, Query
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

# csv = "./data/csv/data_model.csv"
shapefile_path = "./data/shp/Limite des région 2018.geojson" # Chemin du fichier GeoJSON modifié

gdf = gpd.read_file(shapefile_path)

# Join data from dataframe B with dataframe A
merged = None

@app.post("/upload-csv")
def upload_csv(file: UploadFile=File(...)):
    df = pd.read_csv(file.file)
    global merged
    merged = pd.merge(df, gdf, left_on='Regions', right_on='Name', how='inner')
    return {"message": "CSV reçu et fusionné avec succès ✅"}


@app.get("/generate-map")
async def generate_map( title: str = Query(""),
                       cmap: str = Query(""),
                       label_title: str = Query("")):
    global merged
    if merged is None:
        return {"error": "Aucune donnée CSV reçue. Veuillez d'abord uploader un fichier."}
    img_bytes = plot_choropleth(merged,
                                column_to_plot="Valeurs",
                                label_column="Name",
                                title=title,
                                label_title=label_title,
                                cmap=cmap)
    return StreamingResponse(img_bytes, media_type="image/png")
