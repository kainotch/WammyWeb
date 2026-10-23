# Advanced Local Source: Metadata & Customization

Enhance your local manga and light novel collection with custom cover art, rich series metadata, and ComicInfo tags.

---

## Adding Custom Cover Art

To display custom cover art for any local series in your library and catalog grids:
- Place an image named `cover.jpg` or `cover.png` directly inside the root folder of that series.
- Example: `Wammy/local/Vinland Saga/cover.jpg`.
- Wammy will automatically cache and display this image as the thumbnail for the title.

---

## Adding Series Metadata (`details.json`)

You can provide full series descriptions, authors, artists, genres, and publication status by creating a `details.json` file inside the series directory:

```json
{
  "title": "Vinland Saga",
  "author": "Makoto Yukimura",
  "artist": "Makoto Yukimura",
  "description": "Thorfinn pursues a journey with his father's killer in order to take revenge and end his life in a duel of honor.",
  "genre": [
    "Action",
    "Adventure",
    "Historical",
    "Drama",
    "Seinen"
  ],
  "status": "1"
}
```

### Status Code Reference:
- `"0"`: Unknown
- `"1"`: Ongoing
- `"2"`: Completed
- `"3"`: Licensed
- `"4"`: Publishing Finished
- `"5"`: Cancelled
- `"6"`: On Hiatus

---

## ComicInfo.xml Support

If your `.cbz` or `.zip` chapter archives contain a standard `ComicInfo.xml` file, Wammy will automatically parse:
- Chapter numbers and titles.
- Volume numbers.
- Writers, pencillers, and colorists.
- Page counts and summary blurbs.
