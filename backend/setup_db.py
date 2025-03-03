import os
import subprocess

def run_command(command):
    process = subprocess.run(command, shell=True, check=True, text=True)
    return process

os.chdir("backend")

print("Initializing database...")
run_command("flask db init || true")  # Avoid errors if already initialized

print("Running migrations...")
run_command('flask db migrate -m "Initial Migration" || true')

print("Applying migrations...")
run_command("flask db upgrade")

print("Database setup completed!")
