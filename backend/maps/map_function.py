import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import geopandas as gpd
from shapely.geometry import Polygon, MultiPolygon
from io import BytesIO

# todo : Réduire les marges autour de la maps
# todo : Supprimer Disctrict Autonomme dans les deux régions
def plot_choropleth(geodf, column_to_plot, label_column, label_title = None, title=None, cmap='rainbow',size=1.8):
    """
    Crée une carte choroplèthe avec une échelle de couleurs continue et des étiquettes au centre des polygones.

    Paramètres:
    -----------
    geodf : GeoDataFrame
        Le GeoDataFrame d'entrée à afficher
    column_to_plot : str
        La colonne numérique à utiliser pour l'échelle de couleurs
    label_column : str
        La colonne contenant les étiquettes à afficher au centre des polygones
    title : str, optional
        Titre personnalisé pour la carte
    cmap : str, optional
        Palette de couleurs à utiliser (par défaut 'plasma')

    Retourne:
    --------
    matplotlib.figure.Figure
        L'objet de figure créé
    """
    # Creation du graphique
    fig, ax = plt.subplots(figsize=(10*size, 8.5*size))
    ax.grid(False)
    ax.axis('off')
    
    vmin = geodf[column_to_plot].min()
    vmax = geodf[column_to_plot].max()
    norm = plt.Normalize(vmin=vmin, vmax=vmax)
    cmap = plt.colormaps.get_cmap(cmap)

    for idx, row in geodf.iterrows():
        if row.geometry.geom_type == 'Polygon':
            polygons = [row.geometry]
        else:  # MultiPolygon
            polygons = list(row.geometry.geoms)

        for poly in polygons:
            x, y = poly.exterior.xy
            ax.fill(x, y, color=cmap(norm(row[column_to_plot])), edgecolor='black', linewidth=0.5)

            # Calcul du centroide et ajout de l'étiquette
            centroid = poly.centroid
            ax.text(centroid.x, 
                    centroid.y, 
                    f"{row[label_column]}\n{row[column_to_plot]:,.0f}",
                    fontsize=10,
                    ha='center', 
                    va='center', 
                    color='#0f172a'
)

    # Ajout de la bar de couleur
    sm = plt.cm.ScalarMappable(cmap=cmap, norm=norm)
    sm.set_array([])
    cbar = plt.colorbar(sm, ax=ax, shrink=0.8)
    cbar.set_label(label_title or column_to_plot)

    # Set title and adjust layout
    plt.title(title,fontsize=20)
    plt.tight_layout()
    
    img_bytes = BytesIO()
    plt.savefig(img_bytes, format='png')
    img_bytes.seek(0)
    return img_bytes