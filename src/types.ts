export interface StringListDataItem {
  href: string;
  value: string;
  timestamp: number;
}

export interface AccountData {
  title: string;
  media_list_data: any[];
  string_list_data: StringListDataItem[];
}

export interface FollowingData {
  relationships_following: FollowerData[];
}

export type FollowerData = AccountData;