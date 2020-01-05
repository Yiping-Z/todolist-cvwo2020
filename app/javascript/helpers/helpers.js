import { error } from './notifications';
export const isEmptyObject = obj => Object.keys(obj).length === 0;
const isValidDate = dateObj => !Number.isNaN(Date.parse(dateObj));

export const validateList = (list) => {
  const errors = {};
  if (list.title === '') {
    errors.title = 'You must enter a title';
  }

  if (list.date === '') {
    errors.date = 'You must enter a valid date';
  }

  if (list.description === '') {
    errors.description = 'You must enter some description';
  }

  if (list.tags === '') {
    errors.tags = 'You must enter at least one tag';
  }

  if (!isValidDate(event.date)) {
    errors.date = 'You must enter a valid date';
  }
  return errors;
}

export const formatDate = (d) => {
    const YYYY = d.getFullYear();
    const MM = `0${d.getMonth() + 1}`.slice(-2);
    const DD = `0${d.getDate()}`.slice(-2);
  
    return `${YYYY}-${MM}-${DD}`;
};

export const handleAjaxError = (err) => {
    error('Something went wrong');
    console.warn(err);
};