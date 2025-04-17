// src/components/DescriptionModal.jsx
import './DescriptionModal.css';

export default function DescriptionModal({ title, description, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <p>{description}</p>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}