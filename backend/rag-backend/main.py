# from fastapi import FastAPI, Request
# from pydantic import BaseModel
# from supabase_client import supabase
# import requests

# app = FastAPI()

# OLLAMA_URL = "http://localhost:11434/api/generate"
# OLLAMA_EMBED_URL = "http://localhost:11434/api/embeddings"


# class ChatRequest(BaseModel):
#     question : str

# @app.post("/chat")
# async def chat (req:ChatRequest):
#     prompt = req.question
    
#     payload = {
#         "model": "qwen2.5:3b",
#         "prompt": prompt,
#         "stream": False,
#     }
    
#     try :
#         response = requests.post(OLLAMA_URL, json=payload)
#         result = response.json()
#         return {"response": result["response"]}
#     except Exception as e :
#         return {"Error": str(e) }



# class EmbedRequest(BaseModel):
#     text:str

# @app.post("/embed")
# async def embed(req:EmbedRequest):
#     payload = {
#         "model": "bge-m3",
#         "prompt": req.text
#     }
    
#     try: 
#         response = requests.post(OLLAMA_EMBED_URL, json=payload)
#         result = response.json()
#         return {"embedding":result["embedding"]}
#     except Exception as e:
#         return {"Error": str(e)}
 
 
    
# class StoreRequest(BaseModel):
#     text:str
#     source:str
    
# @app.post("/store_embedding")
# async def store_embedding(req: StoreRequest):
#     # Embedding
#     embedding_payload = {
#         "model": "bge-m3",
#         "prompt": req.text  
#     }
    
#     try:
#         embedding_response = requests.post(OLLAMA_EMBED_URL, json=embedding_payload)
#         result = embedding_response.json()
#         embedding = result["embedding"]
#     except Exception as e:
#        return {"error": f"Embedding failed: {str(e)}"}
    
#     # Insertion Supabase
#     try:
#         response = supabase.table("document_vectors").insert({
#             "text": req.text,
#             "embedding": embedding,
#             "source": req.source
#         }).execute()
#         return {"message": "Stockées correctement", "data": response.data}
#     except Exception as e:
#         return {"error": f"Supabase insert failed: {str(e)}"}
    
    
# class SearchRequest(BaseModel):
#     query: str
#     top_k: int = 3
    
# @app.post("/search_similar_docs")
# async def search_similar_docs(req:SearchRequest):
#     #Embedding de la requête
#     embedding_payload = {
#         "model": "bge-m3",
#         "prompt": req.query
#     }
    
#     try:
#         embedding_response = requests.post(OLLAMA_EMBED_URL, json=embedding_payload)
#         result = embedding_response.json()
#         query_embedding = result["embedding"]
#     except Exception as e:
#         return {"Error": f"Embedding failed: {str(e)}"}
    
#     #Requête vectorielle dans supabase (cosine similarity = 1 - dot product)
#     try:
#         response = supabase.rpc("search_similar_docs", {"query_embedding": query_embedding, "top_k": req.top_k}).execute()
#         return {"results": response.data}
#     except Exception as e:
#         return {"Error": f"Supabase vector search failed: {str(e)}"}


from fastapi import FastAPI
from pydantic import BaseModel
import requests
from supabase import create_client, Client
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Supabase
supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
supabase: Client = create_client(supabase_url, supabase_key)

# Ollama
OLLAMA_URL = "http://localhost:11434/api/generate"

class AskRequest(BaseModel):
    query: str
    top_k: int = 3

@app.post("/ask_docs")
async def ask_docs(req: AskRequest):
    # 1. Obtenir l'embedding de la requête
    embedding_payload = {
        "model": "bge-m3",
        "prompt": req.query
    }
    embedding_response = requests.post("http://localhost:11434/api/embeddings", json=embedding_payload)
    query_embedding = embedding_response.json()["embedding"]

    # 2. Recherche vectorielle dans Supabase
    search_response = supabase.rpc("search_similar_docs", {
        "query_embedding": query_embedding,
        "top_k": req.top_k
    }).execute()

    documents = search_response.data

    if not documents:
        return {"response": "Désolé, aucun document trouvé."}

    # 3. Construire le contexte pour le prompt
    context = "\n\n".join([f"- {doc['content']}" for doc in documents])

    # 4. Créer le prompt pour Qwen
    prompt = f"""Tu es un assistant intelligent. Voici des extraits de documents :\n{context}\n\nEn te basant uniquement sur ces documents, réponds à la question suivante :\n{req.query}"""

    # 5. Envoyer le prompt à Qwen via Ollama
    qwen_payload = {
        "model": "qwen2.5:3b",
        "prompt": prompt,
        "stream": False
    }
    try:
        response = requests.post(OLLAMA_URL, json=qwen_payload)
        result = response.json()
        if "response" not in result:
            return {"error": "Le modèle n’a pas retourné de réponse : ", "raw": result}
        return {"response": result["response"]}
    except Exception as e:
        return {"error": str(e)}