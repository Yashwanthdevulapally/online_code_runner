from fastapi import FastAPI
from pydantic import BaseModel
import subprocess
from routes.run_code import router as run_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(run_router)

class CodeRequest(BaseModel):
    code: str


@app.post("/run")
def run_code(request: CodeRequest):

    code = request.code

    with open("temp.py", "w") as f:
        f.write(code)

    result = subprocess.run(
        ["python3", "temp.py"],
        capture_output=True,
        text=True
    )

    return {
        "output": result.stdout,
        "error": result.stderr
    }