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

    # Bar chart
    data = pd.read_sql(session.query(Donnee).statement, session.bind)

    if not data.empty:
        fig = px.bar(
            data,
            x='region',
            y='data',
            color="variable",
            title='Répartition des données par Région',
            labels={'region': 'Région', 'data': 'Quantité'}
        )
        st.plotly_chart(fig, use_container_width=True)
        st.dataframe(data)

