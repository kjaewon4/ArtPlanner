import React from "react";
import "./TemplateRenderer.css";

const TemplateRenderer = ({ image, text }) => {
  return (
    <div className="template-wrapper">
      {/* 배경 템플릿 */}
      <img
        src="/assets/templates/calendar_april_2025.png"
        alt="calendar-template"
        className="template-bg"
      />

      {/* 변환된 이미지 삽입 위치 */}
      <img
        src={image}
        alt="styled"
        className="styled-image"
      />

      {/* 오늘의 기분 텍스트 */}
      <div className="mood-text">
        {text}
      </div>
    </div>
  );
};

export default TemplateRenderer;
