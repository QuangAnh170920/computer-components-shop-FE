import {
  LabelValue,
  LabelValueStr,
} from '../models/label-value.model';

export const SOUTCE_CONSTANT = {
  website: { label: 'Diễn đàn, Blog và các nguồn khác', value: 'website' },
  news: { label: 'Báo chí, tin tức', value: 'news' },
  society: { label: 'Mạng xã hội', value: 'facebook,twitter' },
};

export const SOCIETY_SOUTCE_CONSTANT = {
  facebook: { label: 'Facebook', value: 'facebook' },
  twitter: { label: 'Twitter', value: 'twitter' },
};

export const SOUTCE_OPT: LabelValueStr[] = [
  SOUTCE_CONSTANT.website,
  SOUTCE_CONSTANT.news,
  SOCIETY_SOUTCE_CONSTANT.facebook,
  SOCIETY_SOUTCE_CONSTANT.twitter,
];

export const SOUTCE_TYPE_CONSTANT = {
  userPost: 'USER',
  group: 'GROUP',
  fanpage: 'PAGE',
  official: 'OFFICIAL',
  local: 'LOCAL',
  journal: 'JOURNAL',
  synthesis: 'SYNTHESIS',
  other: 'OTHER',
  forum: 'FORUM',
  blog: 'BLOG',
  twitter: 'TWITTER',
  society: 'SOCIETY',
};

export const ProfileLabel: { [key: string]: string } = {
  USER: 'Người dùng',
  GROUP: 'Nhóm',
  PAGE: 'Trang',
  OFFICIAL: 'Báo chính thống',
  LOCAL: 'Báo địa phương',
  JOURNAL: 'Tạp chí',
  SYNTHESIS: 'Tổng hợp',
  OTHER: 'Website khác',
  FORUM: 'Diễn đàn',
  BLOG: 'BLOG',
}

export const FACEBOOK_TYPE_CONSTANT = {
  userPost: {
    label: 'Tường người dùng facebook',
    value: SOUTCE_TYPE_CONSTANT.userPost,
  },
  group: { label: 'Nhóm facebook', value: SOUTCE_TYPE_CONSTANT.group },
  fanpage: { label: 'Trang facebook', value: SOUTCE_TYPE_CONSTANT.fanpage },
};

export const TWITTER_TYPE_CONSTANT = {
  userPost: {
    label: 'Tường người dùng twitter',
    value: SOUTCE_TYPE_CONSTANT.userPost,
  },
  group: { label: 'Nhóm twitter', value: SOUTCE_TYPE_CONSTANT.group },
  fanpage: { label: 'Trang twitter', value: SOUTCE_TYPE_CONSTANT.fanpage },
};

export const NEWS_TYPE_CONSTANT = {
  official: {
    label: 'Báo chí chính thống',
    value: SOUTCE_TYPE_CONSTANT.official,
  },
  local: { label: 'Báo chí địa phương', value: SOUTCE_TYPE_CONSTANT.local },
  journal: {
    label: 'Tạp chí, chuyên trang',
    value: SOUTCE_TYPE_CONSTANT.journal,
  },
  synthes: {
    label: 'Trang tin tổng hợp',
    value: SOUTCE_TYPE_CONSTANT.synthesis,
  }
};

export const WEB_TYPE_CONSTANT = {
  forum: { label: 'Diễn đàn', value: SOUTCE_TYPE_CONSTANT.forum },
  blog: { label: 'Blog', value: SOUTCE_TYPE_CONSTANT.blog },
  other: { label: 'Nguồn website khác', value: SOUTCE_TYPE_CONSTANT.other },
};

export const SOUTCE_TYPE_OPT: LabelValueStr[] = [
  { label: 'User Facebook', value: SOUTCE_TYPE_CONSTANT.userPost },
  { label: 'Group Facebook', value: SOUTCE_TYPE_CONSTANT.group },
  { label: 'Page Facebook', value: SOUTCE_TYPE_CONSTANT.fanpage }
];

export const SOUTCE_ENVELOPE = 1;
export const SOUTCE_EXACTLY = 2;
