import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { registerLocale } from 'react-datepicker';
import { es } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './DateRangePicker.module.css';

// Registrar el locale español
registerLocale('es', es);

export const DateRangePicker = ({ startDate, endDate, onChange, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const formattedStartDate = startDate ? new Date(startDate).toLocaleDateString('es-ES') : null;
  const formattedEndDate = endDate ? new Date(endDate).toLocaleDateString('es-ES') : null;
  const displayValue = formattedStartDate && formattedEndDate
    ? `${formattedStartDate} - ${formattedEndDate}`
    : 'Selecciona las fechas';

  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          value={displayValue}
          onClick={() => setIsOpen(true)}
          readOnly
          className={styles.input}
          placeholder="Selecciona las fechas"
        />
        <button 
          type="button" 
          onClick={() => setIsOpen(true)}
          className={styles.calendarButton}
        >
          📅
        </button>
      </div>
      {isOpen && (
        <div className={styles.datePickerWrapper}>
          <DatePicker
            selected={startDate ? new Date(startDate) : null}
            onChange={(dates) => {
              const [start, end] = dates;
              const startISO = start ? start.toISOString() : null;
              const endISO = end ? end.toISOString() : null;
              onChange([startISO, endISO]);
              if (start && end) {
                setIsOpen(false);
              }
            }}
            startDate={startDate ? new Date(startDate) : null}
            endDate={endDate ? new Date(endDate) : null}
            selectsRange
            inline
            locale="es"
            monthsShown={1}
            minDate={new Date()}
            dateFormat="dd/MM/yyyy"
            calendarClassName={styles.datePickerCalendar}
          />
          <button 
            type="button" 
            onClick={() => setIsOpen(false)}
            className={styles.closeButton}
          >
            Cerrar
          </button>
        </div>
      )}
    </div>
  );
};
