import json
import os

def load_roles():
    _script_dir = os.path.dirname(os.path.abspath(__file__))
    path = os.path.join(_script_dir, "data", "roles.json")
    with open(path, encoding="utf-8") as f:
        return json.load(f)
