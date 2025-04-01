import matplotlib.pyplot as plt
from mpl_toolkits.axisartist.axislines import Subplot
import numpy as np
from shapely.geometry import Polygon, MultiPolygon

def plot_choropleth(geodf, column_to_plot, label_column, label_title = None, title=None, cmap='plasma'):
    """
    Create a choropleth map with a continuous color scale and labels at polygon centers.

    Parameters:
    -----------
    geodf : GeoDataFrame
        The input GeoDataFrame to be plotted
    column_to_plot : str
        The numeric column to use for color scaling
    label_column : str
        The column containing labels to display at polygon centers
    title : str, optional
        Custom title for the map
    cmap : str, optional
        Colormap to use (default is 'plasma')

    Returns:
    --------
    matplotlib.figure.Figure
        The created figure object
    """
    # Create the plot
    fig, ax = plt.subplots(figsize=(20, 17))

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

            # Compute centroid and add label
            centroid = poly.centroid
            ax.text(centroid.x, centroid.y, str(row[label_column]), fontsize=15, ha='center', va='center', color='black')

    # Add colorbar
    sm = plt.cm.ScalarMappable(cmap=cmap, norm=norm)
    sm.set_array([])
    cbar = plt.colorbar(sm, ax=ax, shrink=0.8)
    cbar.set_label(label_title or column_to_plot)

    # Set title and adjust layout
    plt.title(title or f'Choropleth Map of {column_to_plot}',fontsize=25)
    plt.tight_layout()

    return fig
