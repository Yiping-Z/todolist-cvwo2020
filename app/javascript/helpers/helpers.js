export const isEmptyObject = obj => Object.keys(obj).length === 0;
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

  return errors;
}

