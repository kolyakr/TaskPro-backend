import { priorities } from '../constants.js';

export const parseColumnFilterParams = (filters) => {
  if (filters?.priority) {
    const isValidPriority = [
      priorities.high,
      priorities.low,
      priorities.medium,
      priorities.withoutPriority,
    ].includes(filters.priority);

    return isValidPriority ? filters : null;
  }
  {
    return filters;
  }
};
