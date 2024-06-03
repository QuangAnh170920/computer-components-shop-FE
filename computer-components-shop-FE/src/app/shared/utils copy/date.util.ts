import { DATE_MONTH, DATE_PRECIOUS } from './../constants/date.constant';
export const getCurrentPrecious = () => {
  const now = new Date();
  if (now.getMonth() < DATE_MONTH._4.value) {
    return DATE_PRECIOUS._1.value;
  }
  if (now.getMonth() < DATE_MONTH._7.value) {
    return DATE_PRECIOUS._2.value;
  }
  if (now.getMonth() < DATE_MONTH._10.value) {
    return DATE_PRECIOUS._3.value;
  }
  return DATE_PRECIOUS._4.value;
}

export const getFirstMonthOfPrecious = (precious: number) => {
  switch (precious) {
    case DATE_PRECIOUS._1.value:
      return 0;
    case DATE_PRECIOUS._2.value:
      return 3;
    case DATE_PRECIOUS._3.value:
      return 6;
    default:
      return 11;
  }
}
