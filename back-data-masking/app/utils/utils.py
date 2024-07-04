import re

def sanitize_identifier(identifier: str) -> str:
    # Remove any characters that are not alphanumeric or underscores
    sanitized = re.sub(r'[^a-zA-Z0-9_]', '', identifier)
    return sanitized