import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [artisticImage, setArtisticImage] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    console.log('API URL:', process.env.REACT_APP_API_URL);
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setArtisticImage('');
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedImage(file);
      
      // Créer l'URL de prévisualisation
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };

  const handleUpload = async () => {
    if (selectedImage) {
      setIsProcessing(true);
      setError('');
      
      try {
        // Simulation du traitement (à remplacer par l'appel à votre API)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Pour l'instant, on utilise la même image comme résultat
        // À remplacer par l'URL de l'image transformée de votre API
        setArtisticImage(previewUrl);
      } catch (err) {
        setError('Une erreur est survenue lors du traitement de l\'image');
      } finally {
        setIsProcessing(false);
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Transformez vos photos en œuvres d'art</h1>
        <div className="upload-container">
          <div className="upload-section">
            <div className="file-input-container">
              <label htmlFor="file-upload" className="file-input-label">
                {selectedImage ? 'Changer l\'image' : 'Sélectionner une image'}
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input"
              />
            </div>
            
            {previewUrl && (
              <div className="image-preview-section">
                <h3>Image originale</h3>
                <div className="preview-container">
                  <img src={previewUrl} alt="Preview" className="preview-image" />
                </div>
              </div>
            )}
            
            <button 
              onClick={handleUpload} 
              disabled={!selectedImage || isProcessing}
              className={`upload-button ${isProcessing ? 'processing' : ''}`}
            >
              {isProcessing ? (
                <>
                  <span className="spinner"></span>
                  Transformation en cours...
                </>
              ) : (
                'Transformer en œuvre d\'art'
              )}
            </button>
          </div>

          {error && <div className="error-message">{error}</div>}

          {artisticImage && (
            <div className="result-section">
              <h3>Version artistique</h3>
              <div className="preview-container">
                <img src={artisticImage} alt="Artistic version" className="preview-image" />
              </div>
              <div className="action-buttons">
                <button className="download-button">Télécharger</button>
                <button className="share-button">Partager</button>
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
