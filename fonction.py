import matplotlib.pyplot as plt
from mpl_toolkits.axisartist.axislines import Subplot
import numpy as np
from shapely.geometry import Polygon, MultiPolygon

import tkinter as tk
from tkinter import filedialog

def pick_folder():
    folder_selected = filedialog.askdirectory(title="Sélectionnez un dossier")
    if folder_selected:
        return folder_selected
    else:
        return ""


def plot_choropleth(geodf, column_to_plot, label_column, label_title = None, title=None, cmap='plasma',size=1):
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
    fig, ax = plt.subplots(figsize=(20*size, 17*size))
    ax.grid(False)
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
            ax.text(centroid.x, centroid.y, str(row[label_column]), fontsize=15, ha='center', va='center', color='black')

    # Ajoute de la bar de couleur
    sm = plt.cm.ScalarMappable(cmap=cmap, norm=norm)
    sm.set_array([])
    cbar = plt.colorbar(sm, ax=ax, shrink=0.8)
    cbar.set_label(label_title or column_to_plot)

    # Set title and adjust layout
    plt.title(title or f'Choropleth Map of {column_to_plot}',fontsize=25)
    plt.tight_layout()

    return fig
