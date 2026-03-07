import subprocess
import uuid
import os


def execute_code(language: str, code: str):

    filename = str(uuid.uuid4())

    try:

        if language == "python":

            file = f"{filename}.py"

            with open(file, "w") as f:
                f.write(code)

            result = subprocess.run(
                ["python3", file],
                capture_output=True,
                text=True,
                timeout=3
            )

        elif language == "javascript":

            file = f"{filename}.js"

            with open(file, "w") as f:
                f.write(code)

            result = subprocess.run(
                ["node", file],
                capture_output=True,
                text=True,
                timeout=3
            )

        else:
            return "", "Unsupported language"

        os.remove(file)

        return result.stdout, result.stderr

    except subprocess.TimeoutExpired:
        return "", "Execution timed out (3 seconds limit)"