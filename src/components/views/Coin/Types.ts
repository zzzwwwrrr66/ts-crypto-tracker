export interface IDatas {
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: boolean,
  is_active: boolean,
  type: string
}

export interface IDetail {
  id: string,
  name: string,
  symbol: string,
  parent: {
    id: string,
    name: string,
    symbol: string
  },
  rank: number,
  is_new: boolean,
  is_active: boolean,
  type: string,
  tags: [
    {
      id: string,
      name: string,
      coin_counter: number,
      ico_counter: number
    }
  ],
  team: [
    {
      id: string,
      name: string,
      position: string
    }
  ],
  description: string,
  message: string,
  open_source: true,
  hardware_wallet: true,
  started_at: string,
  development_status: string,
  proof_type: string,
  org_structure: string,
  hash_algorithm: string,
  contract: string,
  platform: string,
  contracts: [
    {
      contract: string,
      platform: string,
      type: string
    }
  ],
  links: {
    explorer: string[],
    facebook: string[],
    reddit: string[],
    source_code: string[],
    website: string[],
    youtube: string[],
    medium: null | string[]
  },
  links_extended: {
    url: string, 
    type: string, 
    stats?: {subscribers: number, stars?: number}
  }[],
  whitepaper: {
    link: string,
    thumbnail: string
  },
  first_data_at: string,
  last_data_at: string
} 

export interface ITicker { 
  id: string,
  name: string,
  symbol: string,
  rank: number,
  circulating_supply: number,
  total_supply: number,
  max_supply: number,
  beta_value: number,
  first_data_at: string,
  last_updated: string,
  quotes: {
    BTC: {
      price: number,
      volume_24h: number,
      volume_24h_change_24h: number,
      market_cap: number,
      market_cap_change_24h: number,
      percent_change_15m: number,
      percent_change_30m: number,
      percent_change_1h: number,
      percent_change_6h: number,
      percent_change_12h: number,
      percent_change_24h: number,
      percent_change_7d: number,
      percent_change_30d: number,
      percent_change_1y: number,
      ath_price: null | number,
      ath_date: null | number | string,
      percent_from_price_ath: null | number
    },
    USD: {
      price: number,
      volume_24h: number,
      volume_24h_change_24h: number,
      market_cap: number,
      market_cap_change_24h: number,
      percent_change_15m: number,
      percent_change_30m: number,
      percent_change_1h: number,
      percent_change_6h: number,
      percent_change_12h: number,
      percent_change_24h: number,
      percent_change_7d: number,
      percent_change_30d: number,
      percent_change_1y: number,
      ath_price: number,
      ath_date: string,
      percent_from_price_ath: number
    }
  }
}