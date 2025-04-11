from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()

class Indicateur(Base):
    __tablename__ = 'indicateurs'

    id = Column(Integer, primary_key=True, index=True)
    region = Column(String, index=True)
    valeur = Column(Float)
    nom_indicateur = Column(String)
    annee = Column(Integer)


# class DatabaseForAI(Base) :
#     __tablename__ = 'databaseForAI'

    
# Connexion à la base de données SQLite
DATABASE_URL = "sqlite:///./indicateurs.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Créer les tables
Base.metadata.create_all(bind=engine)
