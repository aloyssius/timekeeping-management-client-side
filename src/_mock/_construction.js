import { formatDate } from 'date-fns';
import { randomInArray } from './_funcs';
import _mock from './_mock';

export const constructionStatus = [
  'COMPLETED', 'DOING', 'NOT_DOING', 'STOP_DOING'
]

export const historyDateAgo = [
  'ONE_WEEK_AGE', 'ONE_MONTH_AGO', 'THREE_MONTH_AGE', 'SIX_MONTH_AGE', 'NINE_MONTH_AGE', 'ONE_YEAR_AGO'
]

export const convertHistoryDateAgo = (dateAgo) => {
  const [oneWeek, oneMonth, threeMonth, sixMonth, nineMonth] = historyDateAgo;
  let convertedDateAgo;

  switch (dateAgo) {
    case oneWeek:
      convertedDateAgo = '1 tuần trước';
      break;
    case oneMonth:
      convertedDateAgo = '1 tháng trước';
      break;
    case threeMonth:
      convertedDateAgo = '3 tháng trước';
      break;
    case sixMonth:
      convertedDateAgo = '6 tháng trước';
      break;
    case nineMonth:
      convertedDateAgo = '9 tháng trước';
      break;
    default:
      convertedDateAgo = '1 năm trước';
  }
  return convertedDateAgo;
}

export const convertConstructionStatusColor = (status) => {
  const [completed, doing, notDoing] = constructionStatus;
  let convertedStatusColor;

  switch (status) {
    case completed:
      convertedStatusColor = '#0fd93b';
      break;
    case doing:
      convertedStatusColor = '#108ee9';
      break;
    case notDoing:
      convertedStatusColor = '#e8190e';
      break;
    default:
      convertedStatusColor = '#e8da0e';
  }
  return convertedStatusColor;
}

export const convertConstructionStatus = (status) => {
  const [completed, doing, notDoing] = constructionStatus;
  let convertedStatus;

  switch (status) {
    case completed:
      convertedStatus = 'Đã làm xong';
      break;
    case doing:
      convertedStatus = 'Đang làm';
      break;
    case notDoing:
      convertedStatus = 'Chưa làm';
      break;
    default:
      convertedStatus = 'Tạm dừng';
  }
  return convertedStatus;
}

export const constructionName = [
  'Central Park Tower',
  'Burj Khalifa',
  'Shanghai Tower',
  'Abraj Al-Bait Clock Tower',
  'Lotte World Tower',
  'Ping An Finance Center',
  'Goldin Finance 117',
  'Tianjin CTF Finance Centre',
  'China Zun',
  'Merdeka PNB118',
  'Al Hamra Tower',
  'Petronas Towers',
  'One World Trade Center',
  'Taipei 101',
  'Shimao International Plaza',
  'Zifeng Tower',
  'Kingkey 100',
  'The Shard',
  'Marina 101',
  'Landmark 81',
]


export const _construction = [...Array(20)].map((_, index) => ({
  id: _mock.id(index),
  code: `CONS-${2024 + index}`,
  name: randomInArray(constructionName),
  totalMoney: 10000000 + index * 1000000,
  amountReceived: 10000000 + index * 1000000,
  createdAt: (index) => formatDate(new Date(), { days: index }),
  status: randomInArray(constructionStatus),
}));

