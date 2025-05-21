import React, { useState } from 'react';
import { Share2, Copy, Check } from 'lucide-react';
import styles from './ShareTripButton.module.css';

export const ShareTripButton = ({ tripId, variant = 'default' }) => {
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);
  
  // Generar un enlace compartible cuando se hace clic en el botón de compartir
  const handleShare = () => {
    // En una implementación real, aquí se generaría un token único
    // Para este ejemplo, simplemente usamos un timestamp
    const token = Date.now();
    
    // Construir la URL completa para compartir
    const baseUrl = window.location.origin;
    const shareableUrl = `${baseUrl}/share/${tripId}?token=${token}`;
    
    setShareUrl(shareableUrl);
    setShowShareOptions(true);
  };
  
  // Copiar el enlace al portapapeles
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        setCopied(true);
        // Resetear el estado de copiado después de 2 segundos
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Error al copiar al portapapeles:', err);
      });
  };
  
  return (
    <div className={`${styles.shareContainer} ${variant === 'inline' ? styles.inlineContainer : ''}`}>
      <button 
        className={`${styles.shareButton} ${variant === 'inline' ? styles.inlineButton : ''}`} 
        onClick={handleShare}
        aria-label="Compartir viaje"
      >
        <Share2 size={variant === 'inline' ? 14 : 16} />
        <span>{variant === 'inline' ? 'Generar enlace' : 'Compartir'}</span>
      </button>
      
      {showShareOptions && (
        <div className={styles.shareOptions}>
          <div className={styles.shareHeader}>
            <h3>Compartir viaje</h3>
            <button 
              className={styles.closeButton}
              onClick={() => setShowShareOptions(false)}
              aria-label="Cerrar"
            >
              &times;
            </button>
          </div>
          
          <p className={styles.shareText}>
            Comparte este enlace con familiares para que puedan seguir tu viaje en tiempo real:
          </p>
          
          <div className={styles.shareUrlContainer}>
            <input 
              type="text" 
              readOnly 
              value={shareUrl} 
              className={styles.shareUrlInput} 
              onClick={(e) => e.target.select()}
            />
            <button 
              className={styles.copyButton} 
              onClick={copyToClipboard}
              aria-label={copied ? "Copiado" : "Copiar al portapapeles"}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
          
          <div className={styles.shareInfo}>
            <p className={styles.shareNote}>
              Este enlace permite acceso de solo lectura a la información del viaje.
              No se requiere iniciar sesión para verlo.
            </p>
            <p className={styles.sharePrivacy}>
              La información se actualiza automáticamente cuando realizas cambios en el viaje.
            </p>
          </div>
          
          <div className={styles.shareSocialButtons}>
            <button 
              className={`${styles.socialButton} ${styles.whatsapp}`}
              onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`¡Sigue mi viaje en tiempo real! ${shareUrl}`)}`, '_blank')}
              aria-label="Compartir por WhatsApp"
            >
              WhatsApp
            </button>
            <button 
              className={`${styles.socialButton} ${styles.email}`}
              onClick={() => window.open(`mailto:?subject=Seguimiento de mi viaje&body=${encodeURIComponent(`¡Hola! Te comparto el enlace para que puedas seguir mi viaje en tiempo real: ${shareUrl}`)}`, '_blank')}
              aria-label="Compartir por Email"
            >
              Email
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
