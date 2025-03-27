export interface MoneyMakingSite {
  _id: string;
  domain: string;
  industry?: string;
  globalRank?: number;
  trafficShare: string;
  traffic: string;
  change: string;
  platform: string;
}

export interface PlatformSubs {
  _id: string;
  url: string;
  platform: string;
  clicks: number | string;
  trafficShare: string;
  change: string;
  topKeyword: string;
}

export interface IndustryLeader {
  _id: string;
  domain: string;
  trafficShare: string;
  momTrafficChange: string;
  countryRank: number;
  monthlyVisits: string;
  uniqueVisitors: string;
  desktopShare: string;
  mobileShare: string;
  industry: string;
}
