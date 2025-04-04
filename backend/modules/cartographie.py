import streamlit as st
from streamlit_navigation_bar import st_navbar
from streamlit_shadcn_ui import button, card
import geopandas as gpd
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.font_manager import FontProperties
from mpl_toolkits.axisartist.axislines import Subplot
from shapely.geometry import Polygon, MultiPolygon
import plotly.express as px
import plotly.graph_objs as go
from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

def map_visualization(session, regions):
    st.header("🗺️ Visualisation cartographique")

    # Retrieve data
    # db_data = pd.read_sql(session.query(Donnee).statement, session.bind)
    data_path = "/Users/macbookair/Desktop/CartographieMETFPA/carte-dynamique/data/csv/data_model.csv"
    db_data = pd.read_csv(data_path)
    if db_data.empty:
        st.warning("Aucune donnée disponible. Veuillez importer des données.")
        return

    # Visualization options
    col1, col2 = st.columns(2)

    with col1:
        map_type = "Matplotlib Choropleth"
        map_title= st.text_input("Titre de la carte", "Carte des apprenants")
        label_title=st.text_input("Titre de la légende","Légende")
    with col2:
        map_couleur = st.selectbox(
            "Palette de couleur",
            load_color_palettes(),
            index=0
        )

        size=st.number_input("Niveau de zoom de la carte", min_value=1.0, max_value=10.0, value=2.0, step=0.1)
        select_grid=st.selectbox(
            "Afficher le cadre",
            ["on", "off"])
    # Prepare data
    map_regions = regions.copy()
    # Merge data
    merged = map_regions.merge(
        db_data,
        left_on="Name",
        right_on="region",
        how="left"
    ).fillna(0)
    merged["data_label"] = merged["Name"] + "\n" + merged["data"].astype(str)



    # Custom color bins
    color_bins = [0, 77, 220, 334, 483, 1639]
    color_labels = ['0', '0 - 77', '77 - 220', '220 - 334', '334 - 483', '483+']
    color_palette = ['#f7fcf5', '#e5f5e0', '#a1d99b', '#74c476', '#31a354', '#006d2c']

    if map_type == "Plotly choropleth":
        # Plotly Choropleth
        fig = px.choropleth(
            merged,
            geojson=merged.geometry,
            locations=merged.index,
            color='data',
            color_continuous_scale=color_palette,
            range_color=[0, max(color_bins)],
            labels={'data': 'Données'},
            hover_name='Name',
            hover_data={'data': ':.0f', 'Name': True}
        )
        fig.update_geos(fitbounds="locations", visible=False)
        fig.update_layout(
            title={
                'text': map_title,
                'y':0.95,
                'x':0.5,
                'xanchor': 'center',
                'yanchor': 'top'
            },
            height=900
        )
        st.plotly_chart(fig, use_container_width=True)

    else:
        # Matplotlib Choropleth

        fig = plot_choropleth(merged, 'data', 'data_label', label_title=label_title, title=map_title,cmap=map_couleur,size=size)
        plt.axis(select_grid)
        st.pyplot(plt)
    if st.button("Enrégistrer image"):
        # st.error("Une fenetre de dialogue est ouvert pour selectionner le dossier de destination.")
        folder=pick_folder()
        chemin=os.path.join(folder, f"{map_title}.png")
        fig.savefig(chemin, dpi=600)
        st.success(f"Carte enregistrée avec succès à l'emplacement : {chemin}",icon="✅")
