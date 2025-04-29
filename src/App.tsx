import React, { useState, useEffect } from 'react';
import './App.css';

interface ApiResponse {
  message: string;
  imageUrl: string;
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
      
      // Vérifier la taille du fichier (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('L\'image ne doit pas dépasser 5MB');
        return;
      }
      
      // Vérifier le type de fichier
      if (!file.type.startsWith('image/')) {
        setError('Veuillez sélectionner une image valide');
        return;
      }
      
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
      // Convertir l'image en base64
      const base64Image = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(selectedImage);
        reader.onload = () => {
          // On extrait la partie base64 en enlevant le préfixe (data:image/jpeg;base64,)
          const base64 = (reader.result as string).split(',')[1];
          resolve(base64);
        };
        reader.onerror = (error) => reject(error);
      });

      const response = await fetch(`${process.env.REACT_APP_API_URL}/resize-image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: base64Image
        }),
      });

      const responseText = await response.text();
      console.log('Réponse brute:', responseText);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}\nRéponse: ${responseText}`);
      }

      try {
        const data: ApiResponse = JSON.parse(responseText);
        console.log('Réponse parsée:', data);

        if (data.imageUrl) {
          setArtisticImage(data.imageUrl);
        } else {
          throw new Error('URL de l\'image non reçue dans la réponse');
        }
      } catch (parseError: unknown) {
        console.error('Erreur de parsing JSON:', parseError);
        throw new Error(`Erreur lors du parsing de la réponse: ${parseError instanceof Error ? parseError.message : String(parseError)}\nRéponse brute: ${responseText}`);
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
