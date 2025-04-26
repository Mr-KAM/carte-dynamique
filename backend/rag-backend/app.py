from langchain_community.document_loaders import PyPDFLoader
from langchain_community.embeddings import OllamaEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_community.chat_models import ChatOllama
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate


pdf_path = "/Users/macbookair/Desktop/DPSI/Annuaires Statistiques METFPA/Annuaire 2024/Annuaire Stat 2023-2024_v14_21042025.pdf"

#Charger le document pdf
loader = PyPDFLoader(pdf_path)

#Découper le pdf
pages = loader.load_and_split()

pages = loader.load()

embeddings = OllamaEmbeddings(model="bge-m3")

vdb = Chroma.from_documents(pages, embeddings)

template = """
Réponds dans la langue dans laquelle la question est posée, en t'appuyant uniquement
sur le contexte fourni sans ajouter d'éléments. Si la réponse n'est pas disponible
Indique : Cette information ne se trouve pas encore dans les documents à ma connaissance.
Reponds surtout de manière courtoise et agréble en ajoutant des émoticones.

Contexte : {context}
Question : {question} [/INST] 
""" 

QA_PROMPT = PromptTemplate.from_template(template)

llm = ChatOllama(model="mistral:7b-instruct", temperature=0)

qa_chain = RetrievalQA.from_chain_type(
    llm = llm,
    chain_type = "stuff",
    retriever = vdb.as_retriever(),
    chain_type_kwargs = {"prompt": QA_PROMPT}
)

question = "Quel est le nombre d'apprenant fille en couture ?"
response = qa_chain.run(question)
response