import React, { useState } from 'react';
import { Image } from 'image-js';

function App() {
  const [images, setImages] = useState([]);

  async function convertImage(file) {
    const imageData = await Image.load(file);
    const converted = imageData.toType('tiff');
    return converted;
  }

  function handleImageInputChange(event) {
    const files = event.target.files;
    const promises = Array.from(files).map(async (file) => {
      const converted = await convertImage(file);
      return { file, converted };
    });
    Promise.all(promises).then((convertedImages) => {
      setImages(convertedImages);
    });
  }

  return (
    <div>
      <input type="file" multiple onChange={handleImageInputChange} />
      <ol>
        {images.map(({ file, converted }) => (
          <li key={file.name}>
            <h2>{file.name}</h2>
            <img src={converted.toDataURL()} alt="Converted" />
          </li>
        ))}
      </ol>
    </div>
  );
}

export default App;

