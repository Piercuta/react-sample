import React, { useState, useEffect } from 'react';
import './App.css';

interface ApiResponse {
  success: boolean;
  imageUrl?: string;
  error?: string;
}

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
    if (!selectedImage) return;
    
    setIsProcessing(true);
    setError('');
    
    try {
      const formData = new FormData();
      formData.append('image', selectedImage);

      const response = await fetch(`${process.env.REACT_APP_API_URL}/resize-image`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();

      if (data.success && data.imageUrl) {
        setArtisticImage(data.imageUrl);
      } else {
        throw new Error(data.error || 'Erreur lors de la transformation de l\'image');
      }
    } catch (err) {
      console.error('Erreur lors de l\'upload:', err);
      setError(err instanceof Error ? err.message : 'Une erreur est survenue lors du traitement de l\'image');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (artisticImage) {
      window.open(artisticImage, '_blank');
    }
  };

  const handleShare = () => {
    if (artisticImage) {
      // Implémenter la logique de partage ici
      console.log('Partager l\'image:', artisticImage);
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
                <button className="download-button" onClick={handleDownload}>Télécharger</button>
                <button className="share-button" onClick={handleShare}>Partager</button>
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
