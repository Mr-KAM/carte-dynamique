import streamlit as st
import geopandas as gpd
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.axisartist.axislines import Subplot
from shapely.geometry import Polygon, MultiPolygon
import plotly.express as px
import plotly.graph_objs as go
from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.orm import sessionmaker, declarative_base
import os
from fonction import *

###---------------------gestion de base de données --------------------
# """
# Ici nous allons gerer les bases de données avec sqlite et sqlalchemy comme orm
# Note : Cette section est à revoir completement pour la gestion de base de données
# """
Base = declarative_base()

class Donnee(Base):
    __tablename__ = "donnees"
    id = Column(Integer, primary_key=True, autoincrement=True)
    region = Column(String, unique=False, nullable=False)
    data = Column(Float, nullable=False)
    variable = Column(String, unique=False, nullable=False)
    date = Column(String, unique=False, nullable=False)

# Configuration de la bd
DATABASE_URL = "sqlite:///database.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
Base.metadata.create_all(engine)
SessionLocal = sessionmaker(bind=engine)

#---------------------fin de gestion de base de données --------------------

###----------------------Gestion de donnees --------------------

# Chargement des fichiers en cache pour éviter les rechargerment de données statiques
@st.cache_data
def load_shapefile():
    """Chargement du fichier shapefile des régions de la CIA

    Returns:
        _type_: Retourne un GeoDataFrame contenant les données du shapefile
    """
    try:
        return gpd.read_file("data/shp/Limite des région 2018.shp", encoding='utf-8')
    except Exception as e:
        st.error(f"Erreur de chargement du shapefile : {e}")
        return None

@st.cache_data
def load_color_palettes():
    """Chargeemnt des palettes de couleurs disponibles dans matplotlib

    Returns:
        _type_: retourne une liste de palettes de couleurs
    """
    return [
        "viridis", "plasma", "inferno", "magma", "cividis",
        "Blues", "Greens", "Reds", "Oranges", "Purples",'Accent', 'Accent_r', 'Blues', 'Blues_r', 'BrBG', 'BrBG_r', 'BuGn', 'BuGn_r', 'BuPu', 'BuPu_r', 'CMRmap', 'CMRmap_r', 'Dark2', 'Dark2_r', 'GnBu', 'GnBu_r', 'Grays', 'Grays_r', 'Greens', 'Greens_r', 'Greys', 'Greys_r', 'OrRd', 'OrRd_r', 'Oranges', 'Oranges_r', 'PRGn', 'PRGn_r', 'Paired', 'Paired_r', 'Pastel1', 'Pastel1_r', 'Pastel2', 'Pastel2_r', 'PiYG', 'PiYG_r', 'PuBu', 'PuBuGn', 'PuBuGn_r', 'PuBu_r', 'PuOr', 'PuOr_r', 'PuRd', 'PuRd_r', 'Purples', 'Purples_r', 'RdBu', 'RdBu_r', 'RdGy', 'RdGy_r', 'RdPu', 'RdPu_r', 'RdYlBu', 'RdYlBu_r', 'RdYlGn', 'RdYlGn_r', 'Reds', 'Reds_r', 'Set1', 'Set1_r', 'Set2', 'Set2_r', 'Set3', 'Set3_r', 'Spectral', 'Spectral_r', 'Wistia', 'Wistia_r', 'YlGn', 'YlGnBu', 'YlGnBu_r', 'YlGn_r', 'YlOrBr', 'YlOrBr_r', 'YlOrRd', 'YlOrRd_r', 'afmhot', 'afmhot_r', 'autumn', 'autumn_r', 'berlin', 'berlin_r', 'binary', 'binary_r', 'bone', 'bone_r', 'brg', 'brg_r', 'bwr', 'bwr_r', 'cividis', 'cividis_r', 'cool', 'cool_r', 'coolwarm', 'coolwarm_r', 'copper', 'copper_r', 'cubehelix', 'cubehelix_r', 'flag', 'flag_r', 'gist_earth', 'gist_earth_r', 'gist_gray', 'gist_gray_r', 'gist_grey', 'gist_grey_r', 'gist_heat', 'gist_heat_r', 'gist_ncar', 'gist_ncar_r', 'gist_rainbow', 'gist_rainbow_r', 'gist_stern', 'gist_stern_r', 'gist_yarg', 'gist_yarg_r', 'gist_yerg', 'gist_yerg_r', 'gnuplot', 'gnuplot2', 'gnuplot2_r', 'gnuplot_r', 'gray', 'gray_r', 'grey', 'grey_r', 'hot', 'hot_r', 'hsv', 'hsv_r', 'inferno', 'inferno_r', 'jet', 'jet_r', 'magma', 'magma_r', 'managua', 'managua_r', 'nipy_spectral', 'nipy_spectral_r', 'ocean', 'ocean_r', 'pink', 'pink_r', 'plasma', 'plasma_r', 'prism', 'prism_r', 'rainbow', 'rainbow_r', 'seismic', 'seismic_r', 'spring', 'spring_r', 'summer', 'summer_r', 'tab10', 'tab10_r', 'tab20', 'tab20_r', 'tab20b', 'tab20b_r', 'tab20c', 'tab20c_r', 'terrain', 'terrain_r', 'turbo', 'turbo_r', 'twilight', 'twilight_r', 'twilight_shifted', 'twilight_shifted_r', 'vanimo', 'vanimo_r', 'viridis', 'viridis_r', 'winter', 'winter_r'
    ]

