# APP/path_helper.py
"""
This script updates a .env file in the specified directory with environment variable values for
each subdirectory in the same directory.

Functions:
- update_env_file(directory: str) -> None:
  Updates the .env file in the specified directory with environment variable values 
  each subdirectory in the same directory.

Usage:
- This script can be executed directly to update the .env file in the current directory.
- Alternatively, the `update_env_file` function can be imported and called directly from another
script.

Example:
- To update the .env file in the current directory:
  > python update_env_file.py
"""
import os

def update_env_file(directory):
    env_path = os.path.join(directory, '.env')
    env_lines = []
    if os.path.exists(env_path):
        with open(env_path, 'r') as env_file:
            env_lines = env_file.readlines()
    with open(env_path, 'w') as env_file:
        for root, dirs, files in os.walk(directory):
            if '.git' in dirs:
                dirs.remove('.git')  # ignore .git directory
            if 'node_modules' in dirs:
                dirs.remove('node_modules')  # ignore node_modules directory
            for d in dirs:
                dir_path = os.path.join(root, d)
                env_line = f"{d.upper()}={dir_path}\n"
                if env_line not in env_lines:
                    env_lines.append(env_line)
        env_file.writelines(env_lines)

if __name__ == '__main__':
    update_env_file('.')
