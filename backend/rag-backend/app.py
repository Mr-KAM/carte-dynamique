from rag_process import rag_process
from fastapi import FastAPI, Body
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

pdf_path = "/Users/macbookair/Desktop/DPSI/Annuaires Statistiques METFPA/Annuaire 2024/Annuaire Stat 2023-2024_v14_21042025.pdf"
qa_chain = rag_process(pdf_path)
 
@app.post("/chat")
async def ask_qestion(question: str= Body(...)):
    response = qa_chain.run(question)
    return {"Response": response }
