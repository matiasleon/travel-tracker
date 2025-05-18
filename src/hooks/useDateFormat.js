export const useDateFormat = () => {
  const formatDateForDisplay = (date) => {
    if (!date) return 'Fecha no establecida';
    try {
      const d = new Date(date);
      if (isNaN(d.getTime())) return 'Fecha no establecida';
      return d.toISOString().split('T')[0]; // Returns YYYY-MM-DD format
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Fecha no establecida';
    }
  };

  const formatDateForInput = (date) => {

    
    if (!date) return '';
    try {
      const d = new Date(date);
      if (isNaN(d.getTime())) return '';
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  };

  const parseInputDate = (dateString) => {
    if (!dateString) return null;
    try {
      const [year, month, day] = dateString.split('-').map(Number);
      const date = new Date(year, month - 1, day);
      return date.toISOString();
    } catch (error) {
      console.error('Error parsing date:', error);
      return null;
    }
  };

  return {
    formatDateForDisplay,  // For displaying dates in the UI
    formatDateForInput,    // For date input values
    parseInputDate        // For handling date input changes
  };
};