def import_data(session):
    st.header("📥 Importer des Données")

    uploaded_file = st.file_uploader(
        "Importer un fichier CSV de données",
        type=["csv"],
        help="Le fichier doit contenir les colonnes 'region', 'variable' et 'data'"
    )

    if uploaded_file:
        try:
            data = pd.read_csv(uploaded_file)

            # Data validation
            required_columns = {'region', 'data', 'variable'}
            if not required_columns.issubset(data.columns):
                st.error("Le fichier CSV doit contenir les colonnes 'region' et 'apprenants'.")
                return

            # Preview and confirmation
            st.write("Aperçu des données :")
            st.dataframe(data)

            if st.button("Confirmer l'importation"):
                with st.spinner("Enregistrement en cours..."):
                    for _, row in data.iterrows():
                        # existing = session.query(Donnee).filter_by(region=row['region']).first()
                        # if existing:
                        #     existing.data = row['data']
                        # else:
                        #     pass
                        session.add(Donnee(region=row['region'], data=row['data'], variable=row['variable'], date=row['date']))
                    session.commit()
                    st.success("Données importées avec succès !")

        except Exception as e:
            st.error(f"Erreur lors de l'importation : {e}")

# ------------------------fin de la gestion des données------------------
def dashboard(session, regions):
    st.header("📊 Tableau de Bord")

    # Total data
    total_data = session.query(Donnee.data).all()
    total = sum(data[0] for data in total_data)

    # Metrics
    col1, col2, col3 = st.columns(3)

    with col1:
        st.metric("Total des données", f"{total:,.0f}")

    with col2:
        max_region = session.query(Donnee).order_by(Donnee.data.desc()).first()
        st.metric("Région Principale", max_region.region if max_region else "N/A",
                  f"{max_region.data:,.0f}" if max_region else "")

    with col3:
        st.metric("Nombre Total de Régions", len(session.query(Donnee).all()))

    # Bar chart of learners by region
    data = pd.read_sql(session.query(Donnee).statement, session.bind)

    if not data.empty:
        fig = px.bar(
            data,
            x='region',
            y='data',
            title='Répartition des données par Région',
            labels={'region': 'Région', 'data': 'Quantité'}
        )
        st.plotly_chart(fig, use_container_width=True)



def map_visualization(session, regions):
    st.header("🗺️ Visualisation cartographique")

    # Retrieve data
    # db_data = pd.read_sql(session.query(Donnee).statement, session.bind)
    data_path = "data\\csv\\data_model.csv"
    db_data = pd.read_csv(data_path)
    if db_data.empty:
        st.warning("Aucune donnée disponible. Veuillez importer des données.")
        return

    # Visualization options
    col1, col2 = st.columns(2)

    with col1:
        map_type = st.selectbox(
            "Type de Visualisation",
            ["Plotly Choropleth", "Matplotlib Choropleth"],
            index=0
        )

    with col2:
        couleurs = st.selectbox(
            "Palette de couleur",
            load_color_palettes(),
            index=0
        )

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
    st.dataframe(merged.head())


    # Custom color bins
    color_bins = [0, 77, 220, 334, 483, 1639]
    color_labels = ['0', '0 - 77', '77 - 220', '220 - 334', '334 - 483', '483+']
    color_palette = ['#f7fcf5', '#e5f5e0', '#a1d99b', '#74c476', '#31a354', '#006d2c']

    if map_type == "Plotly Choropleth":
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
                'text': "NOMBRE D'APPRENANTS POUR 100 000 HABITANTS",
                'y':0.95,
                'x':0.5,
                'xanchor': 'center',
                'yanchor': 'top'
            },
            height=600
        )
        st.plotly_chart(fig, use_container_width=True)

    else:
        # Matplotlib Choropleth

        # Create a custom color mapping
        def custom_color_map(value):
            if value == 0:
                return color_palette[0]
            elif value <= 77:
                return color_palette[1]
            elif value <= 220:
                return color_palette[2]
            elif value <= 334:
                return color_palette[3]
            elif value <= 483:
                return color_palette[4]
            else:
                return color_palette[5]

        fig = plot_choropleth(merged, 'data', 'data_label', label_title="Apprenants pour 100 000", title='Carte des apprenants',cmap=couleurs)
        st.pyplot(plt)


# About page
def about_page():
    st.header("ℹ️ À Propos de l'Application")
    st.markdown("""
    ### Carte Dynamique des Apprenants

    Cette application permet de :
    - Importer et gérer des données d'apprenants par région
    - Visualiser la répartition géographique des apprenants
    - Effectuer des analyses simples sur les données

    **Fonctionnalités Clés :**
    - Importation de fichiers CSV
    - Tableau de bord interactif
    - Visualisation cartographique
    - Personnalisation des palettes de couleurs

    *Développé avec Streamlit et Python*
    """)
# Main Streamlit Application
def main():
    st.set_page_config(
        page_title="Carte Dynamique des Apprenants",
        page_icon=":map:",
        layout="wide"
    )

    # Sidebar for Navigation
    menu = st.sidebar.radio(
        "Navigation",
        ["Tableau de Bord", "Importer des Données", "Visualisation Carte", "À Propos"]
    )

    # Initialize session state for database session
    if 'db_session' not in st.session_state:
        st.session_state.db_session = SessionLocal()

    # Load regions shapefile
    regions = load_shapefile()
    if regions is None:
        st.error("Impossible de charger le fichier géographique.")
        return

    if menu == "Tableau de Bord":
        dashboard(st.session_state.db_session, regions)
    elif menu == "Importer des Données":
        import_data(st.session_state.db_session)
    elif menu == "Visualisation Carte":
        map_visualization(st.session_state.db_session, regions)
    elif menu == "À Propos":
        about_page()

if __name__ == "__main__":
    main()
