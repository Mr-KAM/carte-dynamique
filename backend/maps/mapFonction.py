import matplotlib.pyplot as plt
import numpy as np
from shapely.geometry import Polygon, MultiPolygon


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

def load_color_palettes():
    """Chargement des palettes de couleurs disponibles dans matplotlib

    Returns:
        _type_: retourne une liste de palettes de couleurs
    """
    return [
        "viridis", "plasma", "inferno", "magma", "cividis",
        "Blues", "Greens", "Reds", "Oranges", "Purples",'Accent', 'Accent_r', 'Blues', 'Blues_r', 'BrBG', 'BrBG_r', 'BuGn', 'BuGn_r', 'BuPu', 'BuPu_r', 'CMRmap', 'CMRmap_r', 'Dark2', 'Dark2_r', 'GnBu', 'GnBu_r', 'Grays', 'Grays_r', 'Greens', 'Greens_r', 'Greys', 'Greys_r', 'OrRd', 'OrRd_r', 'Oranges', 'Oranges_r', 'PRGn', 'PRGn_r', 'Paired', 'Paired_r', 'Pastel1', 'Pastel1_r', 'Pastel2', 'Pastel2_r', 'PiYG', 'PiYG_r', 'PuBu', 'PuBuGn', 'PuBuGn_r', 'PuBu_r', 'PuOr', 'PuOr_r', 'PuRd', 'PuRd_r', 'Purples', 'Purples_r', 'RdBu', 'RdBu_r', 'RdGy', 'RdGy_r', 'RdPu', 'RdPu_r', 'RdYlBu', 'RdYlBu_r', 'RdYlGn', 'RdYlGn_r', 'Reds', 'Reds_r', 'Set1', 'Set1_r', 'Set2', 'Set2_r', 'Set3', 'Set3_r', 'Spectral', 'Spectral_r', 'Wistia', 'Wistia_r', 'YlGn', 'YlGnBu', 'YlGnBu_r', 'YlGn_r', 'YlOrBr', 'YlOrBr_r', 'YlOrRd', 'YlOrRd_r', 'afmhot', 'afmhot_r', 'autumn', 'autumn_r', 'berlin', 'berlin_r', 'binary', 'binary_r', 'bone', 'bone_r', 'brg', 'brg_r', 'bwr', 'bwr_r', 'cividis', 'cividis_r', 'cool', 'cool_r', 'coolwarm', 'coolwarm_r', 'copper', 'copper_r', 'cubehelix', 'cubehelix_r', 'flag', 'flag_r', 'gist_earth', 'gist_earth_r', 'gist_gray', 'gist_gray_r', 'gist_grey', 'gist_grey_r', 'gist_heat', 'gist_heat_r', 'gist_ncar', 'gist_ncar_r', 'gist_rainbow', 'gist_rainbow_r', 'gist_stern', 'gist_stern_r', 'gist_yarg', 'gist_yarg_r', 'gist_yerg', 'gist_yerg_r', 'gnuplot', 'gnuplot2', 'gnuplot2_r', 'gnuplot_r', 'gray', 'gray_r', 'grey', 'grey_r', 'hot', 'hot_r', 'hsv', 'hsv_r', 'inferno', 'inferno_r', 'jet', 'jet_r', 'magma', 'magma_r', 'managua', 'managua_r', 'nipy_spectral', 'nipy_spectral_r', 'ocean', 'ocean_r', 'pink', 'pink_r', 'plasma', 'plasma_r', 'prism', 'prism_r', 'rainbow', 'rainbow_r', 'seismic', 'seismic_r', 'spring', 'spring_r', 'summer', 'summer_r', 'tab10', 'tab10_r', 'tab20', 'tab20_r', 'tab20b', 'tab20b_r', 'tab20c', 'tab20c_r', 'terrain', 'terrain_r', 'turbo', 'turbo_r', 'twilight', 'twilight_r', 'twilight_shifted', 'twilight_shifted_r', 'vanimo', 'vanimo_r', 'viridis', 'viridis_r', 'winter', 'winter_r'
    ]

def plot_choropleth(geodf, column_to_plot, label_column, label_title = None, title=None, cmap='plasma',size=2):
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
