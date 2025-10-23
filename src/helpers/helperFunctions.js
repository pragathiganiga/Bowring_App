export const formatPriceWithCommas = input => {
  return input?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
export const cleanedValue = input => {
  const cleanedValue = input?.toString().replace(/[^\d]/g, '');
  return cleanedValue === '' ? '' : Math.ceil(Number(cleanedValue));
};

export const formatDateTimeToCustomDate = dateString => {
  const date = new Date(dateString);
  const options = {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  return date.toLocaleDateString('en-GB', options);
};

export const formatDateTimeToCustomDatWithoutDay = dateString => {
  const date = new Date(dateString);
  const options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };

  const formattedDate = date.toLocaleDateString('en-GB', options);

  const [day, month, year] = formattedDate.split(' ');
  return `${month} ${day}, ${year}`;
};

export const formatDateTimeToCustomDateWithoutDayWithoutYear = dateString => {
  const date = new Date(dateString);
  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  const formattedDate = date.toLocaleDateString('en-GB', options);

  const [day, month, year] = formattedDate.split(' ');
  return `${month} ${day}`;
};

export const formatDateTimeToCustomTime = dateString => {
  const date = new Date(dateString);
  const options = {hour: 'numeric', minute: 'numeric', hour12: true};
  return date.toLocaleTimeString('en-US', options);
};

export const getCurrentTime = () => {
  const now = new Date();
  return now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    hour12: true,
  });
};

export function formatDateTime(datetimeString) {
  const date = new Date(datetimeString);

  const day = String(date.getDate()).padStart(2, '0');
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  const formattedDate = `${day} ${month} ${year}`;

  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const formattedTime = `${String(hours).padStart(
    2,
    '0',
  )}:${minutes}:${seconds}`;

  const period = hours >= 12 ? 'PM' : 'AM';
  const adjustedHours = hours % 12 || 12;
  const AMPMtime = `${adjustedHours}:${minutes}${' '}${period}`;

  return {formattedDate, formattedTime, AMPMtime};
}

export function formatDateToMonthAndYear(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {month: 'long', year: 'numeric'});
}
