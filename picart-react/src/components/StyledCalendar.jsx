import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import './StyledCalendar.css';
import { Download } from 'lucide-react';

const getDaysInMonth = (year, month) => {
  if (!year || !month) return []; // 예외 처리

  const date = new Date(year, month - 1, 1);
  const days = [];

  while (date.getMonth() === month - 1) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return days;
};

const generateCalendarGrid = (year, month) => {
  const days = getDaysInMonth(year, month);
  if (!days.length) return [];

  const grid = [];
  let week = new Array(7).fill(null);
  let dayIdx = days[0].getDay();

  for (let i = 0; i < dayIdx; i++) week[i] = null;

  days.forEach((date) => {
    week[dayIdx] = date.getDate();
    dayIdx++;

    if (dayIdx === 7) {
      grid.push(week);
      week = new Array(7).fill(null);
      dayIdx = 0;
    }
  });

  if (dayIdx !== 0) grid.push(week);
  return grid;
};

export default function StyledCalendar({ imageUrl, mood }) {
  const calendarRef = useRef(null);
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const calendarGrid = generateCalendarGrid(year, month);

  const handleDownload = async () => {
    const canvas = await html2canvas(calendarRef.current, { scale: 2 });
    const link = document.createElement('a');
    link.download = `calendar_${year}_${month}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="calendar-outer-wrapper">
      <div ref={calendarRef} className="calendar-vintage-frame">

          <div className='border-4 border-[#d4c4a2] px-8 py-2'>
            <div className="calendar-vintage-header">{year}年 {month}월</div>
            <img src={imageUrl} alt="styled" className="calendar-vintage-image" />

            <table className="calendar-vintage-table">

              <thead>
                <tr>
                  <td colSpan="7">
                    <div className="h-[1px] border-b border-[#d7cdb9] w-full mt-1 " />
                  </td>
                </tr>

                <tr>
                  <th className="text-red-600">일</th>
                  <th>월</th>
                  <th>화</th>
                  <th>수</th>
                  <th>목</th>
                  <th>금</th>
                  <th>토</th>
                </tr>
                
                <tr>
                  <td colSpan="7">
                    <div className="h-[1px] border-b border-[#d7cdb9] w-full mb-2" />
                  </td>
                </tr>

              </thead>

              <tbody>
                {calendarGrid.map((week, rowIdx) => (
                  <tr key={rowIdx}>
                    {week.map((day, colIdx) => (
                      <td key={colIdx} className={`${colIdx === 0 ? 'text-red-600' : ''} text-[16px] font-medium`}>
                        {day || ''}
                      </td>

                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {/* <hr className="border-t border-[#d7cdb9] shadow-md mt-1" />

            <div className="calendar-vintage-footer">오늘의 기분 {mood}</div> */}
          </div>
        </div>

      <button onClick={handleDownload} className="calendar-download-btn">이미지 저장</button>
    </div>
  );
}