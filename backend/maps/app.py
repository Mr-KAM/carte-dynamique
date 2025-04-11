import matplotlib.pyplot as plt
import pandas as pd
import geopandas as gpd 
from map_function import plot_choropleth
from fastapi import FastAPI
from fastapi.responses import StreamingResponse

app = FastAPI()

csv_path = "./data_model.csv"
shapefile_path = "/Users/macbookair/Desktop/CartographieMETFPA/carte-dynamique/backend/map with streamlit/data/shp/Limite des région 2018.shp"

df = pd.read_csv(csv_path)
gdf = gpd.read_file(shapefile_path)

# Join data from dataframe B with dataframe A
merged = pd.merge(df, gdf, left_on='region', right_on='Name', how='inner')

@app.get("/generate-map")
async def generate_map():
    img_bytes = plot_choropleth(merged, 
                                column_to_plot="data", 
                                label_column="Name", 
                                title='Carte des régions selon la donnée',
                                cmap='Blues')
    return StreamingResponse(img_bytes, media_type="image/png")
