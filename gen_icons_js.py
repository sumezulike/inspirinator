import os


def get_icons():
    icons = {}
    icons_walk = os.walk("src/icons")
    _, authors, _ = next(icons_walk)
    for root, _, files in icons_walk:
        author = os.path.split(root)[-1]
        icons[author] = files
    return icons


def generate_js(icons):
    lines = []
    all_icons = []
    for author, images in icons.items():
        for file_name in images:
            icon_name = f"{author}__{file_name}".removesuffix(".svg").replace("-", "_")
            all_icons.append(icon_name)
            lines.append(f"import {icon_name} from './icons/{author}/{file_name}'")
    lines.append("\n")

    lines.append(f"export const icon_names = {all_icons}")
    lines.append(f"export const icons = {all_icons}".replace("'", ""))
    lines.append("\n")

    return "\n".join(lines)


def main():
    icons = get_icons()
    js = generate_js(icons)
    with open("src/icons.js", "w") as file:
        file.write(js)


if __name__ == "__main__":
    main()
