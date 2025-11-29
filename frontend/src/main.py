import os
import pathlib

def bundle_react_project(project_path=".", output_file="project_bundle.txt"):
    """
    Simple function to bundle a React project, ignoring node_modules and package-lock.json.
    """
    project_path = pathlib.Path(project_path)
    
    with open(output_file, 'w', encoding='utf-8') as bundle:
        bundle.write(f"REACT PROJECT BUNDLE: {project_path.name}\n")
        bundle.write("Excluded: node_modules/, package-lock.json\n\n")
        
        for root, dirs, files in os.walk(project_path):
            # Skip node_modules
            if 'node_modules' in root:
                continue
                
            # Don't traverse into node_modules
            dirs[:] = [d for d in dirs if d != 'node_modules']
            
            for file in files:
                # Skip package-lock.json
                if file == 'package-lock.json':
                    continue
                    
                file_path = pathlib.Path(root) / file
                relative_path = file_path.relative_to(project_path)
                
                # Skip binary files and only include text files
                if file_path.suffix in {'.png', '.jpg', '.jpeg', '.gif', '.ico', '.svg', '.woff', '.woff2', '.ttf', '.eot'}:
                    continue
                
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                except:
                    try:
                        with open(file_path, 'r', encoding='latin-1') as f:
                            content = f.read()
                    except:
                        content = f"<BINARY FILE: {relative_path}>\n"
                
                bundle.write(f"\n{'='*50}\n")
                bundle.write(f"FILE: {relative_path}\n")
                bundle.write(f"{'='*50}\n\n")
                bundle.write(content)
                if content and not content.endswith('\n'):
                    bundle.write('\n')
    
    print(f"Bundle created: {output_file}")

# Usage
if __name__ == "__main__":
    bundle_react_project()  # Uses current directory
    # Or specify a path: bundle_react_project("/path/to/your/react/project")