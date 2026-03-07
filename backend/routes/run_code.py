from fastapi import APIRouter
from pydantic import BaseModel
from services.executor import execute_code

router = APIRouter()


class CodeRequest(BaseModel):
    language: str
    code: str


@router.post("/run")
def run_code(request: CodeRequest):

    output, error = execute_code(request.language, request.code)

    return {
        "output": output,
        "error": error
    }